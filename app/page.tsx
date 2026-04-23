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

/* ── Medallion SVG ── */
function Medallion() {
  return (
    <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="45" cy="45" r="43" stroke="url(#gring)" strokeWidth="1.5" />
      <circle cx="45" cy="45" r="36" stroke="rgba(201,162,39,0.25)" strokeWidth="0.5" />
      <circle cx="45" cy="45" r="28" stroke="rgba(201,162,39,0.15)" strokeWidth="0.5" />
      {/* 8-pointed star */}
      <path
        d="M45 14l4 12h12l-10 8 4 12-10-7-10 7 4-12-10-8h12z"
        fill="url(#gstar)"
        opacity="0.9"
      />
      <path
        d="M45 76l-4-12H29l10-8-4-12 10 7 10-7-4 12 10 8H56z"
        fill="url(#gstar)"
        opacity="0.6"
      />
      <path
        d="M14 45l12-4v-12l8 10 12-4-7 10 7 10-12-4-8 10v-12z"
        fill="url(#gstar)"
        opacity="0.6"
      />
      <path
        d="M76 45l-12 4v12l-8-10-12 4 7-10-7-10 12 4 8-10v12z"
        fill="url(#gstar)"
        opacity="0.9"
      />
      {/* Center dot */}
      <circle cx="45" cy="45" r="5" fill="url(#gcenter)" />
      <circle cx="45" cy="45" r="2.5" fill="rgba(255,248,220,0.8)" />
      <defs>
        <linearGradient id="gring" x1="0" y1="0" x2="90" y2="90" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8a6a18" />
          <stop offset="0.5" stopColor="#e2c56a" />
          <stop offset="1" stopColor="#8a6a18" />
        </linearGradient>
        <linearGradient id="gstar" x1="0" y1="0" x2="90" y2="90" gradientUnits="userSpaceOnUse">
          <stop stopColor="#c9a227" />
          <stop offset="1" stopColor="#e8c84a" />
        </linearGradient>
        <radialGradient id="gcenter" cx="50%" cy="50%">
          <stop stopColor="#e8c84a" />
          <stop offset="1" stopColor="#c9a227" />
        </radialGradient>
      </defs>
    </svg>
  );
}

/* ── Video ── */
function VideoPlaceholder() {
  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden"
      style={{
        aspectRatio: "16/9",
        background: "#000",
        border: "1px solid rgba(201,162,39,0.2)",
        boxShadow: "0 0 60px rgba(201,162,39,0.06)",
      }}
    >
      {/* Corner ornaments */}
      {["top-3 left-3", "top-3 right-3", "bottom-3 left-3", "bottom-3 right-3"].map((pos, i) => (
        <div
          key={i}
          className={`absolute ${pos} w-5 h-5 z-10`}
          style={{
            borderTop: i < 2 ? "1.5px solid rgba(201,162,39,0.4)" : "none",
            borderBottom: i >= 2 ? "1.5px solid rgba(201,162,39,0.4)" : "none",
            borderLeft: i % 2 === 0 ? "1.5px solid rgba(201,162,39,0.4)" : "none",
            borderRight: i % 2 === 1 ? "1.5px solid rgba(201,162,39,0.4)" : "none",
          }}
        />
      ))}
      <video
        className="w-full h-full object-cover"
        controls
        playsInline
        preload="metadata"
        style={{ display: "block" }}
      >
        <source src="https://wzfkxyyluvkpdvssvnja.supabase.co/storage/v1/object/public/ros-media/pascha-intro.mp4" type="video/mp4" />
      </video>
    </div>
  );
}

/* ── Chat bubble ── */
function ChatBubble({ msg }: { msg: Message }) {
  const isAssistant = msg.role === "assistant";
  return (
    <div className={`msg-appear flex ${isAssistant ? "justify-start" : "justify-end"} gap-2.5 md:gap-3`}>
      {isAssistant && (
        <div
          className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-sm mt-0.5"
          style={{
            background: "linear-gradient(135deg, #1a1225, #0f0c18)",
            border: "1px solid rgba(201,162,39,0.3)",
            color: "var(--gold)",
            boxShadow: "0 0 10px rgba(201,162,39,0.1)",
          }}
        >
          ☽
        </div>
      )}
      <div
        className="max-w-[78%] md:max-w-[72%] px-4 py-3 md:px-5 md:py-3.5 text-base leading-relaxed whitespace-pre-wrap"
        style={
          isAssistant
            ? {
                background: "linear-gradient(135deg, rgba(26,18,37,0.9), rgba(17,14,24,0.95))",
                border: "1px solid rgba(201,162,39,0.15)",
                borderRadius: "4px 16px 16px 16px",
                color: "var(--text-main)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              }
            : {
                background: "linear-gradient(135deg, rgba(40,30,15,0.95), rgba(30,22,10,0.9))",
                border: "1px solid rgba(201,162,39,0.2)",
                borderRadius: "16px 4px 16px 16px",
                color: "#ede0c0",
              }
        }
      >
        {msg.content}
      </div>
    </div>
  );
}

/* ── Main Page ── */
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
      if (!res.ok) throw new Error();
      const data = await res.json();
      setMessages([...newMessages, { role: "assistant", content: data.content }]);
    } catch {
      setMessages([...newMessages, { role: "assistant", content: "Es gab einen technischen Fehler. Bitte versuche es erneut." }]);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  }

  return (
    <main className="relative min-h-screen flex flex-col items-center" style={{ zIndex: 1 }}>

      {/* ── HERO ── */}
      <section className="flex flex-col items-center text-center px-6 pt-12 pb-10 md:pt-20 md:pb-14">
        {/* Medallion */}
        <div className="mb-6 md:mb-8" style={{ filter: "drop-shadow(0 0 20px rgba(201,162,39,0.25))" }}>
          <Medallion />
        </div>

        {/* Label */}
        <p
          className="text-xs tracking-[0.45em] uppercase mb-4"
          style={{ color: "var(--gold-dim)", fontFamily: "var(--font-cinzel)" }}
        >
          Royal Ottoman Society
        </p>

        {/* Title */}
        <h1
          className="gold-shimmer text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight"
          style={{ fontFamily: "var(--font-cinzel)", letterSpacing: "0.06em" }}
        >
          Werde Pascha
        </h1>

        {/* Subtitle */}
        <p
          className="text-lg md:text-xl lg:text-2xl italic max-w-sm md:max-w-md"
          style={{ color: "var(--text-muted)", fontFamily: "var(--font-crimson)", lineHeight: 1.8 }}
        >
          Für jene, die mehr als eine Mitgliedschaft suchen.
          <br />
          Eine Berufung.
        </p>
      </section>

      {/* ── DIVIDER ── */}
      <div className="divider px-8 md:px-20 max-w-3xl lg:max-w-4xl w-full mb-10">
        ✦ ✦ ✦
      </div>

      {/* ── VIDEO ── */}
      <section className="px-5 md:px-8 max-w-3xl lg:max-w-4xl w-full mb-10">
        <VideoPlaceholder />
      </section>

      {/* ── DIVIDER ── */}
      <div className="divider px-8 md:px-20 max-w-3xl lg:max-w-4xl w-full mb-10">
        ✦ ✦ ✦
      </div>

      {/* ── CHAT SECTION ── */}
      <section className="px-5 md:px-8 max-w-3xl lg:max-w-4xl w-full pb-16">
        {/* Notice box */}
        <div
          className="rounded-xl px-5 py-4 mb-16 flex gap-4 items-start"
          style={{
            background: "linear-gradient(135deg, rgba(201,162,39,0.06), rgba(201,162,39,0.03))",
            border: "1px solid rgba(201,162,39,0.2)",
          }}
        >
          <span style={{ fontSize: "1.2rem", marginTop: "1px" }}>☽</span>
          <p
            className="text-sm md:text-base leading-relaxed"
            style={{ color: "var(--text-muted)", fontFamily: "var(--font-crimson)" }}
          >
            <span style={{ color: "var(--gold-light)", fontWeight: 600 }}>Dieses Gespräch erreicht uns persönlich.</span>
            {" "}Deine Antworten werden von unserem Beirat gelesen — wir melden uns anschließend direkt bei dir.
            Das Gespräch ist kein Formular, sondern der erste Schritt zu einer echten Verbindung.
          </p>
        </div>

        {/* Section header */}
        <div className="text-center mb-8 mt-4">
          <h2
            className="text-2xl md:text-3xl lg:text-4xl mb-2"
            style={{
              fontFamily: "var(--font-cinzel)",
              color: "var(--gold-light)",
              letterSpacing: "0.06em",
            }}
          >
            Qualifizierungs-Gespräch
          </h2>
          <p
            className="text-sm md:text-base italic"
            style={{ color: "var(--text-muted)", fontFamily: "var(--font-crimson)" }}
          >
            Vertraulich · Geführt von unserem Beirat-Assistenten
          </p>
        </div>

        {/* Chat card */}
        <div
          className="card-glow rounded-2xl overflow-hidden flex flex-col"
          style={{
            background: "linear-gradient(160deg, rgba(17,14,24,0.98), rgba(10,8,16,0.98))",
            border: "1px solid rgba(201,162,39,0.2)",
            backdropFilter: "blur(20px)",
            minHeight: "clamp(440px, 60vh, 680px)",
            maxHeight: "clamp(500px, 72vh, 800px)",
          }}
        >
          {/* Chat top bar */}
          <div
            className="flex items-center gap-3 px-5 py-3.5"
            style={{
              borderBottom: "1px solid rgba(201,162,39,0.1)",
              background: "rgba(201,162,39,0.03)",
            }}
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: "var(--gold)", boxShadow: "0 0 6px rgba(201,162,39,0.8)" }}
            />
            <span
              className="text-xs tracking-widest uppercase"
              style={{ color: "var(--gold-dim)", fontFamily: "var(--font-cinzel)" }}
            >
              Privates Gespräch
            </span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 md:px-6 lg:px-8 py-5 md:py-6 flex flex-col gap-4 md:gap-5" style={{ minHeight: 0 }}>
            {messages.map((msg, i) => <ChatBubble key={i} msg={msg} />)}

            {loading && (
              <div className="msg-appear flex justify-start gap-2.5">
                <div
                  className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-sm"
                  style={{
                    background: "linear-gradient(135deg, #1a1225, #0f0c18)",
                    border: "1px solid rgba(201,162,39,0.3)",
                    color: "var(--gold)",
                  }}
                >
                  ☽
                </div>
                <div
                  className="px-4 py-4 flex gap-1.5 items-center"
                  style={{
                    background: "rgba(26,18,37,0.9)",
                    border: "1px solid rgba(201,162,39,0.12)",
                    borderRadius: "4px 16px 16px 16px",
                  }}
                >
                  <span className="dot-1 w-1.5 h-1.5 rounded-full" style={{ background: "var(--gold)" }} />
                  <span className="dot-2 w-1.5 h-1.5 rounded-full" style={{ background: "var(--gold)" }} />
                  <span className="dot-3 w-1.5 h-1.5 rounded-full" style={{ background: "var(--gold)" }} />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input area */}
          <div
            className="p-4 md:p-5 flex gap-3 items-end"
            style={{ borderTop: "1px solid rgba(201,162,39,0.1)" }}
          >
            {!started ? (
              <button
                className="w-full py-3.5 rounded-xl text-sm tracking-[0.15em] uppercase transition-all hover:brightness-110 active:scale-[0.99]"
                style={{
                  background: "linear-gradient(135deg, #c9a227 0%, #a07d18 50%, #c9a227 100%)",
                  backgroundSize: "200% auto",
                  color: "#0a0705",
                  fontFamily: "var(--font-cinzel)",
                  fontWeight: 600,
                  boxShadow: "0 4px 20px rgba(201,162,39,0.25), inset 0 1px 0 rgba(255,255,255,0.1)",
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
                  placeholder="Deine Antwort…"
                  rows={1}
                  autoFocus
                  className="flex-1 resize-none py-3 px-4 rounded-xl outline-none text-base transition-all"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(201,162,39,0.15)",
                    color: "var(--text-main)",
                    fontFamily: "var(--font-crimson)",
                    fontSize: "1rem",
                    lineHeight: 1.6,
                    maxHeight: "120px",
                  }}
                  onFocus={(e) => (e.currentTarget.style.border = "1px solid rgba(201,162,39,0.4)")}
                  onBlur={(e) => (e.currentTarget.style.border = "1px solid rgba(201,162,39,0.15)")}
                  onInput={(e) => {
                    const t = e.currentTarget;
                    t.style.height = "auto";
                    t.style.height = Math.min(t.scrollHeight, 120) + "px";
                  }}
                />
                <button
                  onClick={sendMessage}
                  disabled={loading || !input.trim()}
                  className="rounded-xl px-5 py-3 text-sm font-medium transition-all flex-shrink-0 flex items-center gap-2"
                  style={{
                    background:
                      loading || !input.trim()
                        ? "rgba(201,162,39,0.05)"
                        : "linear-gradient(135deg, #c9a227, #a07d18)",
                    color: loading || !input.trim() ? "rgba(201,162,39,0.3)" : "#080604",
                    border: "1px solid rgba(201,162,39,0.2)",
                    cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                    fontFamily: "var(--font-cinzel)",
                    boxShadow: loading || !input.trim() ? "none" : "0 4px 15px rgba(201,162,39,0.2)",
                  }}
                >
                  Senden
                </button>
              </>
            )}
          </div>
        </div>

        {/* Footer note */}
        <p
          className="text-center text-xs mt-5 italic leading-relaxed"
          style={{ color: "rgba(154,136,96,0.5)", fontFamily: "var(--font-crimson)" }}
        >
          Deine Antworten werden vertraulich behandelt und nur intern verwendet.
          <br />
          Royal Ottoman Society · royalottomans.com
        </p>
      </section>
    </main>
  );
}
