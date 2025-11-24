import React, { useState, useRef, useEffect} from "react";
import type { FormEvent, KeyboardEvent } from "react";

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

const THREAD_ID = 1; // simple static thread id for this demo

const API_BASE_URL = (import.meta as any).env.VITE_API_URL as string || 'http://localhost:3000';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content: "Hi! Ask me anything and I’ll respond here. 🚀",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const nextIdRef = useRef(2);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    if (!API_BASE_URL) {
      setError("VITE_API_URL is not configured.");
      return;
    }

    const userMessage: Message = {
      id: nextIdRef.current++,
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      const url = API_BASE_URL.replace(/\/$/, "") + "/generate";

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: userMessage.content,
          thread_id: THREAD_ID,
          video_id:'fuhE6PYnRMc'
        }),
      });

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const text = await res.text(); // API returns just the content of the message

      const assistantMessage: Message = {
        id: nextIdRef.current++,
        role: "assistant",
        content: text || "(No response content)",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void handleSubmit(e as unknown as FormEvent);
    }
  };

  return (
    <div className="app-root">
      <main className="chat-shell">
        <header className="chat-header">
          <div className="chat-title">
            <span className="chat-logo-dot" />
            <span>AI Chat</span>
          </div>
          <span className="chat-status">Dark · Minimal</span>
        </header>

        <section className="chat-window">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`chat-message chat-message--${m.role}`}
            >
              <div className="chat-message-meta">
                <span className="chat-message-role">
                  {m.role === "user" ? "You" : "Assistant"}
                </span>
              </div>
              <div className="chat-message-bubble">
                <p>{m.content}</p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="chat-message chat-message--assistant">
              <div className="chat-message-meta">
                <span className="chat-message-role">Assistant</span>
              </div>
              <div className="chat-message-bubble is-loading">
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </section>

        <footer className="chat-input-area">
          {error && <div className="chat-error">{error}</div>}
          <form onSubmit={handleSubmit} className="chat-form">
            <textarea
              className="chat-input"
              placeholder="Type a message... (Enter to send, Shift+Enter for new line)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              rows={1}
            />
            <button
              type="submit"
              className="chat-send-btn"
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
            >
              {isLoading ? (
                <div className="send-loading-spinner" />
              ) : (
                <svg
                  className="send-icon"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M4 4l16 8-16 8 4-8-4-8z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          </form>
          <p className="chat-hint">
            Messages are sent to <code>/generate</code> via{" "}
            <code>VITE_API_URL</code>.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default App;
