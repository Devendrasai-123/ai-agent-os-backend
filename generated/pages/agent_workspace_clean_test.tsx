"use client";

import React, { useState, useRef } from "react";

type ChatMessage = {
  id: string;
  role: "user" | "agent";
  content: string;
  timestamp: Date;
  images?: string[];
};

type AgentPage = {
  id: string;
  name: string;
  route: string;
  status: "building" | "ready" | "error";
  createdAt: Date;
};

type ChatTab = "app-builder" | "ui-reference" | "code-agent";

const initialMessages: Record<ChatTab, ChatMessage[]> = {
  "app-builder": [
    {
      id: "1",
      role: "agent",
      content: "Welcome to the App Builder. Describe the app you want to build and I'll architect the full stack — PRD, UI design, frontend, backend, database, and deployment plan.",
      timestamp: new Date(),
    },
  ],
  "ui-reference": [
    {
      id: "1",
      role: "agent",
      content: "Upload any UI screenshot or design reference. I'll analyze the layout, colors, typography, spacing, and component structure — then generate matching code.",
      timestamp: new Date(),
    },
  ],
  "code-agent": [
    {
      id: "1",
      role: "agent",
      content: "I'm your Code Agent. Describe a feature, paste a bug, or share a spec — I'll write production-ready TypeScript, React, and Tailwind code with full type safety.",
      timestamp: new Date(),
    },
  ],
};

const agentPages: AgentPage[] = [
  { id: "p1", name: "Health Dashboard", route: "/health-dashboard", status: "ready", createdAt: new Date("2026-06-20") },
  { id: "p2", name: "Lab Reports Viewer", route: "/lab-reports", status: "ready", createdAt: new Date("2026-06-21") },
  { id: "p3", name: "Medication Tracker", route: "/medication-tracker", status: "building", createdAt: new Date("2026-06-22") },
  { id: "p4", name: "Body Metrics Log", route: "/body-metrics", status: "error", createdAt: new Date("2026-06-22") },
  { id: "p5", name: "AI Chat History", route: "/ai-chat-history", status: "ready", createdAt: new Date("2026-06-19") },
];

export default function AgentWorkspaceCleanTest() {
  const [activeTab, setActiveTab] = useState<ChatTab>("app-builder");
  const [messages, setMessages] = useState<Record<ChatTab, ChatMessage[]>>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [pages] = useState<AgentPage[]>(agentPages);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const tabs: { key: ChatTab; label: string; icon: string }[] = [
    { key: "app-builder", label: "App Builder", icon: "◆" },
    { key: "ui-reference", label: "UI Reference", icon: "◈" },
    { key: "code-agent", label: "Code Agent", icon: "⟐" },
  ];

  const handleSend = () => {
    if (!inputValue.trim() && uploadedImages.length === 0) return;

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
      images: uploadedImages.length > 0 ? [...uploadedImages] : undefined,
    };

    setMessages((prev) => ({
      ...prev,
      [activeTab]: [...prev[activeTab], newMsg],
    }));

    setInputValue("");
    setUploadedImages([]);

    setTimeout(() => {
      const agentReply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "agent",
        content: getAgentReply(activeTab, inputValue),
        timestamp: new Date(),
      };
      setMessages((prev) => ({
        ...prev,
        [activeTab]: [...prev[activeTab], agentReply],
      }));
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 800);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const readers: Promise<string>[] = [];
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      readers.push(
        new Promise((resolve) => {
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(files[i]);
        })
      );
    }
    Promise.all(readers).then((results) => {
      setUploadedImages((prev) => [...prev, ...results]);
    });
    e.target.value = "";
  };

  const removeUploadedImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const deleteMessage = (tabKey: ChatTab, msgId: string) => {
    setMessages((prev) => ({
      ...prev,
      [tabKey]: prev[tabKey].filter((m) => m.id !== msgId),
    }));
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const rethinkMessage = (tabKey: ChatTab, msgId: string) => {
    const msg = messages[tabKey].find((m) => m.id === msgId);
    if (!msg || msg.role !== "agent") return;
    const rethinkMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "agent",
      content: `[Rethought] ${msg.content}`,
      timestamp: new Date(),
    };
    setMessages((prev) => ({
      ...prev,
      [tabKey]: [...prev[tabKey].filter((m) => m.id !== msgId), rethinkMsg],
    }));
  };

  const statusColor = (status: string) => {
    switch (status) {
      case "ready":
        return "text-emerald-400";
      case "building":
        return "text-amber-400";
      case "error":
        return "text-rose-400";
      default:
        return "text-gray-400";
    }
  };

  const statusBg = (status: string) => {
    switch (status) {
      case "ready":
        return "bg-emerald-400/10 border-emerald-400/20";
      case "building":
        return "bg-amber-400/10 border-amber-400/20";
      case "error":
        return "bg-rose-400/10 border-rose-400/20";
      default:
        return "bg-gray-400/10 border-gray-400/20";
    }
  };

  return (
    <div className="flex h-screen w-screen bg-[#0B0F19] text-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-0"
        } transition-all duration-300 bg-[#111827] border-r border-gray-800/60 flex flex-col overflow-hidden flex-shrink-0`}
      >
        {/* Logo */}
        <div className="p-5 border-b border-gray-800/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white text-sm font-bold">
              A
            </div>
            <div>
              <h1 className="text-base font-bold text-white tracking-tight">
                Agent<span className="text-violet-400">OS</span>
              </h1>
              <p className="text-[10px] text-gray-500 tracking-wider uppercase">Workspace</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          <p className="text-[10px] uppercase tracking-widest text-gray-600 px-3 mb-2 mt-1">Chats</p>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? "bg-violet-500/15 text-violet-300 border border-violet-500/20"
                  : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50 border border-transparent"
              }`}
            >
              <span className="text-base">{tab.icon}</span>
              <span className="truncate">{tab.label}</span>
              {messages[tab.key].length > 1 && (
                <span className="ml-auto text-[10px] bg-gray-700/60 text-gray-400 px-1.5 py-0.5 rounded-full">
                  {messages[tab.key].length}
                </span>
              )}
            </button>
          ))}

          <div className="pt-4">
            <p className="text-[10px] uppercase tracking-widest text-gray-600 px-3 mb-2">Agent Pages</p>
            {pages.map((page) => (
              <div
                key={page.id}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm border ${statusBg(page.status)} mb-1 cursor-pointer hover:opacity-80 transition-opacity`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${statusColor(page.status).replace("text-", "bg-")}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-gray-300 text-xs font-medium truncate">{page.name}</p>
                  <p className="text-gray-600 text-[10px] truncate">{page.route}</p>
                </div>
                <span className={`text-[10px] font-medium ${statusColor(page.status)} capitalize`}>{page.status}</span>
              </div>
            ))}
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-800/60">
          <div className="rounded-xl bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 border border-violet-500/20 p-4">
            <p className="text-xs font-semibold text-violet-300 mb-1">Agent OS v2.0</p>
            <p className="text-[10px] text-gray-500">8 agents • 5 pages built</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-14 border-b border-gray-800/60 bg-[#0D1117]/80 backdrop-blur-sm flex items-center px-4 gap-3 flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-800/60 text-gray-400 hover:text-gray-200 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="15" y2="12" />
              <line x1="3" y1="18" x2="18" y2="18" />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  activeTab === tab.key
                    ? "bg-violet-500/15 text-violet-300 border border-violet-500/30"
                    : "text-gray-500 hover:text-gray-300 border border-transparent"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex-1" />

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-[10px] font-bold text-white">
              D
            </div>
          </div>
        </header>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="max-w-3xl mx-auto space-y-4">
            {messages[activeTab].map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] md:max-w-[75%] rounded-2xl px-4 py-3 relative group ${
                    msg.role === "user"
                      ? "bg-violet-600/20 border border-violet-500/20 text-gray-200"
                      : "bg-[#161B2E] border border-gray-800/60 text-gray-300"
                  }`}
                >
                  {/* Role indicator */}
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-wider ${
                        msg.role === "user" ? "text-violet-400" : "text-cyan-400"
                      }`}
                    >
                      {msg.role === "user" ? "You" : "Agent"}
                    </span>
                    <span className="text-[10px] text-gray-600">
                      {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>

                  {/* Images */}
                  {msg.images && msg.images.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {msg.images.map((img, idx) => (
                        <div key={idx} className="relative group/img">
                          <img
                            src={img}
                            alt={`Upload ${idx + 1}`}
                            className="w-32 h-24 object-cover rounded-lg border border-gray-700/50"
                          />
                          {msg.role === "user" && (
                            <button
                              onClick={() => {
                                const updated = messages[activeTab].map((m) =>
                                  m.id === msg.id
                                    ? { ...m, images: m.images?.filter((_, i) => i !== idx) }
                                    : m
                                );
                                setMessages((prev) => ({ ...prev, [activeTab]: updated }));
                              }}
                              className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-rose-500 rounded-full flex items-center justify-center text-white text-[10px] opacity-0 group-hover/img:opacity-100 transition-opacity"
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Content */}
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => copyMessage(msg.content)}
                      className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] text-gray-500 hover:text-gray-300 hover:bg-gray-700/40 transition-colors"
                      title="Copy"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                      Copy
                    </button>
                    {msg.role === "agent" && (
                      <button
                        onClick={() => rethinkMessage(activeTab, msg.id)}
                        className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] text-gray-500 hover:text-cyan-400 hover:bg-cyan-400/10 transition-colors"
                        title="Rethink"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="23 4 23 10 17 10" />
                          <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                        </svg>
                        Rethink
                      </button>
                    )}
                    <button
                      onClick={() => deleteMessage(activeTab, msg.id)}
                      className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] text-gray-500 hover:text-rose-400 hover:bg-rose-400/10 transition-colors"
                      title="Delete"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
        </div>

        {/* Upload Preview */}
        {uploadedImages.length > 0 && (
          <div className="px-4 pb-2">
            <div className="max-w-3xl mx-auto flex flex-wrap gap-2">
              {uploadedImages.map((img, idx) => (
                <div key={idx} className="relative group">
                  <img
                    src={img}
                    alt={`Preview ${idx + 1}`}
                    className="w-20 h-16 object-cover rounded-lg border border-gray-700/50"
                  />
                  <button
                    onClick={() => removeUploadedImage(idx)}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-rose-500 rounded-full flex items-center justify-center text-white text-[10px] opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ✕
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent rounded-b-lg p-1">
                    <button
                      onClick={() => removeUploadedImage(idx)}
                      className="text-[8px] text-rose-300 hover:text-rose-200 w-full text-center"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="border-t border-gray-800/60 bg-[#0D1117]/80 backdrop-blur-sm p-4 flex-shrink-0">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-end gap-2 bg-[#161B2E] border border-gray-700/50 rounded-xl px-4 py-3 focus-within:border-violet-500/40 transition-colors">
              {/* Image Upload Button */}
              {activeTab === "ui-reference" && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 rounded-lg hover:bg-gray-700/40 text-gray-500 hover:text-violet-400 transition-colors flex-shrink-0"
                  title="Upload Image"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </button>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageUpload}
              />

              {/* Text Input */}
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder={
                  activeTab === "app-builder"
                    ? "Describe the app you want to build..."
                    : activeTab === "ui-reference"
                    ? "Upload a UI screenshot or describe what to analyze..."
                    : "Describe a feature or paste code to work on..."
                }
                className="flex-1 bg-transparent text-sm text-gray-200 placeholder-gray-600 resize-none outline-none max-h-32 min-h-[24px]"
                rows={1}
              />

              {/* Send Button */}
              <button
                onClick={handleSend}
                disabled={!inputValue.trim() && uploadedImages.length === 0}
                className="p-2 rounded-lg bg-violet-500/20 text-violet-400 hover:bg-violet-500/30 hover:text-violet-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex-shrink-0"
              >