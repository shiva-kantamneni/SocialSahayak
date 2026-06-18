import { useState } from "react";

const STYLES = `
  @import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  .db-root {
    display: flex;
    min-height: 100vh;
    background: #0a0a0f;
    color: white;
    font-family: Inter, system-ui, sans-serif;
  }

  /* ── Sidebar ── */
  .sb {
    width: 220px;
    background: #12121a;
    border-right: 0.5px solid rgba(255,255,255,0.08);
    padding: 24px 16px;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
  }
  .logo {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 32px;
  }
  .logo-box {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    background: linear-gradient(135deg, #ff57b2, #8b5cf6);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 13px;
    flex-shrink: 0;
  }
  .logo h2 {
    font-size: 17px;
    font-weight: 600;
  }
  .nav {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .nav-btn {
    background: transparent;
    border: none;
    color: rgba(255,255,255,0.55);
    padding: 11px 14px;
    border-radius: 10px;
    cursor: pointer;
    text-align: left;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: background 0.2s, color 0.2s;
    width: 100%;
  }
  .nav-btn:hover { background: rgba(255,255,255,0.06); color: white; }
  .nav-btn.active {
    background: linear-gradient(135deg, rgba(255,87,178,.18), rgba(139,92,246,.18));
    border: 0.5px solid rgba(255,87,178,.3);
    color: white;
  }
  .nav-btn i { font-size: 17px; }

  /* ── Main ── */
  .main {
    flex: 1;
    padding: 36px 32px;
    overflow: auto;
  }
  .pg-title {
    font-size: 26px;
    font-weight: 700;
    background: linear-gradient(135deg, #fff, #ff57b2, #8b5cf6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 4px;
  }
  .pg-sub {
    color: rgba(255,255,255,0.42);
    font-size: 13px;
    margin-bottom: 24px;
  }

  /* ── Start Chat button ── */
  .start-chat-btn {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 16px 22px;
    border-radius: 14px;
    background: linear-gradient(135deg, #ff57b2, #8b5cf6);
    border: none;
    color: white;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    width: 100%;
    margin-bottom: 22px;
    transition: opacity 0.2s;
  }
  .start-chat-btn:hover { opacity: 0.88; }
  .start-chat-btn i { font-size: 19px; }

  /* ── Stats ── */
  .stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin-bottom: 20px;
  }
  .stat {
    background: rgba(255,255,255,0.04);
    border: 0.5px solid rgba(255,255,255,0.08);
    border-radius: 12px;
    padding: 16px;
  }
  .stat-val {
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 3px;
    background: linear-gradient(135deg, #ff57b2, #8b5cf6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .stat-label { font-size: 12px; color: rgba(255,255,255,0.42); }

  /* ── Card ── */
  .card {
    background: rgba(255,255,255,0.04);
    border: 0.5px solid rgba(255,255,255,0.1);
    border-radius: 14px;
    padding: 20px;
  }
  .card-title {
    font-size: 11px;
    color: rgba(255,255,255,0.38);
    text-transform: uppercase;
    letter-spacing: 0.07em;
    margin-bottom: 14px;
  }

  /* ── History list ── */
  .hist-list { display: flex; flex-direction: column; gap: 10px; }
  .hist-item {
    background: rgba(255,255,255,0.04);
    border: 0.5px solid rgba(255,255,255,0.08);
    border-radius: 12px;
    padding: 14px 16px;
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    transition: background 0.2s;
  }
  .hist-item:hover { background: rgba(255,255,255,0.07); }
  .hist-icon {
    width: 34px;
    height: 34px;
    border-radius: 8px;
    background: linear-gradient(135deg, rgba(255,87,178,.22), rgba(139,92,246,.22));
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .hist-icon i { font-size: 16px; color: #c084fc; }
  .hist-info { flex: 1; }
  .hist-name { font-size: 14px; font-weight: 500; margin-bottom: 2px; }
  .hist-date { font-size: 12px; color: rgba(255,255,255,0.36); }
  .hist-arrow { color: rgba(255,255,255,0.22); font-size: 16px; }

  /* ── Profile ── */
  .avatar {
    width: 58px;
    height: 58px;
    border-radius: 50%;
    background: linear-gradient(135deg, #ff57b2, #8b5cf6);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 14px;
  }
  .prof-name { font-size: 20px; font-weight: 700; margin-bottom: 3px; }
  .prof-email { font-size: 13px; color: rgba(255,255,255,0.42); margin-bottom: 16px; }
  .prof-badge {
    display: inline-block;
    background: rgba(255,87,178,.16);
    border: 0.5px solid rgba(255,87,178,.32);
    color: #f0abcb;
    font-size: 12px;
    padding: 4px 10px;
    border-radius: 20px;
    margin-bottom: 20px;
  }
  .prof-fields { display: flex; flex-direction: column; }
  .prof-field {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 13px 0;
    border-bottom: 0.5px solid rgba(255,255,255,0.06);
  }
  .prof-field:last-child { border-bottom: none; }
  .pf-label { font-size: 13px; color: rgba(255,255,255,0.42); display: flex; align-items: center; gap: 7px; }
  .pf-label i { font-size: 15px; }
  .pf-val { font-size: 13px; font-weight: 500; }
  .pf-upgrade { color: #c084fc; cursor: pointer; }

  /* ── Chat ── */
  .chat-input-wrap {
    background: #171722;
    border-radius: 12px;
    padding: 14px 16px;
    margin-bottom: 14px;
  }
  .chat-input-wrap textarea {
    width: 100%;
    background: transparent;
    border: none;
    outline: none;
    color: white;
    font-size: 14px;
    resize: none;
    height: 100px;
    line-height: 1.7;
    font-family: inherit;
  }
  .chat-input-wrap textarea::placeholder { color: rgba(255,255,255,0.28); }
  .chat-send-btn {
    background: linear-gradient(135deg, #ff57b2, #8b5cf6);
    border: none;
    color: white;
    padding: 11px 20px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 7px;
    transition: opacity 0.2s;
  }
  .chat-send-btn:hover { opacity: 0.85; }
  .chat-send-btn:disabled { opacity: 0.5; cursor: not-allowed; }
  .chat-send-btn i { font-size: 15px; }
  .chat-output {
    background: #171722;
    border-radius: 12px;
    padding: 16px;
    margin-top: 16px;
    font-size: 14px;
    color: rgba(255,255,255,0.78);
    line-height: 1.75;
    white-space: pre-wrap;
    min-height: 80px;
  }
  .chat-output.loading { color: rgba(255,255,255,0.35); }
  .chat-output.error { color: rgba(255,87,178,0.8); }

  /* ── Responsive ── */
  @media (max-width: 640px) {
    .db-root { flex-direction: column; }
    .sb { width: 100%; border-right: none; border-bottom: 0.5px solid rgba(255,255,255,0.08); padding: 16px; }
    .nav { flex-direction: row; }
    .nav-btn span { display: none; }
    .main { padding: 20px 16px; }
    .stats { grid-template-columns: 1fr 1fr; }
  }
`;

const HISTORY_ITEMS = [
  { id: 1, icon: "ti-flame",    name: "Campfire pizza content",    date: "Today, 9:14 AM" },
  { id: 2, icon: "ti-cookie",   name: "Forest brownie recipe",     date: "Yesterday, 7:30 PM" },
  { id: 3, icon: "ti-hash",     name: "Outdoor cooking hashtags",  date: "Jun 14, 3:00 PM" },
  { id: 4, icon: "ti-sparkles", name: "Reel captions — sunset hike", date: "Jun 12, 11:45 AM" },
  { id: 5, icon: "ti-photo",    name: "Instagram bio rewrite",     date: "Jun 10, 6:20 PM" },
];

function NavBtn({ icon, label, active, onClick }) {
  return (
    <button className={`nav-btn${active ? " active" : ""}`} onClick={onClick}>
      <i className={`ti ${icon}`} aria-hidden="true" />
      <span>{label}</span>
    </button>
  );
}

function HistItem({ item, onClick }) {
  return (
    <div className="hist-item" onClick={onClick}>
      <div className="hist-icon">
        <i className={`ti ${item.icon}`} aria-hidden="true" />
      </div>
      <div className="hist-info">
        <div className="hist-name">{item.name}</div>
        <div className="hist-date">{item.date}</div>
      </div>
      <i className="ti ti-chevron-right hist-arrow" aria-hidden="true" />
    </div>
  );
}

/* ── Tab: Dashboard (Home) ── */
function HomeTab({ onStartChat }) {
  return (
    <>
      <h1 className="pg-title">Good morning, Shiva 👋</h1>
      <p className="pg-sub">Here's what's happening with your Sahayak account.</p>

      <button className="start-chat-btn" onClick={onStartChat}>
        <i className="ti ti-message-bolt" aria-hidden="true" />
        Start new chat
      </button>

      <div className="stats">
        <div className="stat">
          <div className="stat-val">12</div>
          <div className="stat-label">Total chats</div>
        </div>
        <div className="stat">
          <div className="stat-val">38</div>
          <div className="stat-label">Generations</div>
        </div>
        <div className="stat">
          <div className="stat-val">Free</div>
          <div className="stat-label">Current plan</div>
        </div>
      </div>

      <div className="card">
        <div className="card-title">Recent sessions</div>
        <div className="hist-list">
          {HISTORY_ITEMS.slice(0, 2).map(item => (
            <HistItem key={item.id} item={item} onClick={onStartChat} />
          ))}
        </div>
      </div>
    </>
  );
}

/* ── Tab: History ── */
function HistoryTab({ onStartChat }) {
  return (
    <>
      <h1 className="pg-title">History</h1>
      <p className="pg-sub">All your previous AI sessions.</p>
      <div className="hist-list">
        {HISTORY_ITEMS.map(item => (
          <HistItem key={item.id} item={item} onClick={onStartChat} />
        ))}
      </div>
    </>
  );
}

/* ── Tab: Profile ── */
function ProfileTab() {
  return (
    <>
      <h1 className="pg-title">Profile</h1>
      <p className="pg-sub">Manage your account details.</p>
      <div className="card">
        <div className="avatar">S</div>
        <div className="prof-name">Shiva</div>
        <div className="prof-email">shiva@example.com</div>
        <div className="prof-badge">Free plan</div>
        <div className="prof-fields">
          <div className="prof-field">
            <span className="pf-label"><i className="ti ti-mail" aria-hidden="true" />Email</span>
            <span className="pf-val">shiva@example.com</span>
          </div>
          <div className="prof-field">
            <span className="pf-label"><i className="ti ti-calendar" aria-hidden="true" />Member since</span>
            <span className="pf-val">June 2025</span>
          </div>
          <div className="prof-field">
            <span className="pf-label"><i className="ti ti-chart-bar" aria-hidden="true" />Generations used</span>
            <span className="pf-val">38 / 50</span>
          </div>
          <div className="prof-field">
            <span className="pf-label"><i className="ti ti-crown" aria-hidden="true" />Plan</span>
            <span className="pf-val pf-upgrade">Free → Upgrade</span>
          </div>
        </div>
      </div>
    </>
  );
}

/* ── Tab: Chat ── */
function ChatTab() {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | loading | done | error

  async function handleGenerate() {
    if (!prompt.trim()) return;
    setStatus("loading");
    setOutput("Generating…");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system:
            "You are Social AI Sahayak, a social media assistant. Generate captions, hashtags, and posting recommendations. Be creative and concise.",
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const data = await res.json();
      const text =
        data.content?.find((b) => b.type === "text")?.text || "No response.";
      setOutput(text);
      setStatus("done");
    } catch {
      setOutput("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  return (
    <>
      <h1 className="pg-title">AI Chat</h1>
      <p className="pg-sub">Generate captions, hashtags and posting recommendations.</p>
      <div className="card">
        <div className="card-title">Your prompt</div>
        <div className="chat-input-wrap">
          <textarea
            placeholder="Create a viral campfire pizza short…"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
        <button
          className="chat-send-btn"
          onClick={handleGenerate}
          disabled={status === "loading"}
        >
          <i className="ti ti-send" aria-hidden="true" />
          {status === "loading" ? "Generating…" : "Generate"}
        </button>
        {output && (
          <div className={`chat-output${status === "loading" ? " loading" : ""}${status === "error" ? " error" : ""}`}>
            {output}
          </div>
        )}
      </div>
    </>
  );
}

/* ── Root ── */
export default function Dashboard() {
  const [tab, setTab] = useState("home");

  const goChat = () => setTab("chat");

  const NAV = [
    { id: "home",    icon: "ti-layout-dashboard", label: "Dashboard" },
    { id: "history", icon: "ti-history",           label: "History"   },
    { id: "profile", icon: "ti-user",              label: "Profile"   },
  ];

  return (
    <>
      <style>{STYLES}</style>
      <div className="db-root">
        {/* Sidebar */}
        <div className="sb">
          <div className="logo">
            <div className="logo-box">AI</div>
            <h2>Sahayak</h2>
          </div>
          <nav className="nav">
            {NAV.map((n) => (
              <NavBtn
                key={n.id}
                icon={n.icon}
                label={n.label}
                active={tab === n.id}
                onClick={() => setTab(n.id)}
              />
            ))}
          </nav>
        </div>

        {/* Main */}
        <div className="main">
          {tab === "home"    && <HomeTab    onStartChat={goChat} />}
          {tab === "history" && <HistoryTab onStartChat={goChat} />}
          {tab === "profile" && <ProfileTab />}
          {tab === "chat"    && <ChatTab />}
        </div>
      </div>
    </>
  );
}