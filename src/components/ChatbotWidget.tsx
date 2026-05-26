"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, Bot, TerminalSquare, Activity } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import gsap from "gsap";
import ReactMarkdown from "react-markdown";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Message = { id: string; role: "user" | "assistant"; content: string };

const INITIAL_GREETING = "Hi, I am Samyak. How can I help you today?";

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { id: "greeting", role: "assistant", content: INITIAL_GREETING }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Refs for GSAP
  const containerRef = useRef<HTMLDivElement>(null);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const messageListRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Idle floating animation for toggle button
  useEffect(() => {
    if (toggleBtnRef.current && !isOpen) {
      gsap.to(toggleBtnRef.current, {
        y: -8,
        duration: 2.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      });
    } else if (toggleBtnRef.current) {
      gsap.killTweensOf(toggleBtnRef.current);
      gsap.set(toggleBtnRef.current, { y: 0 });
    }
  }, [isOpen]);

  // Open/Close transition
  useEffect(() => {
    if (isOpen && containerRef.current) {
      gsap.fromTo(containerRef.current,
        { opacity: 0, y: 40, scale: 0.98, filter: "blur(10px)" },
        { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.8, ease: "power4.out" }
      );

      // Auto-focus input with a slight delay
      setTimeout(() => inputRef.current?.focus(), 400);
    }
  }, [isOpen]);

  // Scroll to bottom & animate new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }

    if (isOpen && messageListRef.current?.lastElementChild) {
      gsap.fromTo(messageListRef.current.lastElementChild,
        { opacity: 0, y: 20, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out" }
      );
    }
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Reset textarea height
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          messages: [{
            role: userMessage.role,
            content: userMessage.content
          }]
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`[Status ${response.status}] ${errorText}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), role: "assistant", content: "" }]);
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const text = decoder.decode(value, { stream: true });
          setMessages((prev) => {
            const updatedMessages = [...prev];
            updatedMessages[updatedMessages.length - 1] = {
              ...updatedMessages[updatedMessages.length - 1],
              content: updatedMessages[updatedMessages.length - 1].content + text,
            };
            return updatedMessages;
          });
        }
      }
    } catch (error: any) {
      console.error("Chat Error:", error);
      setMessages((prev) => [...prev, { 
        id: (Date.now() + 2).toString(), 
        role: "assistant", 
        content: `**Error:** ${error.message}\n\nPlease try again or check the API connection.` 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-0 right-0 sm:bottom-8 sm:right-8 z-[100] flex flex-col items-end">
      {isOpen && (
        <div
          ref={containerRef}
          className="w-screen h-[100dvh] sm:w-[480px] sm:h-[75vh] sm:max-h-[850px] flex flex-col bg-[#050505]/90 backdrop-blur-2xl border-0 sm:border border-white/10 rounded-none sm:rounded-[24px] shadow-[0_0_80px_rgba(255,255,255,0.03)] overflow-hidden font-inter relative"
        >
          {/* Subtle top glare effect */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10"></div>

          {/* Header */}
          <div className="flex items-center justify-between p-6 sm:p-7 border-b border-white/5 bg-black/60 backdrop-blur-md z-10 relative">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 flex items-center justify-center text-white/90 border border-white/10 rounded-xl bg-white/5 shadow-[0_0_15px_rgba(255,255,255,0.05)] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                <TerminalSquare size={20} strokeWidth={1.5} className="relative z-10" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-base sm:text-lg font-semibold text-white tracking-[0.2em] font-syne uppercase">SAMYAK AI SYSTEMS</h3>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]"></span>
                  <p className="text-xs text-white/50 tracking-[0.15em] uppercase font-medium">Online & Ready</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/40 hover:text-white hover:bg-white/10 transition-all p-2 rounded-full"
            >
              <X size={24} strokeWidth={1.5} />
            </button>
          </div>

          {/* Messages Area */}
          <div
            className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 sm:space-y-10 bg-gradient-to-b from-transparent via-white/[0.01] to-black/60 relative scroll-smooth"
            ref={messageListRef}
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={cn(
                  "flex gap-5 max-w-[95%] sm:max-w-[88%]",
                  m.role === "user" ? "ml-auto flex-row-reverse" : ""
                )}
              >
                {/* Avatar */}
                <div
                  className={cn(
                    "w-9 h-9 flex items-center justify-center shrink-0 border mt-1",
                    m.role === "user"
                      ? "bg-white text-black border-white rounded-full"
                      : "bg-black text-white/80 border-white/10 rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.03)]"
                  )}
                >
                  {m.role === "user" ? <div className="w-2.5 h-2.5 bg-black rounded-full" /> : <Activity size={16} strokeWidth={2} />}
                </div>

                {/* Content */}
                <div
                  className={cn(
                    "text-[15px] sm:text-base leading-[1.8] tracking-[0.015em] font-light",
                    m.role === "user"
                      ? "text-white/90 bg-white/5 border border-white/10 px-6 py-4 rounded-[20px] rounded-tr-sm"
                      : "text-white/80 [&>p]:mb-5 last:[&>p]:mb-0 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-5 [&>li]:mb-2 [&>li]:pl-1 [&>strong]:text-white [&>strong]:font-medium [&>pre]:bg-white/5 [&>pre]:border [&>pre]:border-white/10 [&>pre]:p-5 [&>pre]:rounded-xl [&>code]:text-white/90"
                  )}
                >
                  {m.role === "user" ? (
                    <div className="whitespace-pre-wrap">{m.content}</div>
                  ) : (
                    <ReactMarkdown>{m.content}</ReactMarkdown>
                  )}
                </div>
              </div>
            ))}

            {/* Loading State */}
            {isLoading && (
              <div className="flex gap-5 max-w-[85%]">
                <div className="w-9 h-9 flex items-center justify-center shrink-0 border border-white/10 bg-black text-white/80 rounded-xl mt-1 shadow-[0_0_15px_rgba(255,255,255,0.03)]">
                  <Activity size={16} strokeWidth={2} className="animate-pulse opacity-50" />
                </div>
                <div className="text-[15px] text-white/30 flex items-center gap-2 mt-4 px-3">
                  <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} className="h-4" />
          </div>

          {/* Input Area */}
          <div className="p-5 sm:p-7 bg-black border-t border-white/5 backdrop-blur-xl z-10 relative shadow-[0_-20px_40px_rgba(0,0,0,0.5)]">
            <form
              onSubmit={handleSubmit}
              className="group flex items-end gap-3 bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 focus-within:border-white/30 focus-within:bg-white/[0.06] focus-within:shadow-[0_0_20px_rgba(255,255,255,0.05)] rounded-[20px] p-2 transition-all duration-500 relative overflow-hidden"
            >
              {/* Input subtle top glow */}
              <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>

              <textarea
                ref={inputRef}
                className="flex-1 bg-transparent text-[15px] sm:text-base text-white placeholder:text-white/30 focus:outline-none font-inter resize-none min-h-[50px] max-h-[150px] py-3.5 px-5 leading-relaxed"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  e.target.style.height = 'auto';
                  e.target.style.height = `${Math.min(e.target.scrollHeight, 150)}px`;
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                placeholder="Initialize query..."
                rows={1}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="w-12 h-12 mb-1 mr-1 flex items-center justify-center bg-white text-black rounded-[14px] hover:scale-105 hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] disabled:opacity-20 disabled:hover:scale-100 disabled:hover:shadow-none transition-all duration-300 shrink-0"
              >
                <Send size={18} strokeWidth={2.5} className="-ml-0.5" />
              </button>
            </form>
            <div className="mt-5 text-center">
              <p className="text-[10px] sm:text-xs tracking-[0.2em] text-white/20 uppercase font-space-grotesk font-medium">Powered by Groq • AI Systems Engineering</p>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          ref={toggleBtnRef}
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-[20px] text-white hover:bg-white hover:text-black hover:scale-105 transition-all duration-500 shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:shadow-[0_0_50px_rgba(255,255,255,0.2)] group relative overflow-hidden"
        >
          {/* Subtle sweep gradient on button */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
          <Bot size={32} strokeWidth={1.2} className="relative z-10" />
        </button>
      )}
    </div>
  );
}
