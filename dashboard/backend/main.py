import os
import base64
import mimetypes
from pathlib import Path
import sqlite3
import subprocess
import sys
import threading

from dotenv import load_dotenv
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from openai import OpenAI
from pydantic import BaseModel
from pypdf import PdfReader


# =========================
# PATHS
# =========================

CREWAI_DIR = Path(r"C:\Users\deven\my-ai-agents\my-ai-agents\app_builder_crew")

FRONTEND_DIR = Path(r"C:\Users\deven\dashboard\frontend")
FRONTEND_APP_DIR = FRONTEND_DIR / "app"

MEMORY_DB = CREWAI_DIR / "memory" / "agent_memory.db"

CURRENT_RUN_DIR = CREWAI_DIR / "outputs" / "current_run"
RUNS_DIR = CREWAI_DIR / "outputs" / "runs"

SHORT_TERM_MEMORY = CREWAI_DIR / "memory" / "short_term_memory.md"
LONG_TERM_MEMORY = CREWAI_DIR / "memory" / "long_term_memory.md"
UI_STYLE_MEMORY = CREWAI_DIR / "memory" / "ui_style_memory.md"
FEATURE_MEMORY = CREWAI_DIR / "memory" / "feature_memory.md"
PROJECT_RULES_MEMORY = CREWAI_DIR / "memory" / "project_rules.md"
PAGE_PLAN_MEMORY = CREWAI_DIR / "memory" / "page_plan_memory.md"

CHAT_UPLOADS_DIR = CREWAI_DIR / "uploads" / "chat"
DOCUMENTS_UPLOADS_DIR = CREWAI_DIR / "uploads" / "documents"
UI_REFERENCE_IMAGES_DIR = CREWAI_DIR / "uploads" / "ui_reference_images"
USER_ASSETS_DIR = CREWAI_DIR / "uploads" / "user_assets"

GENERATED_UI_IMAGES_DIR = CREWAI_DIR / "generated" / "ui_images"
GENERATED_PAGES_DIR = CREWAI_DIR / "generated" / "pages"
GENERATED_COMPONENTS_DIR = CREWAI_DIR / "generated" / "components"
GENERATED_DESIGNS_DIR = CREWAI_DIR / "generated" / "designs"
GENERATED_FINAL_APP_DIR = CREWAI_DIR / "generated" / "final_app"
GENERATED_REPORTS_DIR = CREWAI_DIR / "generated" / "reports"


for folder in [
    CHAT_UPLOADS_DIR,
    DOCUMENTS_UPLOADS_DIR,
    UI_REFERENCE_IMAGES_DIR,
    USER_ASSETS_DIR,
    GENERATED_UI_IMAGES_DIR,
    GENERATED_PAGES_DIR,
    GENERATED_COMPONENTS_DIR,
    GENERATED_DESIGNS_DIR,
    GENERATED_FINAL_APP_DIR,
    GENERATED_REPORTS_DIR,
]:
    folder.mkdir(parents=True, exist_ok=True)


load_dotenv(CREWAI_DIR / ".env")


# =========================
# FASTAPI APP
# =========================

app = FastAPI(title="AI Agent OS Dashboard API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================
# REQUEST MODELS
# =========================

class ChatRequest(BaseModel):
    agent: str
    provider: str
    model: str
    message: str
    file_name: str | None = None
    file_content: str | None = None
    session_id: int | None = None


class RenameChatRequest(BaseModel):
    title: str


class MemoryWriteRequest(BaseModel):
    memory_type: str
    title: str
    content: str


class UIAnalyzeRequest(BaseModel):
    file_name: str
    model: str = "moonshotai/kimi-k2.6"
    prompt: str | None = None


class PageBuildRequest(BaseModel):
    page_name: str
    route_path: str = "/"
    description: str
    model: str = "moonshotai/kimi-k2.6"


class InstallPageRequest(BaseModel):
    file_name: str
    route_path: str
    overwrite: bool = False


# =========================
# MEMORY HELPERS
# =========================

def db_connect():
    return sqlite3.connect(MEMORY_DB)


def read_text_file(file_path: Path):
    if not file_path.exists():
        return ""

    return file_path.read_text(encoding="utf-8", errors="ignore").strip()


def append_text_file(file_path: Path, title: str, content: str):
    file_path.parent.mkdir(parents=True, exist_ok=True)

    old_content = read_text_file(file_path)

    new_block = f"""
## {title}

{content.strip()}
""".strip()

    if old_content:
        final_content = old_content + "\n\n" + new_block
    else:
        final_content = new_block

    file_path.write_text(final_content, encoding="utf-8")


def build_memory_context():
    short_term = read_text_file(SHORT_TERM_MEMORY)
    long_term = read_text_file(LONG_TERM_MEMORY)
    ui_style = read_text_file(UI_STYLE_MEMORY)
    features = read_text_file(FEATURE_MEMORY)
    project_rules = read_text_file(PROJECT_RULES_MEMORY)
    page_plan = read_text_file(PAGE_PLAN_MEMORY)

    return f"""
PROJECT MEMORY CONTEXT

[SHORT TERM MEMORY]
{short_term or "No short-term memory saved yet."}

[LONG TERM MEMORY]
{long_term or "No long-term memory saved yet."}

[UI STYLE MEMORY]
{ui_style or "No UI style memory saved yet."}

[FEATURE MEMORY]
{features or "No feature memory saved yet."}

[PROJECT RULES]
{project_rules or "No project rules saved yet."}

[PAGE PLAN MEMORY]
{page_plan or "No page plan saved yet."}

IMPORTANT MEMORY RULES:
- Use this memory as project context.
- Do not ignore the user's latest message.
- Do not assume every file is an app or website.
- Use app-builder analysis only when the user asks for app, UI, code, or product building.
- If uploaded file content is provided, use that file content as the source of truth.
- Shared memory is used by dashboard chat and future CrewAI agents.
""".strip()


# =========================
# CHAT DB SETUP
# =========================

def init_chat_tables():
    conn = db_connect()
    cur = conn.cursor()

    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS chat_sessions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            agent TEXT NOT NULL,
            provider TEXT NOT NULL,
            model TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        """
    )

    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS chat_messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            session_id INTEGER NOT NULL,
            role TEXT NOT NULL,
            agent TEXT NOT NULL,
            content TEXT NOT NULL,
            file_name TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (session_id) REFERENCES chat_sessions(id)
        )
        """
    )

    conn.commit()
    conn.close()


init_chat_tables()


# =========================
# BASIC ROUTES
# =========================

@app.get("/")
def home():
    return {
        "message": "AI Agent OS Dashboard API is running",
        "status": "ok",
    }


@app.get("/health")
def health():
    return {
        "api": "ok",
        "crewai_dir": str(CREWAI_DIR),
        "frontend_dir": str(FRONTEND_DIR),
        "memory_db_exists": MEMORY_DB.exists(),
        "current_run_exists": CURRENT_RUN_DIR.exists(),
        "runs_dir_exists": RUNS_DIR.exists(),
        "short_term_memory_exists": SHORT_TERM_MEMORY.exists(),
        "long_term_memory_exists": LONG_TERM_MEMORY.exists(),
        "ui_style_memory_exists": UI_STYLE_MEMORY.exists(),
        "feature_memory_exists": FEATURE_MEMORY.exists(),
        "project_rules_exists": PROJECT_RULES_MEMORY.exists(),
        "page_plan_memory_exists": PAGE_PLAN_MEMORY.exists(),
        "nvidia_key_loaded": bool(os.getenv("NVIDIA_API_KEY")),
    }


# =========================
# OUTPUTS / RUNS
# =========================

@app.get("/outputs/current")
def current_outputs():
    files = []

    if CURRENT_RUN_DIR.exists():
        for file in sorted(CURRENT_RUN_DIR.glob("*.md")):
            files.append(
                {
                    "name": file.name,
                    "path": str(file),
                    "size": file.stat().st_size,
                    "modified": file.stat().st_mtime,
                }
            )

    return {
        "count": len(files),
        "files": files,
    }


@app.get("/outputs/current/with-content")
def current_outputs_with_content():
    files = []

    agent_names = {
        "01_product_manager_prd.md": "Product Manager",
        "02_ui_ux_design.md": "UI/UX Designer",
        "03_frontend_plan.md": "Frontend Developer",
        "04_backend_plan.md": "Backend Developer",
        "05_database_schema.md": "Database Engineer",
        "06_system_architecture.md": "System Architect",
        "07_qa_test_plan.md": "QA Tester",
        "08_final_blueprint.md": "Project Reviewer",
    }

    if CURRENT_RUN_DIR.exists():
        for file in sorted(CURRENT_RUN_DIR.glob("*.md")):
            content = file.read_text(encoding="utf-8", errors="ignore")

            files.append(
                {
                    "name": file.name,
                    "agent_name": agent_names.get(file.name, "Unknown Agent"),
                    "path": str(file),
                    "size": file.stat().st_size,
                    "content": content,
                }
            )

    return {
        "count": len(files),
        "files": files,
    }


@app.get("/runs")
def archived_runs():
    runs = []

    if RUNS_DIR.exists():
        for folder in sorted(RUNS_DIR.iterdir(), reverse=True):
            if folder.is_dir():
                md_files = list(folder.glob("*.md"))
                runs.append(
                    {
                        "name": folder.name,
                        "path": str(folder),
                        "file_count": len(md_files),
                    }
                )

    return {
        "count": len(runs),
        "runs": runs,
    }


# =========================
# MEMORY ROUTES
# =========================

@app.get("/memory/short-term")
def get_short_term_memory():
    return {
        "content": read_text_file(SHORT_TERM_MEMORY),
    }


@app.get("/memory/long-term")
def get_long_term_memory():
    return {
        "content": read_text_file(LONG_TERM_MEMORY),
    }


@app.get("/memory/all")
def get_all_memory():
    return {
        "short_term_memory": read_text_file(SHORT_TERM_MEMORY),
        "long_term_memory": read_text_file(LONG_TERM_MEMORY),
        "ui_style_memory": read_text_file(UI_STYLE_MEMORY),
        "feature_memory": read_text_file(FEATURE_MEMORY),
        "project_rules": read_text_file(PROJECT_RULES_MEMORY),
        "page_plan_memory": read_text_file(PAGE_PLAN_MEMORY),
    }


@app.post("/memory/write")
def write_memory(request: MemoryWriteRequest):
    memory_map = {
        "short_term": SHORT_TERM_MEMORY,
        "long_term": LONG_TERM_MEMORY,
        "ui_style": UI_STYLE_MEMORY,
        "features": FEATURE_MEMORY,
        "project_rules": PROJECT_RULES_MEMORY,
        "page_plan": PAGE_PLAN_MEMORY,
    }

    target_file = memory_map.get(request.memory_type)

    if target_file is None:
        return {
            "ok": False,
            "message": (
                "Invalid memory_type. Use one of: "
                "short_term, long_term, ui_style, features, project_rules, page_plan."
            ),
        }

    append_text_file(
        file_path=target_file,
        title=request.title,
        content=request.content,
    )

    return {
        "ok": True,
        "message": "Memory saved successfully.",
        "memory_type": request.memory_type,
        "file": str(target_file),
    }


# =========================
# AGENT STATUS / ERRORS
# =========================

@app.get("/agents/status")
def agents_status():
    if not MEMORY_DB.exists():
        return {"error": "agent_memory.db not found"}

    conn = db_connect()
    cur = conn.cursor()

    cur.execute(
        """
        SELECT id, run_name, status, started_at, ended_at, archive_path
        FROM runs
        ORDER BY id DESC
        LIMIT 1
        """
    )

    latest_run = cur.fetchone()

    if not latest_run:
        conn.close()
        return {"error": "No runs found in database"}

    run_id, run_name, run_status, started_at, ended_at, archive_path = latest_run

    cur.execute(
        """
        SELECT task_order, agent_name, status, output_file, error_message
        FROM agent_tasks
        WHERE run_id = ?
        ORDER BY task_order
        """,
        (run_id,),
    )

    agents = []
    for row in cur.fetchall():
        agents.append(
            {
                "task_order": row[0],
                "agent_name": row[1],
                "status": row[2],
                "output_file": row[3],
                "error_message": row[4],
            }
        )

    conn.close()

    return {
        "run": {
            "id": run_id,
            "name": run_name,
            "status": run_status,
            "started_at": started_at,
            "ended_at": ended_at,
            "archive_path": archive_path,
        },
        "agents": agents,
    }


@app.get("/errors")
def get_errors():
    if not MEMORY_DB.exists():
        return {"error": "agent_memory.db not found"}

    conn = db_connect()
    cur = conn.cursor()

    cur.execute(
        """
        SELECT id, run_id, agent_name, error_type, error_message, suggested_fix, created_at
        FROM agent_errors
        ORDER BY id DESC
        LIMIT 50
        """
    )

    errors = []
    for row in cur.fetchall():
        errors.append(
            {
                "id": row[0],
                "run_id": row[1],
                "agent_name": row[2],
                "error_type": row[3],
                "error_message": row[4],
                "suggested_fix": row[5],
                "created_at": row[6],
            }
        )

    conn.close()

    return {
        "count": len(errors),
        "errors": errors,
    }


# =========================
# CONTROL ROUTES
# =========================

RUN_PROCESS = None
RUN_LOGS = []


def read_process_logs(process):
    global RUN_LOGS

    if process.stdout is None:
        return

    for line in process.stdout:
        RUN_LOGS.append(line.rstrip())

        if len(RUN_LOGS) > 300:
            RUN_LOGS = RUN_LOGS[-300:]


def start_background_process(command, message):
    global RUN_PROCESS, RUN_LOGS

    if RUN_PROCESS is not None and RUN_PROCESS.poll() is None:
        return {
            "ok": False,
            "message": "Agents are already running. Please wait.",
        }

    RUN_LOGS = []
    RUN_LOGS.append(f"Starting command: {' '.join(command)}")

    env = os.environ.copy()
    env["PYTHONIOENCODING"] = "utf-8"
    env["PYTHONUTF8"] = "1"

    RUN_PROCESS = subprocess.Popen(
        command,
        cwd=str(CREWAI_DIR),
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
        encoding="utf-8",
        errors="replace",
        env=env,
        shell=False,
    )

    thread = threading.Thread(
        target=read_process_logs,
        args=(RUN_PROCESS,),
        daemon=True,
    )
    thread.start()

    return {
        "ok": True,
        "message": message,
    }


@app.get("/control/status")
def control_status():
    global RUN_PROCESS

    if RUN_PROCESS is None:
        return {
            "running": False,
            "message": "No agent process running",
        }

    if RUN_PROCESS.poll() is None:
        return {
            "running": True,
            "message": "Agent process is running",
        }

    return {
        "running": False,
        "message": "Agent process finished",
        "exit_code": RUN_PROCESS.returncode,
    }


@app.get("/control/logs")
def control_logs():
    return {
        "count": len(RUN_LOGS),
        "logs": RUN_LOGS[-100:],
    }


@app.post("/control/start")
def start_agents():
    return start_background_process(
        ["crewai", "run"],
        "CrewAI agents started",
    )


@app.post("/control/resume")
def resume_agents():
    return start_background_process(
        [sys.executable, "resume_run.py"],
        "Resume started",
    )


@app.post("/control/archive")
def archive_current_run():
    process = subprocess.run(
        [sys.executable, "archive_run.py"],
        cwd=str(CREWAI_DIR),
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace",
    )

    return {
        "ok": process.returncode == 0,
        "message": "Archive command finished",
        "output": process.stdout,
        "error": process.stderr,
    }


@app.post("/control/scan-memory")
def scan_memory():
    process = subprocess.run(
        [sys.executable, "memory_manager.py"],
        cwd=str(CREWAI_DIR),
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace",
    )

    return {
        "ok": process.returncode == 0,
        "message": "Memory scan finished",
        "output": process.stdout,
        "error": process.stderr,
    }


@app.post("/control/stop")
def stop_agents():
    global RUN_PROCESS, RUN_LOGS

    if RUN_PROCESS is None:
        return {
            "ok": False,
            "message": "No agent process is running.",
        }

    if RUN_PROCESS.poll() is not None:
        return {
            "ok": False,
            "message": "Agent process already finished.",
            "exit_code": RUN_PROCESS.returncode,
        }

    RUN_LOGS.append("Stop requested from dashboard.")

    RUN_PROCESS.terminate()

    try:
        RUN_PROCESS.wait(timeout=10)
        RUN_LOGS.append("Agent process stopped safely.")
        return {
            "ok": True,
            "message": "Agent process stopped safely.",
        }
    except Exception:
        RUN_PROCESS.kill()
        RUN_LOGS.append("Agent process force killed.")
        return {
            "ok": True,
            "message": "Agent process force killed.",
        }


# =========================
# NIM CHAT HELPERS
# =========================

AGENT_SYSTEM_PROMPTS = {
    "All Agents": (
        "You are Devendra's private AI Agent OS. "
        "First understand the user's actual request and the uploaded file content. "
        "Do not assume every file is an app, website, frontend project, or product. "
        "If the uploaded file is a legal document, explain it as a legal/consumer-case document. "
        "If it is code, review the code. "
        "If it is a PDF, summarize the real PDF content. "
        "If it is an app idea, then cover product, UI, frontend, backend, database, architecture, testing, and review. "
        "Always answer based on the actual extracted file content when file content is provided. "
        "Do not say you cannot access the file if file content is provided."
    ),
    "Product Manager": (
        "You are a Product Manager agent. "
        "Only give product analysis if the user is discussing an app, business, feature, or product. "
        "If the uploaded file is not product-related, summarize it normally first, then mention any product relevance only if useful."
    ),
    "UI/UX Designer": (
        "You are a UI/UX Designer agent. "
        "Focus on UI/UX only when the user asks about screens, design, layout, website, app, or interface. "
        "If the uploaded file is a legal PDF or normal document, explain the document clearly instead of forcing UI analysis."
    ),
    "Frontend Developer": (
        "You are a Frontend Developer agent. "
        "Focus on HTML, CSS, JavaScript, React, Next.js, Tailwind, and frontend implementation only when code or frontend tasks are provided. "
        "If the uploaded file is not code, summarize the actual file content."
    ),
    "Backend Developer": (
        "You are a Backend Developer agent. "
        "Focus on APIs, FastAPI, backend logic, services, security, and integration only when the user asks about backend or code. "
        "If the uploaded file is a normal document, summarize it based on the file content."
    ),
    "Database Engineer": (
        "You are a Database Engineer agent. "
        "Focus on database schema, SQLite, Supabase, tables, relationships, and storage only when the user asks about data/database. "
        "If the uploaded file is not database-related, explain the document normally."
    ),
    "System Architect": (
        "You are a System Architect agent. "
        "Focus on architecture only when the user asks about systems, apps, agents, infrastructure, or software design. "
        "If the uploaded file is a legal, study, or normal PDF, summarize its actual purpose and structure."
    ),
    "QA Tester": (
        "You are a QA Tester agent. "
        "Focus on tests, bugs, validation, and edge cases only when testing is relevant. "
        "If the uploaded file is a document, check clarity, missing details, and possible issues in that document."
    ),
    "Project Reviewer": (
        "You are a Project Reviewer agent. "
        "Review the actual content given by the user. "
        "Do not force app-development categories unless the file is actually an app, website, codebase, or product plan."
    ),
}


def create_chat_session(request: ChatRequest):
    title = request.message.strip()[:50] or "New chat"

    conn = db_connect()
    cur = conn.cursor()

    cur.execute(
        """
        INSERT INTO chat_sessions (title, agent, provider, model)
        VALUES (?, ?, ?, ?)
        """,
        (title, request.agent, request.provider, request.model),
    )

    session_id = cur.lastrowid

    conn.commit()
    conn.close()

    return session_id


def save_chat_message(session_id, role, agent, content, file_name=None):
    conn = db_connect()
    cur = conn.cursor()

    cur.execute(
        """
        INSERT INTO chat_messages (session_id, role, agent, content, file_name)
        VALUES (?, ?, ?, ?, ?)
        """,
        (session_id, role, agent, content, file_name),
    )

    cur.execute(
        """
        UPDATE chat_sessions
        SET updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
        """,
        (session_id,),
    )

    conn.commit()
    conn.close()


def extract_text_from_file(file_path: Path):
    suffix = file_path.suffix.lower()

    if suffix == ".pdf":
        reader = PdfReader(str(file_path))
        text_parts = []

        for page in reader.pages:
            text_parts.append(page.extract_text() or "")

        return "\n".join(text_parts).strip()

    if suffix in [
        ".txt",
        ".md",
        ".csv",
        ".json",
        ".html",
        ".htm",
        ".tsx",
        ".ts",
        ".js",
        ".jsx",
        ".py",
        ".yaml",
        ".yml",
    ]:
        return file_path.read_text(encoding="utf-8", errors="ignore")

    try:
        return file_path.read_text(encoding="utf-8", errors="ignore")
    except Exception:
        return ""


def call_nvidia_nim(request: ChatRequest):
    nvidia_api_key = os.getenv("NVIDIA_API_KEY")

    if not nvidia_api_key:
        return (
            "NVIDIA_API_KEY is missing in .env.\n\n"
            "Add NVIDIA_API_KEY=your_key_here and restart backend."
        )

    client = OpenAI(
        base_url="https://integrate.api.nvidia.com/v1",
        api_key=nvidia_api_key,
    )

    system_prompt = AGENT_SYSTEM_PROMPTS.get(
        request.agent,
        "You are a helpful AI agent inside a private local AI Agent OS.",
    )

    memory_context = build_memory_context()
    system_prompt = system_prompt + "\n\n" + memory_context

    user_message = request.message

    if request.file_name and request.file_content:
        user_message += (
            f"\n\nIMPORTANT: The user uploaded a file named: {request.file_name}.\n"
            "The actual extracted file content is pasted below. "
            "Use the extracted content as the source of truth. "
            "First identify what type of file it is. "
            "Do not assume it is an app, website, frontend project, or product unless the content clearly shows that. "
            "If it is a legal/consumer complaint PDF, explain it as a legal case document. "
            "Do NOT say you cannot access the file.\n\n"
            "----- FILE CONTENT START -----\n"
            f"{request.file_content[:12000]}\n"
            "----- FILE CONTENT END -----"
        )

    elif request.file_name and not request.file_content:
        user_message += (
            f"\n\nThe user attached a file named {request.file_name}, "
            "but extracted text was empty. Say that text extraction failed."
        )

    completion = client.chat.completions.create(
        model=request.model,
        messages=[
            {
                "role": "system",
                "content": system_prompt,
            },
            {
                "role": "user",
                "content": user_message,
            },
        ],
        temperature=0.3,
        max_tokens=1200,
    )

    return completion.choices[0].message.content


# =========================
# FILE / IMAGE HELPERS
# =========================

def image_to_data_url(file_path: Path):
    mime_type, _ = mimetypes.guess_type(str(file_path))

    if not mime_type:
        mime_type = "image/png"

    image_bytes = file_path.read_bytes()
    encoded = base64.b64encode(image_bytes).decode("utf-8")

    return f"data:{mime_type};base64,{encoded}"


def save_generated_design_note(file_name: str, content: str):
    safe_stem = Path(file_name).stem.replace(" ", "_")
    output_file = GENERATED_DESIGNS_DIR / f"{safe_stem}_analysis.md"

    output_file.write_text(content, encoding="utf-8")

    return output_file


# =========================
# CHAT UPLOAD
# =========================

@app.post("/chat/upload")
async def upload_chat_file(file: UploadFile = File(...)):
    safe_name = file.filename or "uploaded_file"
    file_path = CHAT_UPLOADS_DIR / safe_name

    counter = 1
    while file_path.exists():
        stem = Path(safe_name).stem
        suffix = Path(safe_name).suffix
        file_path = CHAT_UPLOADS_DIR / f"{stem}_{counter}{suffix}"
        counter += 1

    content = await file.read()
    file_path.write_bytes(content)

    extracted_text = extract_text_from_file(file_path)

    return {
        "ok": True,
        "file_name": file_path.name,
        "file_path": str(file_path),
        "extracted_text": extracted_text[:12000],
        "text_length": len(extracted_text),
    }


# =========================
# UI REFERENCE IMAGE ROUTES
# =========================

ALLOWED_IMAGE_EXTENSIONS = {
    ".png",
    ".jpg",
    ".jpeg",
    ".webp",
    ".gif",
}


@app.post("/ui/upload-reference")
async def upload_ui_reference_image(file: UploadFile = File(...)):
    safe_name = file.filename or "ui_reference_image"
    suffix = Path(safe_name).suffix.lower()

    if suffix not in ALLOWED_IMAGE_EXTENSIONS:
        return {
            "ok": False,
            "message": "Only PNG, JPG, JPEG, WEBP, and GIF images are allowed.",
            "file_name": safe_name,
        }

    file_path = UI_REFERENCE_IMAGES_DIR / safe_name

    counter = 1
    while file_path.exists():
        stem = Path(safe_name).stem
        suffix = Path(safe_name).suffix
        file_path = UI_REFERENCE_IMAGES_DIR / f"{stem}_{counter}{suffix}"
        counter += 1

    content = await file.read()
    file_path.write_bytes(content)

    return {
        "ok": True,
        "message": "UI reference image uploaded successfully.",
        "file_name": file_path.name,
        "file_path": str(file_path),
        "view_url": f"/ui/reference-images/{file_path.name}",
    }


@app.get("/ui/reference-images")
def list_ui_reference_images():
    images = []

    if UI_REFERENCE_IMAGES_DIR.exists():
        for file in sorted(UI_REFERENCE_IMAGES_DIR.iterdir(), reverse=True):
            if file.is_file() and file.suffix.lower() in ALLOWED_IMAGE_EXTENSIONS:
                images.append(
                    {
                        "file_name": file.name,
                        "file_path": str(file),
                        "size": file.stat().st_size,
                        "modified": file.stat().st_mtime,
                        "view_url": f"/ui/reference-images/{file.name}",
                    }
                )

    return {
        "count": len(images),
        "images": images,
    }


@app.get("/ui/reference-images/{file_name}")
def view_ui_reference_image(file_name: str):
    safe_name = Path(file_name).name
    file_path = UI_REFERENCE_IMAGES_DIR / safe_name

    if not file_path.exists():
        return {
            "ok": False,
            "message": "Image not found.",
            "file_name": safe_name,
        }

    if file_path.suffix.lower() not in ALLOWED_IMAGE_EXTENSIONS:
        return {
            "ok": False,
            "message": "Invalid image file type.",
            "file_name": safe_name,
        }

    return FileResponse(str(file_path))

@app.delete("/ui/reference-images/{file_name}")
def delete_ui_reference_image(file_name: str):
    safe_name = Path(file_name).name
    file_path = UI_REFERENCE_IMAGES_DIR / safe_name

    if not file_path.exists():
        return {
            "ok": False,
            "message": "Image not found.",
            "file_name": safe_name,
        }

    if file_path.suffix.lower() not in ALLOWED_IMAGE_EXTENSIONS:
        return {
            "ok": False,
            "message": "Invalid image file type.",
            "file_name": safe_name,
        }

    file_path.unlink()

    return {
        "ok": True,
        "message": "UI reference image deleted successfully.",
        "file_name": safe_name,
    }


@app.post("/ui/analyze-reference")
def analyze_ui_reference_image(request: UIAnalyzeRequest):
    nvidia_api_key = os.getenv("NVIDIA_API_KEY")

    if not nvidia_api_key:
        return {
            "ok": False,
            "message": "NVIDIA_API_KEY is missing in .env.",
        }

    safe_name = Path(request.file_name).name
    file_path = UI_REFERENCE_IMAGES_DIR / safe_name

    if not file_path.exists():
        return {
            "ok": False,
            "message": "UI reference image not found.",
            "file_name": safe_name,
        }

    if file_path.suffix.lower() not in ALLOWED_IMAGE_EXTENSIONS:
        return {
            "ok": False,
            "message": "Invalid image file type.",
            "file_name": safe_name,
        }

    image_data_url = image_to_data_url(file_path)
    memory_context = build_memory_context()

    user_prompt = request.prompt or (
        "Analyze this uploaded UI reference image. "
        "Identify the layout, colors, typography, spacing, components, cards, buttons, navigation, "
        "visual hierarchy, mobile/desktop behavior, and what frontend pages/components can be built from it. "
        "Then create a practical React + Tailwind implementation plan. "
        "Do not generate final code yet. First create detailed UI notes."
    )

    client = OpenAI(
        base_url="https://integrate.api.nvidia.com/v1",
        api_key=nvidia_api_key,
    )

    completion = client.chat.completions.create(
        model=request.model,
        messages=[
            {
                "role": "system",
                "content": (
                    "You are a UI Vision Analyzer Agent inside Devendra's private AI Agent OS. "
                    "You analyze UI screenshots and convert them into clear design notes for UI/UX and frontend agents. "
                    "Use the shared project memory below when useful.\n\n"
                    f"{memory_context}"
                ),
            },
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": user_prompt,
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": image_data_url,
                        },
                    },
                ],
            },
        ],
        temperature=0.2,
        max_tokens=1600,
    )

    analysis = completion.choices[0].message.content or ""
    memory_title = f"UI Reference Analysis - {safe_name}"

    append_text_file(
        file_path=UI_STYLE_MEMORY,
        title=memory_title,
        content=analysis,
    )

    design_file = save_generated_design_note(
        file_name=safe_name,
        content=analysis,
    )

    return {
        "ok": True,
        "message": "UI reference image analyzed successfully.",
        "file_name": safe_name,
        "model": request.model,
        "analysis": analysis,
        "saved_to_memory": str(UI_STYLE_MEMORY),
        "saved_design_file": str(design_file),
    }


# =========================
# GENERATED FILE ROUTES
# =========================

GENERATED_CATEGORY_MAP = {
    "ui_images": GENERATED_UI_IMAGES_DIR,
    "pages": GENERATED_PAGES_DIR,
    "components": GENERATED_COMPONENTS_DIR,
    "designs": GENERATED_DESIGNS_DIR,
    "final_app": GENERATED_FINAL_APP_DIR,
    "reports": GENERATED_REPORTS_DIR,
}

IMAGE_EXTENSIONS = {".png", ".jpg", ".jpeg", ".webp", ".gif"}

TEXT_EXTENSIONS = {
    ".txt",
    ".md",
    ".json",
    ".html",
    ".htm",
    ".tsx",
    ".ts",
    ".js",
    ".jsx",
    ".py",
    ".css",
    ".yaml",
    ".yml",
}


def list_generated_folder(folder_path: Path, category: str):
    files = []

    if not folder_path.exists():
        return files

    for file in sorted(folder_path.iterdir(), reverse=True):
        if not file.is_file():
            continue

        suffix = file.suffix.lower()

        if suffix in IMAGE_EXTENSIONS:
            file_type = "image"
        elif suffix in TEXT_EXTENSIONS:
            file_type = "text"
        else:
            file_type = "file"

        files.append(
            {
                "file_name": file.name,
                "category": category,
                "file_type": file_type,
                "file_path": str(file),
                "size": file.stat().st_size,
                "modified": file.stat().st_mtime,
                "view_url": f"/generated/{category}/{file.name}",
            }
        )

    return files


@app.get("/generated/all")
def get_all_generated_files():
    result = {}

    for category, folder_path in GENERATED_CATEGORY_MAP.items():
        result[category] = list_generated_folder(folder_path, category)

    return {
        "ok": True,
        "generated": result,
    }


@app.get("/generated/{category}")
def get_generated_files_by_category(category: str):
    folder_path = GENERATED_CATEGORY_MAP.get(category)

    if folder_path is None:
        return {
            "ok": False,
            "message": (
                "Invalid category. Use one of: "
                "ui_images, pages, components, designs, final_app, reports."
            ),
            "files": [],
        }

    files = list_generated_folder(folder_path, category)

    return {
        "ok": True,
        "category": category,
        "count": len(files),
        "files": files,
    }


@app.get("/generated/{category}/{file_name}")
def view_generated_file(category: str, file_name: str):
    folder_path = GENERATED_CATEGORY_MAP.get(category)

    if folder_path is None:
        return {
            "ok": False,
            "message": "Invalid generated file category.",
        }

    safe_name = Path(file_name).name
    file_path = folder_path / safe_name

    if not file_path.exists():
        return {
            "ok": False,
            "message": "Generated file not found.",
            "file_name": safe_name,
        }

    return FileResponse(str(file_path))


# =========================
# PAGE BUILDER ROUTES
# =========================

def safe_page_file_name(page_name: str):
    cleaned = page_name.strip().lower()
    cleaned = cleaned.replace(" ", "_").replace("-", "_")

    allowed = []

    for char in cleaned:
        if char.isalnum() or char == "_":
            allowed.append(char)

    final_name = "".join(allowed).strip("_")

    if not final_name:
        final_name = "generated_page"

    return f"{final_name}.tsx"


def extract_code_from_response(text: str):
    if "```tsx" in text:
        return text.split("```tsx", 1)[1].split("```", 1)[0].strip()

    if "```typescript" in text:
        return text.split("```typescript", 1)[1].split("```", 1)[0].strip()

    if "```" in text:
        return text.split("```", 1)[1].split("```", 1)[0].strip()

    return text.strip()


@app.post("/builder/generate-page")
def generate_page_code(request: PageBuildRequest):
    nvidia_api_key = os.getenv("NVIDIA_API_KEY")

    if not nvidia_api_key:
        return {
            "ok": False,
            "message": "NVIDIA_API_KEY is missing in .env.",
        }

    memory_context = build_memory_context()

    client = OpenAI(
        base_url="https://integrate.api.nvidia.com/v1",
        api_key=nvidia_api_key,
    )

    prompt = f"""
You are a senior frontend engineer inside Devendra's private AI Agent OS.

Generate one complete React + Tailwind page component.

IMPORTANT RULES:
- Output only TSX code.
- Use Next.js App Router style.
- The file must start with "use client";
- Use React functional component.
- Use Tailwind CSS only.
- Do not import external UI libraries.
- Do not use shadcn unless explicitly asked.
- Make it dark, modern, clean, and production-quality.
- Use the saved UI memory when useful.
- Do not explain the code.
- Do not wrap output in markdown unless unavoidable.

PAGE NAME:
{request.page_name}

ROUTE PATH:
{request.route_path}

USER DESCRIPTION:
{request.description}

SHARED MEMORY:
{memory_context}
""".strip()

    completion = client.chat.completions.create(
        model=request.model,
        messages=[
            {
                "role": "system",
                "content": (
                    "You are a React, Next.js, Tailwind frontend code generator. "
                    "Return clean TSX code only."
                ),
            },
            {
                "role": "user",
                "content": prompt,
            },
        ],
        temperature=0.2,
        max_tokens=4000,
    )

    raw_output = completion.choices[0].message.content or ""
    code = extract_code_from_response(raw_output)

    file_name = safe_page_file_name(request.page_name)
    output_file = GENERATED_PAGES_DIR / file_name
    output_file.write_text(code, encoding="utf-8")

    return {
        "ok": True,
        "message": "Page generated successfully.",
        "page_name": request.page_name,
        "route_path": request.route_path,
        "model": request.model,
        "file_name": file_name,
        "saved_file": str(output_file),
        "view_url": f"/generated/pages/{file_name}",
        "code": code,
    }


def safe_route_to_page_file(route_path: str):
    cleaned = route_path.strip()

    if not cleaned.startswith("/"):
        cleaned = "/" + cleaned

    cleaned = cleaned.strip("/")

    if cleaned == "":
        return FRONTEND_APP_DIR / "page.tsx"

    parts = []

    for part in cleaned.split("/"):
        part = part.strip()

        if not part:
            continue

        safe_part = "".join(
            char for char in part if char.isalnum() or char in ["-", "_"]
        )

        if not safe_part:
            continue

        parts.append(safe_part)

    if not parts:
        return FRONTEND_APP_DIR / "page.tsx"

    return FRONTEND_APP_DIR.joinpath(*parts) / "page.tsx"


@app.post("/builder/install-page")
def install_generated_page(request: InstallPageRequest):
    safe_file_name = Path(request.file_name).name
    source_file = GENERATED_PAGES_DIR / safe_file_name

    if not source_file.exists():
        return {
            "ok": False,
            "message": "Generated page file not found.",
            "file_name": safe_file_name,
        }

    if source_file.suffix.lower() != ".tsx":
        return {
            "ok": False,
            "message": "Only .tsx generated pages can be installed.",
            "file_name": safe_file_name,
        }

    target_file = safe_route_to_page_file(request.route_path)

    if target_file.exists() and not request.overwrite:
        return {
            "ok": False,
            "message": (
                "Target page already exists. Set overwrite=true if you want to replace it."
            ),
            "target_file": str(target_file),
        }

    target_file.parent.mkdir(parents=True, exist_ok=True)

    code = source_file.read_text(encoding="utf-8", errors="ignore")
    target_file.write_text(code, encoding="utf-8")

    return {
        "ok": True,
        "message": "Generated page installed successfully.",
        "source_file": str(source_file),
        "target_file": str(target_file),
        "route_path": request.route_path,
        "live_url": f"http://localhost:3000{request.route_path}",
    }


# =========================
# CHAT ROUTES
# =========================

@app.post("/chat/send")
def send_chat_message(request: ChatRequest):
    try:
        session_id = request.session_id

        if session_id is None:
            session_id = create_chat_session(request)

        user_content_to_save = request.message

        if request.file_name:
            user_content_to_save += f"\n\nAttached file: {request.file_name}"

        save_chat_message(
            session_id=session_id,
            role="user",
            agent="You",
            content=user_content_to_save,
            file_name=request.file_name,
        )

        if request.provider == "NVIDIA NIM":
            reply = call_nvidia_nim(request)
        else:
            reply = (
                f"{request.provider} is not connected yet.\n\n"
                f"Agent: {request.agent}\n"
                f"Model: {request.model}\n\n"
                "For now, only NVIDIA NIM is connected."
            )

        save_chat_message(
            session_id=session_id,
            role="agent",
            agent=request.agent,
            content=reply,
            file_name=None,
        )

        return {
            "ok": True,
            "session_id": session_id,
            "agent": request.agent,
            "provider": request.provider,
            "model": request.model,
            "file_name": request.file_name,
            "file_content_length": len(request.file_content or ""),
            "reply": reply,
        }

    except Exception as error:
        return {
            "ok": False,
            "session_id": request.session_id,
            "agent": request.agent,
            "provider": request.provider,
            "model": request.model,
            "file_name": request.file_name,
            "file_content_length": len(request.file_content or ""),
            "reply": f"NVIDIA/API error: {str(error)}",
        }


@app.get("/chat/sessions")
def get_chat_sessions():
    conn = db_connect()
    cur = conn.cursor()

    cur.execute(
        """
        SELECT id, title, agent, provider, model, created_at, updated_at
        FROM chat_sessions
        ORDER BY updated_at DESC
        LIMIT 50
        """
    )

    sessions = []

    for row in cur.fetchall():
        sessions.append(
            {
                "id": row[0],
                "title": row[1],
                "agent": row[2],
                "provider": row[3],
                "model": row[4],
                "created_at": row[5],
                "updated_at": row[6],
            }
        )

    conn.close()

    return {
        "count": len(sessions),
        "sessions": sessions,
    }


@app.get("/chat/history/{session_id}")
def get_chat_history(session_id: int):
    conn = db_connect()
    cur = conn.cursor()

    cur.execute(
        """
        SELECT id, role, agent, content, file_name, created_at
        FROM chat_messages
        WHERE session_id = ?
        ORDER BY id ASC
        """,
        (session_id,),
    )

    messages = []

    for row in cur.fetchall():
        messages.append(
            {
                "id": row[0],
                "role": row[1],
                "agent": row[2],
                "content": row[3],
                "file_name": row[4],
                "created_at": row[5],
            }
        )

    conn.close()

    return {
        "session_id": session_id,
        "count": len(messages),
        "messages": messages,
    }


@app.put("/chat/sessions/{session_id}/rename")
def rename_chat_session(session_id: int, request: RenameChatRequest):
    new_title = request.title.strip()

    if not new_title:
        return {
            "ok": False,
            "message": "Chat title cannot be empty.",
        }

    conn = db_connect()
    cur = conn.cursor()

    cur.execute(
        """
        UPDATE chat_sessions
        SET title = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
        """,
        (new_title, session_id),
    )

    conn.commit()
    affected = cur.rowcount
    conn.close()

    if affected == 0:
        return {
            "ok": False,
            "message": "Chat session not found.",
        }

    return {
        "ok": True,
        "message": "Chat renamed successfully.",
        "session_id": session_id,
        "title": new_title,
    }


@app.delete("/chat/sessions/{session_id}")
def delete_chat_session(session_id: int):
    conn = db_connect()
    cur = conn.cursor()

    cur.execute(
        """
        DELETE FROM chat_messages
        WHERE session_id = ?
        """,
        (session_id,),
    )

    cur.execute(
        """
        DELETE FROM chat_sessions
        WHERE id = ?
        """,
        (session_id,),
    )

    conn.commit()
    affected = cur.rowcount
    conn.close()

    if affected == 0:
        return {
            "ok": False,
            "message": "Chat session not found.",
        }

    return {
        "ok": True,
        "message": "Chat deleted successfully.",
        "session_id": session_id,
    }
