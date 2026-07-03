import { useState, useRef, useEffect } from "react";
import Layout from "./components/Layout";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0d0f14;
    --surface: #181b22;
    --surface2: #1e2130;
    --border: #2a2d3a;
    --accent: #5b8af5;
    --accent-glow: rgba(91,138,245,0.18);
    --accent2: #e06caa;
    --text: #e8eaf0;
    --text-muted: #6b7185;
    --user-bubble: #1e2b4a;
    --ai-bubble: #181b22;
    --radius: 14px;
    --green: #22c55e;
    --green-glow: rgba(34,197,94,0.15);
  }

  .chat-root {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background: var(--bg);
    font-family: 'Sora', sans-serif;
    color: var(--text);
    overflow: hidden;
  }

  /* ── Top bar ── */
  .chat-topbar {
    padding: 14px 28px;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(13,15,20,0.85);
    backdrop-filter: blur(12px);
    flex-shrink: 0;
  }
  .topbar-left { display: flex; align-items: center; gap: 12px; }
  .logo-dot {
    width: 26px; height: 26px; border-radius: 7px;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    flex-shrink: 0;
  }
  .topbar-title { font-size: 15px; font-weight: 600; }
  .session-tag {
    background: var(--surface2);
    border: 1px solid var(--border);
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    color: var(--text-muted);
    font-family: 'JetBrains Mono', monospace;
  }

  /* ── Messages ── */
  .messages-area {
    flex: 1;
    overflow-y: auto;
    padding: 28px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    scroll-behavior: smooth;
    max-width: 860px;
    width: 100%;
    margin: 0 auto;
    align-self: center;
  }
  .messages-area::-webkit-scrollbar { width: 5px; }
  .messages-area::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }

  .msg-row { display: flex; gap: 12px; animation: fadeUp 0.3s ease both; }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  .msg-row.user { flex-direction: row-reverse; }

  .ai-avatar-icon {
    width: 34px; height: 34px; border-radius: 50%; flex-shrink: 0;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    display: flex; align-items: center; justify-content: center; font-size: 15px;
  }
  .user-avatar-letter {
    width: 34px; height: 34px; border-radius: 50%; flex-shrink: 0;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    display: flex; align-items: center; justify-content: center;
    font-size: 14px; font-weight: 700; color: white; font-family: 'Sora', sans-serif;
  }

  .bubble {
    max-width: 72%;
    padding: 13px 17px;
    border-radius: var(--radius);
    font-size: 14px;
    line-height: 1.65;
    word-break: break-word;
    white-space: pre-wrap;
  }
  .bubble.ai  { background: var(--ai-bubble);   border: 1px solid var(--border);              border-top-left-radius: 4px; }
  .bubble.user{ background: var(--user-bubble);  border: 1px solid rgba(91,138,245,0.3);        border-top-right-radius: 4px; }
  .bubble-time {
    font-size: 10px; color: var(--text-muted); margin-top: 5px;
    font-family: 'JetBrains Mono', monospace;
  }
  .msg-row.user .bubble-time { text-align: right; }

  /* ── Typing indicator ── */
  .typing-indicator { display: flex; gap: 5px; align-items: center; padding: 6px 0; }
  .typing-indicator span { width: 7px; height: 7px; border-radius: 50%; background: var(--text-muted); animation: bounce 1.1s infinite; }
  .typing-indicator span:nth-child(2){animation-delay:.2s}
  .typing-indicator span:nth-child(3){animation-delay:.4s}
  @keyframes bounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-6px)} }

  /* ── Empty state ── */
  .empty-state {
    flex: 1;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    gap: 16px; padding: 40px; text-align: center;
  }
  .empty-icon { font-size: 48px; }
  .empty-state h3 { font-size: 20px; font-weight: 600; }
  .empty-state p  { font-size: 14px; color: var(--text-muted); max-width: 380px; line-height: 1.6; }

  .suggestion-chips { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; margin-top: 4px; }
  .chip {
    padding: 8px 16px; border-radius: 20px;
    border: 1px solid var(--border); background: var(--surface2);
    color: var(--text-muted); font-size: 13px; font-family: 'Sora', sans-serif;
    cursor: pointer; transition: all 0.18s;
  }
  .chip:hover { border-color: var(--accent); color: var(--accent); background: var(--accent-glow); }

  /* ── Input area ── */
  .chat-input-area {
    padding: 16px 28px 22px;
    border-top: 1px solid var(--border);
    background: var(--bg);
    flex-shrink: 0;
  }
  .input-inner { max-width: 860px; margin: 0 auto; }
  .input-wrapper {
    display: flex; align-items: flex-end; gap: 10px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 10px 14px;
    transition: border-color 0.2s;
  }
  .input-wrapper:focus-within {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px var(--accent-glow);
  }
  .chat-textarea {
    flex: 1; background: transparent; border: none; outline: none;
    color: var(--text); font-family: 'Sora', sans-serif;
    font-size: 14px; resize: none; max-height: 120px; min-height: 24px; line-height: 1.5;
  }
  .chat-textarea::placeholder { color: var(--text-muted); }
  .send-btn {
    width: 36px; height: 36px; border-radius: 9px; border: none; flex-shrink: 0;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    color: white; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    font-size: 16px; transition: opacity 0.2s, transform 0.15s;
  }
  .send-btn:hover { opacity: 0.85; transform: scale(1.06); }
  .send-btn:disabled { opacity: 0.35; cursor: not-allowed; transform: none; }
  .input-hint { font-size: 11px; color: var(--text-muted); margin-top: 8px; text-align: center; }
`;

const SUGGESTIONS = [
  "Write a viral Instagram caption for a morning coffee ☕",
  "Give me 15 trending hashtags for a fitness post 💪",
  "Best time to post a Reel for max reach?",
  "Create a Twitter thread hook about AI tools 🤖",
];

const nowStr = () =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput]       = useState("");
  const [typing, setTyping]     = useState(false);
  const bottomRef  = useRef(null);
  const textareaRef = useRef(null);
   const token = localStorage.getItem("token");

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = async (overrideText) => {
    const text = (overrideText ?? input).trim();
    if (!text || typing) return;

    const userMsg = { role: "user", content: text, time: nowStr() };
    const nextMsgs = [...messages, userMsg];
    setMessages(nextMsgs);
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
    setTyping(true);

    try {
      console.log("hii");
      const res = await fetch("http://localhost:8000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json",
          "Authorization":`Bearer ${token}`,
         },
        body: JSON.stringify({
          prompt:text
        }),
      });
      const data = await res.json();
      const reply =data.response;
      setMessages([...nextMsgs, { role: "ai", content: reply, time: nowStr() }]);
    } catch(err) {
      console.error(err);
      setMessages([
        ...nextMsgs,
        { role: "ai", content: "Something went wrong. Please try again.", time: nowStr() },
      ]);
    } finally {
      setTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleTextareaInput = (e) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
  };

  const isEmpty = messages.length === 0 && !typing;

  return (
    <Layout>
      <style>{styles}</style>
      <div className="chat-root">

        {/* Top bar */}
        <div className="chat-topbar">
          <div className="topbar-left">
            <div className="logo-dot" />
            <span className="topbar-title">AI Chat</span>
          </div>
          <span className="session-tag">
            {messages.length} msg{messages.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Messages / Empty state */}
        {isEmpty ? (
          <div className="empty-state">
            <h3>What are we posting today?</h3>
            <p>
              Ask Sahayak for captions, hashtags, posting schedules, or content
              ideas — for any platform.
            </p>
            <div className="suggestion-chips">
              {SUGGESTIONS.map((s) => (
                <button key={s} className="chip" onClick={() => sendMessage(s)}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="messages-area">
            {messages.map((msg, i) => (
              <div key={i} className={`msg-row ${msg.role}`}>
                {msg.role === "ai" ? (
                  <div className="ai-avatar-icon">SS</div>
                ) : (
                  <div className="user-avatar-letter">Y</div>
                )}
                <div style={{ maxWidth: "72%" }}>
                  <div className={`bubble ${msg.role}`}>{msg.content}</div>
                  <div className="bubble-time">{msg.time}</div>
                </div>
              </div>
            ))}

            {typing && (
              <div className="msg-row ai">
                <div className="ai-avatar-icon">SS</div>
                <div className="bubble ai">
                  <div className="typing-indicator">
                    <span /><span /><span />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        )}

        {/* Input */}
        <div className="chat-input-area">
          <div className="input-inner">
            <div className="input-wrapper">
              <textarea
                ref={textareaRef}
                className="chat-textarea"
                rows={1}
                placeholder="Ask for a caption, hashtags, post idea…"
                value={input}
                onChange={handleTextareaInput}
                onKeyDown={handleKeyDown}
              />
              <button
                className="send-btn"
                onClick={() => sendMessage()}
                disabled={!input.trim() || typing}
              >
                ↑
              </button>
            </div>
            <div className="input-hint">Enter to send · Shift+Enter for new line</div>
          </div>
        </div>

      </div>
    </Layout>
  );
}