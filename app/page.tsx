"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "assistant" | "user";
  content: string;
}

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content:
    "السلام عليكم ورحمة الله وبركاته\n\nWillkommen bei der Royal Ottoman Society. Ich freue mich, dass du den Weg zu uns gefunden hast.\n\nDieses Gespräch ist vertraulich und dient dazu, dich und deine Absichten besser kennenzulernen — damit wir verstehen, was dich bewegt und wie wir gemeinsam wachsen können.\n\nDarf ich fragen: Wie bist du auf die Royal Ottoman Society aufmerksam geworden?",
};

export default function QualificationPage() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok) throw new Error("API error");

      const data = await res.json();
      setMessages([...newMessages, { role: "assistant", content: data.content }]);
    } catch {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content:
            "Es gab einen technischen Fehler. Bitte versuche es erneut.",
        },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <main className="min-h-screen flex flex-col" style={{ background: "var(--dark)" }}>
      {/* Header */}
      <header className="text-center pt-10 pb-6 px-4">
        <p
          className="text-xs tracking-[0.3em] uppercase mb-3"
          style={{ color: "var(--gold)", opacity: 0.7 }}
        >
          Royal Ottoman Society
        </p>
        <h1
          className="text-3xl md:text-5xl font-bold mb-3"
          style={{
            color: "var(--gold)",
            textShadow: "0 0 40px rgba(201,162,39,0.3)",
            letterSpacing: "0.05em",
          }}
        >
          Werde Pascha
        </h1>
        <p className="text-sm md:text-base max-w-md mx-auto" style={{ color: "#a89060", lineHeight: 1.7 }}>
          Für jene, die mehr als eine Mitgliedschaft suchen.
          <br />
          Eine Berufung.
        </p>
      </header>

      {/* Ornament */}
      <div className="ornament px-8 md:px-16 mb-8 text-sm" style={{ color: "var(--gold)" }}>
        ✦
      </div>

      {/* Video Section */}
      <section className="px-4 md:px-8 max-w-3xl mx-auto w-full mb-10">
        <div
          className="relative w-full rounded-xl overflow-hidden flex items-center justify-center"
          style={{
            background: "#0d0a06",
            border: "1px solid var(--dark-border)",
            aspectRatio: "16/9",
          }}
        >
          {/* Placeholder — replace src with real video URL */}
          <div className="flex flex-col items-center gap-3" style={{ color: "#4a3520" }}>
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <circle cx="32" cy="32" r="30" stroke="#2a1f10" strokeWidth="2" />
              <polygon points="26,20 50,32 26,44" fill="#3a2a14" />
            </svg>
            <span className="text-xs tracking-widest uppercase" style={{ color: "#3a2a14" }}>
              Video folgt
            </span>
          </div>
        </div>
      </section>

      {/* Ornament */}
      <div className="ornament px-8 md:px-16 mb-8 text-sm" style={{ color: "var(--gold)" }}>
        ✦
      </div>

      {/* Chat Section */}
      <section className="flex-1 px-4 md:px-8 max-w-3xl mx-auto w-full pb-12">
        <div className="text-center mb-6">
          <h2 className="text-xl md:text-2xl mb-2" style={{ color: "var(--gold-light)", letterSpacing: "0.05em" }}>
            Qualifizierungs-Gespräch
          </h2>
          <p className="text-xs" style={{ color: "#7a6040" }}>
            Vertraulich · Geführt von unserem Beirat-Assistenten
          </p>
        </div>

        {/* Chat Box */}
        <div
          className="rounded-2xl overflow-hidden flex flex-col"
          style={{
            background: "var(--dark-card)",
            border: "1px solid var(--dark-border)",
            minHeight: "420px",
            maxHeight: "560px",
          }}
        >
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 md:p-6 flex flex-col gap-4" style={{ minHeight: 0 }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`msg-appear flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div
                    className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs mr-2 mt-1"
                    style={{ background: "#1e1508", border: "1px solid var(--dark-border)", color: "var(--gold)" }}
                  >
                    ☽
                  </div>
                )}
                <div
                  className="max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap"
                  style={
                    msg.role === "assistant"
                      ? {
                          background: "#1a1108",
                          border: "1px solid #2a1f10",
                          color: "#d4c4a0",
                          borderTopLeftRadius: "4px",
                        }
                      : {
                          background: "#1e1a08",
                          border: "1px solid #3a3010",
                          color: "#e8d9b5",
                          borderTopRightRadius: "4px",
                        }
                  }
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="msg-appear flex justify-start">
                <div
                  className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs mr-2 mt-1"
                  style={{ background: "#1e1508", border: "1px solid var(--dark-border)", color: "var(--gold)" }}
                >
                  ☽
                </div>
                <div
                  className="rounded-2xl px-4 py-4 flex gap-1 items-center"
                  style={{ background: "#1a1108", border: "1px solid #2a1f10", borderTopLeftRadius: "4px" }}
                >
                  <span className="dot-1 w-1.5 h-1.5 rounded-full" style={{ background: "var(--gold)" }} />
                  <span className="dot-2 w-1.5 h-1.5 rounded-full" style={{ background: "var(--gold)" }} />
                  <span className="dot-3 w-1.5 h-1.5 rounded-full" style={{ background: "var(--gold)" }} />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div
            className="p-4 flex gap-3 items-end"
            style={{ borderTop: "1px solid var(--dark-border)" }}
          >
            {!started ? (
              <button
                className="w-full py-3 rounded-xl text-sm font-medium tracking-wide transition-all"
                style={{
                  background: "linear-gradient(135deg, #c9a227, #8a6a10)",
                  color: "#0a0705",
                  letterSpacing: "0.1em",
                }}
                onClick={() => setStarted(true)}
              >
                Gespräch beginnen
              </button>
            ) : (
              <>
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Schreibe deine Antwort..."
                  rows={1}
                  autoFocus
                  className="flex-1 resize-none text-sm py-2.5 px-4 rounded-xl outline-none"
                  style={{
                    background: "#0f0c06",
                    border: "1px solid #2a1f10",
                    color: "#e8d9b5",
                    lineHeight: 1.6,
                    maxHeight: "120px",
                    fontFamily: "inherit",
                  }}
                  onInput={(e) => {
                    const t = e.currentTarget;
                    t.style.height = "auto";
                    t.style.height = Math.min(t.scrollHeight, 120) + "px";
                  }}
                />
                <button
                  onClick={sendMessage}
                  disabled={loading || !input.trim()}
                  className="rounded-xl px-4 py-2.5 text-sm font-medium transition-all flex-shrink-0"
                  style={{
                    background:
                      loading || !input.trim()
                        ? "#2a1f10"
                        : "linear-gradient(135deg, #c9a227, #8a6a10)",
                    color: loading || !input.trim() ? "#5a4a30" : "#0a0705",
                    cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                  }}
                >
                  Senden
                </button>
              </>
            )}
          </div>
        </div>

        <p
          className="text-center text-xs mt-4"
          style={{ color: "#4a3a20", lineHeight: 1.8 }}
        >
          Deine Antworten werden vertraulich behandelt und nur intern verwendet.
          <br />
          Royal Ottoman Society · royalottomans.com
        </p>
      </section>
    </main>
  );
}
