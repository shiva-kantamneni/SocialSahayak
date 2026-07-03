export const GLOBAL_STYLES = `
  @import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: #0a0a0f;
    color: white;
    font-family: Inter, system-ui, sans-serif;
  }

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
    position: fixed;
    top: 0; left: 0;
    height: 100vh;
    z-index: 100;
  }
  .logo {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 32px;
    text-decoration: none;
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
    color: white;
  }
  .logo h2 {
    font-size: 17px;
    font-weight: 600;
    color: white;
  }
  .nav {
    display: flex;
    flex-direction: column;
    gap: 6px;
    flex: 1;
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
    text-decoration: none;
    font-family: inherit;
  }
  .nav-btn:hover { background: rgba(255,255,255,0.06); color: white; }
  .nav-btn.active {
    background: linear-gradient(135deg, rgba(255,87,178,.18), rgba(139,92,246,.18));
    border: 0.5px solid rgba(255,87,178,.3);
    color: white;
  }
  .nav-btn i { font-size: 17px; }

  .nav-logout {
    margin-top: auto;
    background: transparent;
    border: none;
    color: rgba(255,255,255,0.38);
    padding: 11px 14px;
    border-radius: 10px;
    cursor: pointer;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    font-family: inherit;
    transition: color 0.2s, background 0.2s;
  }
  .nav-logout:hover { background: rgba(255,87,178,0.08); color: #ff57b2; }
  .nav-logout i { font-size: 17px; }

  /* ── Main ── */
  .main {
    flex: 1;
    margin-left: 220px;
    padding: 36px 32px;
    overflow: auto;
    min-height: 100vh;
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
    font-family: inherit;
    text-decoration: none;
    justify-content: center;
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
    text-decoration: none;
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
  .hist-name { font-size: 14px; font-weight: 500; margin-bottom: 2px; color: white; }
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
  .pf-danger { color: #ff57b2; cursor: pointer; }

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
    font-family: inherit;
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
    .sb {
      width: 100%;
      height: auto;
      position: relative;
      border-right: none;
      border-bottom: 0.5px solid rgba(255,255,255,0.08);
      padding: 16px;
      flex-direction: column;
    }
    .nav { flex-direction: row; }
    .nav-btn span { display: none; }
    .nav-logout span { display: none; }
    .main { margin-left: 0; padding: 20px 16px; }
    .stats { grid-template-columns: 1fr 1fr; }
    .db-root { flex-direction: column; }
  }
`;

export const HISTORY_ITEMS = [
  { id: 1, icon: "ti-flame",    name: "Campfire pizza content",      date: "Today, 9:14 AM" },
  { id: 2, icon: "ti-cookie",   name: "Forest brownie recipe",       date: "Yesterday, 7:30 PM" },
  { id: 3, icon: "ti-hash",     name: "Outdoor cooking hashtags",    date: "Jun 14, 3:00 PM" },
  { id: 4, icon: "ti-sparkles", name: "Reel captions — sunset hike", date: "Jun 12, 11:45 AM" },
  { id: 5, icon: "ti-photo",    name: "Instagram bio rewrite",       date: "Jun 10, 6:20 PM" },
];
