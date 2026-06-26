"use client";

import React, { useState, useRef, useEffect } from "react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

type Chat = {
  id: string;
  title: string;
  date: string;
  messages: number;
};

const models = [
  { id: "gpt-4", name: "GPT-4", provider: "OpenAI" },
  { id: "gpt-4o", name: "GPT-4o", provider: "OpenAI" },
  { id: "claude-3", name: "Claude 3.5 Sonnet", provider: "Anthropic" },
  { id: "gemini-pro", name: "Gemini Pro", provider: "Google" },
  { id: "local-llm", name: "Local LLM (Ollama)", provider: "Local" },
];

const recentChats: Chat[] = [
  { id: "1", title: "Workout plan for tomorrow", date: "Today", messages: 12 },
  { id: "2", title: "Sleep analysis last week", date: "Yesterday", messages: 8 },
  { id: "3", title: "Finance budget review", date: "2 days ago", messages: 15 },
  { id: "4", title: "Book recommendations", date: "3 days ago", messages: 6 },
  { id: "5", title: "Meal prep ideas", date: "Last week", messages: 20 },
];

const sidebarItems = [
  { name: "Dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", active: false },
  { name: "AI Chat", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z", active: true },
  { name: "Health", icon:5B5CF6", "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z", active: false },
  { name: "Gym", icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z", active: false },
  { name: "Sleep", icon: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z", active: false },
  { name: "Food", icon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z", active: false },
];

const sampleMessages: Message[] = [
  {
    id: "1",
    role: "user",
    content: "Analyze my sleep patterns from last week. I've been feeling tired even after 8 hours of sleep.",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
  },
  {
    id: "2",
    role: "assistant",
    content: "Based on your sleep data from last week, I notice a few patterns that might explain your fatigue:\n\n**Sleep Quality Issues:**\n- Your deep sleep percentage averaged only 14% (optimal is 20-25%)\n- You had 3 nights with frequent wake-ups after 3 AM\n- Sleep onset time varied by over 2 hours between nights\n\n**Recommendations:**\n1. **Fix bedtime**: Your body clock is confused. Try sleeping at 10:30 PM ± 30 min consistently\n2. **Reduce evening screen time**: Blue light exposure before bed suppresses melatonin\n3. **Check room temperature**: Your sleep was poorest on nights when room temp was above 72°F\n4. **Limit caffeine after 2 PM**: Even afternoon caffeine can fragment deep sleep\n\nWould you like me to create a sleep optimization plan for this week?",
    timestamp: new Date(Date.now() - 1000 * 60 * 4),
  },
];

export default function AIChatDashboard() {
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [inputValue, setInputValue] = useState("");
  const [selectedModel, setSelectedModel] = useState(models[1]);
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeChat, setActiveChat] = useState("1");
  const [isTyping, setIsTyping] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim() && uploadedFiles.length === 0) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue || `Uploaded: ${uploadedFiles.join(", ")}`,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setUploadedFiles([]);
    setIsTyping(true);

    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I've analyzed your request. Based on your health data and the context provided, here's what I found:\n\n**Key Insights:**\n- Your patterns show consistent trends that align with your goals\n- There are some optimization opportunities worth exploring\n- I can provide more specific recommendations with additional data\n\nWould you like me to dive deeper into any specific area, or generate a personalized plan based on this analysis?",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files).map((f) => f.name);
      setUploadedFiles((prev) => [...prev, ...newFiles]);
      setShowFileUpload(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleRethink = (messageId: string) => {
    setIsTyping(true);
    setTimeout(() => {
      const updatedMessage: Message = {
        id: (Date.now() + 2).toString(),
        role: " trimStart"assistant",
        content: "**Revised Analysis:**\n\nAfter reconsidering with additional context, here are updated insights:\n\n- **Pattern Correction**: Your sleep latency is actually improving (15 min average vs 25 min last month)\n- **New Finding**: REM sleep timing suggests your circadian phase is shifting later\n- **Adjusted Recommendation**: Try morning sunlight exposure within 30 min of waking to anchor your rhythm earlier\n\nThe previous analysis was accurate but missed this temporal shift. Let me know if you'd like me to track this trend over the next 2 weeks.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, updatedMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex h-screen bg-[#0B0F19] text-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${isSidebarOpen ? "w-64" : "w-16"} flex-shrink-0 bg-[#111827] border-r border-gray-800 transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-gray-800">
          {isSidebarOpen ? (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="font-bold text-lg text-white">AI Agent OS</span>
            </div>
          ) : (
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center mx-auto">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
          {sidebarItems.map((item) => (
            <button
              key={item.name}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                item.active
                  ? "bg-purple-500/10 text-purple-400 border-l-2 border-purple-500"
                  : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
              } ${!isSidebarOpen && "justify-center"}`}
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
              </svg>
              {isSidebarOpen && <span>{item.name}</span>}
            </button>
          ))}
        </nav>

        {/* Collapse Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-3 mx-2 mb-2 rounded-lg hover:bg-gray-800/50 text-gray-400 hover:text-gray-200 transition-colors"
        >
          <svg
            className={`w-5 h-5 transition-transform ${isSidebarOpen ? "rotate-0" : "rotate-180"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex min-w-0">
        {/* Recent Chats Panel */}
        <div className="w-72 bg-[#0F172A] border-r border-gray-800 flex flex-col">
          <div className="p-4 border-b border-gray-800">
            <button className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-2.5 px-4 rounded-lg font-medium transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Chat
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Recent</div>
            {recentChats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setActiveChat(chat.id)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  activeChat === chat.id
                    ? "bg-purple-500/10 border-l-2 border-purple-500"
                    : "hover:bg-gray-800/50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-200 truncate">{chat.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {chat.date} · {chat.messages} messages
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#0B0F19]">
          {/* Header */}
          <header className="h-16 flex items-center justify-between px-6 border-b border-gray-800 bg-[#0B0F19]/80 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <h1 className="text-lg font-semibold text-white">AI Chat Assistant</h1>
              <span className="text-gray-500">·</span>
              <span className="text-sm text-gray-400">Personal Health Tracker</span>
            </div>

            {/* Model Selector */}
            <div className="relative">
              <button
                onClick={() => setShowModelDropdown(!showModelDropdown)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-800 border border-gray-700 text-sm transition-colors"
              >
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-gray-200">{selectedModel.name}</span>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showModelDropdown && (
                <div className="absolute right-0 top-full mt-2 w-72 bg-[#1E293B] border border-gray-700 rounded-xl shadow-2xl py-2 z-50">
                  {models.map((model) => (
                    <button
                      key={model.id}
                      onClick={() => {
                        setSelectedModel(model);
                        setShowModelDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-3 hover:bg-gray-700/50 transition-colors ${
                        selectedModel.id === model.id ? "bg-purple-500/10" : ""
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-200">{model.name}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{model.provider}</p>
                        </div>
                        {selectedModel.id === model.id && (
                          <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </header>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
            {messages.map((message) => (
              <div key={message.id} className={`flex gap-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                {message.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                )}

                <div
                  className={`max-w-3xl rounded-2xl px-5 py-4 ${
                    message.role === "user"
                      ? "bg-purple-600 text-white"
                      : "bg-[#1E293B] border border-gray-700 text-gray-200"
                  }`}
                >
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</div>

                  {message.role === "assistant" && (
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-700">
                      <button
                        onClick={() => copyToClipboard(message.content)}
                        className="p-1.5 rounded-lg hover:bg-gray-700/50 text-gray-400 hover:text-gray-200 transition-colors"
                        title="Copy"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      </button>