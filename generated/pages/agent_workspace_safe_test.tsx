"use client";

import React, { useState, useRef } from "react";

interface Message {
  id: string;
  role: "user" | "agent";
  content: string;
  timestamp: string;
  image?: string;
}

interface AgentPage {
  id: string;
  name: string;
  route: string;
  icon: string;
  createdAt: string;
}

const initialMessages: Record<string, Message[]> = {
  general: [
    { id: "1", role: "agent", content: "Hello! I'm your AI agent. How can I help you today?", timestamp: "10:30 AM" },
    { id: "2", role: "user", content: "I need help building a new dashboard feature.", timestamp: "10:31 AM" },
    { id: "3", role: "agent", content: "Sure! I can help with that. Let me gather the requirements and create a plan for you.", timestamp: "10:32 AM" },
  ],
  code: [
    { id: "4", role: "agent", content: "Code assistant ready. Share your snippets or describe what you need built.", timestamp: "11:00 AM" },
  ],
  debug: [
    { id: "5", role: "agent", content: "Debug mode active. Paste errors or describe issues you're facing.", timestamp: "09:15 AM" },
  ],
};

const agentPages: AgentPage[] = [
  { id: "p1", name: "Dashboard", route: "/dashboard", icon: "📊", createdAt: "Jun 20" },
  { id: "p2", name: "Health Tracker", route: "/health-tracker", icon: "🏥", createdAt: "Jun 21" },
  { id: "p3", name: "Agent Logs", route: "/agent-logs", icon: "📋", createdAt: "Jun 22" },
  { id: "p4", name: "Settings", route: "/settings", icon: "⚙️", createdAt: "Jun 22" },
  { id: "p5", name: "Reports", route: "/reports", icon: "📈", createdAt: "Jun 22" },
];

const chatTabs = [
  { key: "general", label: "General", icon: "💬" },
  { key: "code", label: "Code", icon: "🧑‍💻" },
  { key: "debug", label: "Debug", icon: "🔧" },
];

export default function AgentWorkspaceSafeTest() {
  const [activeTab, setActiveTab] = useState("general");
  const [messages, setMessages] = useState<Record<string, Message[]>>(initialMessages);
  const [input, setInput] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentMessages = messages[activeTab] || [];

  const sendMessage = () => {
    if (!input.trim() && !imagePreview) return;
    const newMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      image: imagePreview || undefined,
    };
    setMessages((prev) => ({
      ...prev,
      [activeTab]: [...(prev[activeTab] || []), newMsg],
    }));
    setInput("");
    setImagePreview(null);

    setTimeout(() => {
      const agentReply: Message = {
        id: (Date.now() + 1).toString(),
        role: "agent",
        content: generateAgentReply(input.trim()),
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => ({
        ...prev,
        [activeTab]: [...(prev[activeTab] || []), agentReply],
      }));
    }, 800);
  };

  const generateAgentReply = (userMsg: string): string => {
    if (userMsg.toLowerCase().includes("code")) return "I'll help you with the code. Could you share more details about what you're building?";
    if (userMsg.toLowerCase().includes("bug") || userMsg.toLowerCase().includes("error")) return "Let me analyze that issue. Can you share the error trace or the relevant code section?";
    if (userMsg.toLowerCase().includes("build")) return "Great idea! I'll start by creating a plan and then we can iterate on the implementation.";
    return "I understand. Let me process that and get back to you with a detailed response.";
  };

  const copyMessage = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const rethinkMessage = (id: string) => {
    setMessages((prev) => {
      const tabMsgs = [...(prev[activeTab] || [])];
      const idx = tabMsgs.findIndex((m) => m.id === id);
      if (idx !== -1 && tabMsgs[idx].role === "agent") {
        tabMsgs[idx] = { ...tabMsgs[idx], content: "Let me reconsider that... I'll provide an updated response shortly." };
      }
      return { ...prev, [activeTab]: tabMsgs };
    });
  };

  const deleteMessage = (id: string) => {
    setMessages((prev) => ({
      ...prev,
      [activeTab]: (prev[activeTab] || []).filter((m) => m.id !== id),
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex h-screen w-screen bg-[#0B0F19] text-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-0"
        } transition-all duration-300 bg-[#111827] border-r border-gray-800 flex flex-col overflow-hidden flex-shrink-0`}
      >
        {/* Logo */}
        <div className="px-5 py-5 border-b border-gray-800">
          <h1 className="text-xl font-bold tracking-tight">
            <span className="text-white">Agent</span>
            <span className="text-purple-500">OS</span>
          </h1>
          <p className="text-xs text-gray-500 mt-1">AI Workspace</p>
        </div>

        {/* Agent Pages */}
        <div className="flex-1 overflow-y-auto px-3 py-4">
          <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-2 mb-3">Agent Pages</p>
          <nav className="space-y-1">
            {agentPages.map((page) => (
              <button
                key={page.id}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:bg-[#1E293B] hover:text-white transition-colors group"
              >
                <span className="text-base">{page.icon}</span>
                <div className="flex-1 text-left">
                  <span className="font-medium">{page.name}</span>
                  <p className="text-[10px] text-gray-600 group-hover:text-gray-400">{page.route}</p>
                </div>
                <span className="text-[10px] text-gray-600">{page.createdAt}</span>
              </button>
            ))}
          </nav>

          <div className="mt-6">
            <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-2 mb-3">Quick Actions</p>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:bg-[#1E293B] hover:text-white transition-colors">
              <span className="text-base">➕</span>
              <span>New Page</span>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:bg-[#1E293B] hover:text-white transition-colors">
              <span className="text-base">📁</span>
              <span>Import Project</span>
            </button>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-800">
          <div className="bg-gradient-to-br from-purple-600/30 to-pink-600/20 rounded-xl p-4">
            <p className="text-xs font-semibold text-purple-300">Agent Status</p>
            <p className="text-[10px] text-gray-400 mt-1">8 agents completed</p>
            <div className="flex gap-1 mt-2">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-green-500" title={`Agent ${i}`} />
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-16 flex items-center justify-between px-5 border-b border-gray-800 bg-[#0D1117] flex-shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-[#1E293B] text-gray-400 hover:text-white transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <div>
              <h2 className="text-base font-semibold text-white">Agent Workspace</h2>
              <p className="text-[11px] text-gray-500">Safe Test Environment</p>
            </div>
          </div>

          {/* Chat Tabs */}
          <div className="flex items-center gap-1 bg-[#111827] rounded-xl p-1">
            {chatTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.key
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-600/20"
                    : "text-gray-400 hover:text-white hover:bg-[#1E293B]"
                }`}
              >
                <span className="text-sm">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-xs font-bold text-white">D</div>
          </div>
        </header>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
          {currentMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] rounded-2xl px-5 py-3.5 relative group ${
                  msg.role === "user"
                    ? "bg-purple-600/20 border border-purple-500/30 rounded-br-md"
                    : "bg-[#161B2E] border border-gray-800 rounded-bl-md"
                }`}
              >
                {/* Role Label */}
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`text-[11px] font-semibold ${msg.role === "user" ? "text-purple-400" : "text-cyan-400"}`}>
                    {msg.role === "user" ? "You" : "Agent"}
                  </span>
                  <span className="text-[10px] text-gray-600">{msg.timestamp}</span>
                </div>

                {/* Image Preview */}
                {msg.image && (
                  <div className="mb-3">
                    <img
                      src={msg.image}
                      alt="Uploaded"
                      className="max-w-full max-h-48 rounded-lg object-cover border border-gray-700"
                    />
                  </div>
                )}

                {/* Message Content */}
                <p className="text-sm text-gray-200 leading-relaxed whitespace-pre-wrap">{msg.content}</p>

                {/* Action Buttons */}
                <div className="flex items-center gap-1 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => copyMessage(msg.id, msg.content)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] text-gray-400 hover:text-white hover:bg-[#1E293B] transition-colors"
                    title="Copy"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    {copiedId === msg.id ? "Copied!" : "Copy"}
                  </button>
                  {msg.role === "agent" && (
                    <button
                      onClick={() => rethinkMessage(msg.id)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] text-gray-400 hover:text-amber-400 hover:bg-amber-400/10 transition-colors"
                      title="Rethink"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="1 4 1 10 7 10" />
                        <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                      </svg>
                      Rethink
                    </button>
                  )}
                  <button
                    onClick={() => deleteMessage(msg.id)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-colors"
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

          {currentMessages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <div className="text-5xl mb-4">🤖</div>
              <p className="text-lg font-medium">No messages yet</p>
              <p className="text-sm mt-1">Start a conversation with the agent</p>
            </div>
          )}
        </div>

        {/* Image Preview Bar */}
        {imagePreview && (
          <div className="px-6 py-2 border-t border-gray-800 bg-[#0D1117]">
            <div className="flex items-center gap-3">
              <img src={imagePreview} alt="Preview" className="w-16 h-16 rounded-lg object-cover border border-gray-700" />
              <div className="flex-1">
                <p className="text-xs text-gray-400">Image ready to send</p>
              </div>
              <button
                onClick={() => setImagePreview(null)}
                className="p-1.5 rounded-lg hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="px-5 py-4 border-t border-gray-800 bg-[#0D1117] flex-shrink-0">
          <div className="flex items-end gap-3">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2.5 rounded-xl bg-[#161B2E] border border-gray-700 text-gray-400 hover:text-purple-400 hover:border-purple-500/50 transition-colors flex-shrink-0"
              title="Upload image"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </button>
            <div className="flex-1 relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Message in ${chatTabs.find((t) => t.key === activeTab)?.label}...`}
                rows={1}
                className="w-full bg-[#161B2E] border border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 resize-none transition-colors"
              />
            </div>
            <button
              onClick={sendMessage}
              disabled={!input.trim() && !imagePreview}
              className="p-2.5 rounded-xl bg-purple-600 text-white hover:bg-purple-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex-shrink-0"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
          <p className="text-[10px] text-gray-600 mt-2 text-center">Agent Workspace Safe Test · Press Enter to send · Shift+Enter for new line</p>
        </div>
      </main>
    </div>
  );
}

// END_OF_FILE