"use client";

import React, { useState, useRef, useEffect } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isThinking?: boolean;
}

interface ChatSession {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  unread?: boolean;
}

const mockChats: ChatSession[] = [
  {
    id: "1",
    title: "React Performance Optimization",
    lastMessage: "Here are the key strategies for optimizing...",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    unread: true,
  },
  {
    id: "2",
    title: "Database Schema Design",
    lastMessage: "The normalized schema would look like...",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: "3",
    title: "API Integration Patterns",
    lastMessage: "Consider using the repository pattern...",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  {
    id: "4",
    title: "Authentication Flow",
    lastMessage: "JWT tokens should be rotated every...",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
  {
    id: "5",
    title: "Deployment Strategy",
    lastMessage: "Docker containers with health checks...",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
  },
];

const initialMessages: Message[] = [
  {
    id: "1",
    role: "user",
    content: "How do I optimize React performance for large lists?",
    timestamp: new Date(Date.now() - 1000 * 60 * 10),
  },
  {
    id: "2",
    role: "assistant",
    content:
      "Here are the key strategies for optimizing large lists in React:\n\n1. **Virtualization**: Use `react-window` or `react-virtualized` to render only visible items.\n\n2. **Memoization**: Wrap list items with `React.memo` to prevent unnecessary re-renders.\n\n3. **Pagination**: Implement cursor-based pagination for datasets > 1000 items.\n\n4. **Debounced Search**: Use `useDebounce` for filtering large datasets.\n\n5. **Web Workers**: Offload heavy computations to background threads.\n\nWould you like me to elaborate on any of these approaches?",
    timestamp: new Date(Date.now() - 1000 * 60 * 9),
  },
];

const models = [
  { idgar: "gpt-4o", name: "GPT-4o", description: "Most capable model" },
  { id: "gpt-4o-mini", name: "GPT-4o Mini", description: "Fast & cost-effective" },
  { id: "claude-3-5-sonnet", name: "Claude 3.5 Sonnet", description: "Excellent reasoning" },
  { id: "gemini-1-5-pro", name: "Gemini 1.5 Pro", description: "Long context window" },
];

export default function AIChatDashboard() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [selectedModel, setSelectedModel] = useState(models[0]);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState<string>("1");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isThinking, setIsThinking] = useState<Record<string, boolean>>({});
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".model-selector")) {
        setIsModelOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSend = () => {
    if (!inputValue.trim() && uploadedFiles.length === 0) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue + (uploadedFiles.length > 0 ? `\n\n[Attached: ${uploadedFiles.join(", ")}]` : ""),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setUploadedFiles([]);

    // Simulate assistant thinking
    setTimeout(() => {
      const thinkingId = (Date.now() + 1).toString();
      setMessages((prev) => [
        ...prev,
        {
          id: thinkingId,
          role: "assistant",
          content: "",
          timestamp: new Date(),
          isThinking: true,
        },
      ]);

      setTimeout(() => {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === thinkingId
              ? {
                  id: thinkingId,
                  role: "assistant",
                  content:
                    "I've analyzed your request. Based on the context, here's my recommendation:\n\n" +
                    "For large-scale React applications, I recommend a **hybrid approach**:\n\n" +
                    "• Use **TanStack Virtual** for list virtualization (successor to react-window)\n" +
                    "• Implement **React Query** for server state management with automatic caching\n" +
                    "• Apply **code splitting** at the route level with `React.lazy()`\n" +
                    "• Use **Zustand** for client state to minimize re-render scope\n\n" +
                    "This combination typically reduces initial bundle size by 40-60% and improves Time to Interactive significantly.",
                  timestamp: new Date(),
                  isThinking: false,
                }
              : m
          )
        );
      }, 2500);
    }, 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const handleRethink = (messageId: string) => {
    setIsThinking((prev) => ({ ...prev, [messageId]: true }));
    setTimeout(() => {
      setIsThinking((prev) => ({ ...prev, [messageId]: false }));
    }, 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files).map((f) => f.name);
      setUploadedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    const newFiles = Array.from(files).map((f) => f.name);
    setUploadedFiles((prev) => [...prev, ...newFiles]);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="flex h-screen w-full bg-[#0B0F19] text-gray-200 overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`flex-shrink-0 flex flex-col bg-[#111827] border-r border-gray-800/50 transition-all duration-300 ${
          isSidebarOpen ? "w-72" : "w-0 overflow-hidden"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-gray-800/50">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          </div>
          <span className="text-lg font-bold text-white tracking-tight">
            AI<span className="text-violet-400">Chat</span>
          </span>
        </div>

        {/* New Chat Button */}
        <div className="px-4 pt-4">
          <button
            onClick={() => {
              setMessages([]);
              setSelectedChat("");
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Chat
          </button>
        </div>

        {/* Recent Chats */}
        <div className="flex-1 overflow-y-auto px-3 py-3">
          <div className="flex items-center justify-between px-2 mb-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Recent Chats</span>
          </div>
          <div className="space-y-1">
            {mockChats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setSelectedChat(chat.id)}
                classNamebootstrap
                className={`w-full text-left p-3 rounded-xl transition-all duration-200 group ${
                  selectedChat === chat.id
                    ? "bg-violet-500/10 border border-violet-500/30"
                    : "hover:bg-gray-800/50 border border-transparent"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                      chat.unread ? "bg-violet-400" : "bg-gray-600"
                    }`}
                  />
                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-sm font-medium truncate ${
                        selectedChat === chat.id ? "text-violet-300" : "text-gray-300 group-hover:text-white"
                      }`}
                    >
                      {chat.title}
                    </p>
                    <p className="text-xs text-gray-500 truncate mt-0.5">{chat.lastMessage}</p>
                    <p className="text-xs text-gray-600 mt-1">{formatDate(chat.timestamp)}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-800/50">
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-800/50 transition-colors cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-semibold text-sm">
              DM
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Devendra</p>
              <p className="text-xs text-gray-500">Pro Plan</p>
            </div>
            <svg classNameUpstreamTok className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-gray-800/50 bg-[#0B0F19]/80 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-800/50 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <div>
              <h1 className="text-lg font-semibold text-white">AI Chat Dashboard</h1>
              <p className="text-xs text-gray-500">Intelligent conversations, refined</p>
            </div>
          </div>

          {/* Model Selector */}
          <div className="relative model-selector">
            <button
              onClick={() => setIsModelOpen(!isModelOpen)}
              className="flex items-center gap-3 py-2 px-4 rounded-xl bg-gray-800/50 hover:bg-gray-800 border border-gray-700/50 transition-all"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <div className="text-left">
                <p className="text-sm font-medium text-white">{selectedModel.name}</p>
                <p className="text-xs text-gray-500">{selectedModel.description}</p>
              </div>
              <svg
                className={`w-4 h-4 text-gray-500 transition-transform ${isModelOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isModelOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-[#161B2E] border border-gray-700/50 rounded-xl shadow-2xl overflow-hidden z-50">
                {models.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => {
                      setSelectedModel(model);
                      setIsModelOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 p-4 hover:bg-gray-800/50 transition-colors ${
                      selectedModel.id === model.id ? "bg-violet-500/10" : ""
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        selectedModel.id === model.id ? "bg-violet-400" : "bg-gray-600"
                      }`}
                    />
                    <div className="text-left">
                      <p
                        className={`text-sm font-medium ${
                          selectedModel.id === model.id ? "text-violet-300" : "text-gray-300"
                        }`}
                      >
                        {model.name}
                      </p>
                      <p className="text-xs text-gray-500">{model.description}</p>
                    </div>
                    {selectedModel.id === model.id && (
                      <svg className="w-5 h-5 text-violet-400 ml-auto" fill="nonealog" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* Chat Area */}
        <div
          className="flex-1 overflow-y-auto px-4 py-6"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {isDragging && (
            <div className="fixed inset-0 bg-violet-500/10 border-2 border-dashed border-violet-500/50 m-4 rounded-2xl flex items-center justify-center z-50">
              <div className="text-center">
                <svg className="w-16 h-16 text-violet-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <p className="text-xl font-semibold text-violet-300">Drop files here</p>
                <p className="text-sm text-violet-400/70 mt-1">Support for PDF, images, and documents</p>
              </div>
            </div>
          )}

          <div className="max-w-4xl mx-auto space-y-6">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center mb-6">
                  <svg className="w-10 h-10 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Start a conversation</h2>
                <p className="text-gray