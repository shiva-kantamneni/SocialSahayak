import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700&family=Cabinet+Grotesk:wght@300;400;500;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body, #root { height: 100%; font-family: 'Cabinet Grotesk', sans-serif; }
  body { background: #0a0a0f; overflow-x: hidden; }

  @keyframes float { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-12px)} }
  @keyframes slide-up { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fade-in { from{opacity:0} to{opacity:1} }
  @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes tag-scroll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
  @keyframes progress-fill { from{width:0%} to{width:var(--target-width)} }
  @keyframes check-draw { from{stroke-dashoffset:30} to{stroke-dashoffset:0} }
  @keyframes step-pop { 0%{transform:scale(0.8);opacity:0} 100%{transform:scale(1);opacity:1} }

  .app-wrapper { display:grid; grid-template-columns:1fr 1fr; min-height:100vh; }

  /* ── LEFT PANEL ── */
  .left-panel {
    background: linear-gradient(145deg,#0e0e1a 0%,#12121f 50%,#0a0a14 100%);
    position:relative; overflow:hidden;
    display:flex; flex-direction:column; justify-content:space-between;
    padding:2.5rem 3rem; border-right:1px solid rgba(255,255,255,0.06);
  }
  .bg-glow-1 { position:absolute;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(255,87,178,0.12) 0%,transparent 70%);top:-100px;right:-100px;pointer-events:none; }
  .bg-glow-2 { position:absolute;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,rgba(99,102,241,0.1) 0%,transparent 70%);bottom:50px;left:-80px;pointer-events:none; }
  .bg-glow-3 { position:absolute;width:200px;height:200px;border-radius:50%;background:radial-gradient(circle,rgba(6,214,160,0.08) 0%,transparent 70%);top:45%;left:30%;pointer-events:none; }

  .brand-row { position:relative;z-index:2;display:flex;align-items:center;gap:10px; }
  .logo-box {
    width:38px;height:38px;border-radius:10px;
    background:linear-gradient(135deg,#ff57b2,#8b5cf6);
    display:flex;align-items:center;justify-content:center;
    font-size:18px;font-weight:700;color:#fff;
    box-shadow:0 0 20px rgba(255,87,178,0.4);
  }
  .brand-name { font-family:'Clash Display',sans-serif;font-size:1.4rem;font-weight:600;color:#fff;letter-spacing:0.02em; }
  .brand-sub { font-size:11px;color:rgba(255,255,255,0.35);letter-spacing:0.1em;text-transform:uppercase;margin-left:2px;margin-top:2px; }

  .hero-section { position:relative;z-index:2;flex:1;display:flex;flex-direction:column;justify-content:center;padding:1rem 0; }
  .hero-headline {
    font-family:'Clash Display',sans-serif;
    font-size:clamp(1.8rem,2.8vw,2.4rem);font-weight:700;
    color:#fff;line-height:1.15;margin-bottom:0.8rem;
    background:linear-gradient(135deg,#fff 30%,rgba(255,87,178,0.9) 70%,#8b5cf6 100%);
    -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  }
  .hero-sub { font-size:14px;color:rgba(255,255,255,0.45);line-height:1.6;font-weight:300;max-width:340px;margin-bottom:2rem; }

  /* Stats grid */
  .stats-grid { display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:1.5rem; }
  .stat-card {
    background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);
    border-radius:14px;padding:1rem 1.1rem;
    animation:float 4s ease-in-out infinite;
  }
  .stat-card:nth-child(2){animation-delay:0.5s}
  .stat-card:nth-child(3){animation-delay:1s}
  .stat-card:nth-child(4){animation-delay:1.5s}
  .stat-num { font-family:'Clash Display',sans-serif;font-size:1.6rem;font-weight:700;line-height:1;margin-bottom:3px; }
  .stat-label { font-size:11px;color:rgba(255,255,255,0.38);font-weight:300;letter-spacing:0.04em; }

  /* Platform icons row */
  .platforms-row { display:flex;align-items:center;gap:8px;margin-bottom:1.5rem; }
  .platform-badge {
    display:flex;align-items:center;gap:6px;
    font-size:12px;padding:5px 11px;border-radius:20px;
    background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);
    color:rgba(255,255,255,0.55);font-weight:500;
  }
  .platform-dot { width:6px;height:6px;border-radius:50%; }

  .scroll-tags-wrapper { position:relative;z-index:2;overflow:hidden;margin-bottom:0.5rem; }
  .scroll-tags-inner { display:flex;gap:8px;width:max-content;animation:tag-scroll 18s linear infinite; }
  .scroll-tag { font-size:12px;padding:5px 12px;border-radius:20px;white-space:nowrap;font-weight:500;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.6); }
  .scroll-tag.hot { background:rgba(255,87,178,0.12);border-color:rgba(255,87,178,0.3);color:#ff9de0; }
  .scroll-tag.cool { background:rgba(99,102,241,0.12);border-color:rgba(99,102,241,0.3);color:#a5b4fc; }
  .scroll-tag.fresh { background:rgba(6,214,160,0.1);border-color:rgba(6,214,160,0.25);color:#6effd8; }

  /* ── RIGHT PANEL ── */
  .right-panel {
    background:#0f0f18;
    display:flex;align-items:center;justify-content:center;
    padding:2.5rem 2rem;position:relative;overflow-y:auto;
  }
  .right-panel::before {
    content:'';position:absolute;inset:0;
    background:radial-gradient(ellipse at 60% 30%,rgba(139,92,246,0.06) 0%,transparent 60%);
    pointer-events:none;
  }

  .form-card { width:100%;max-width:420px;position:relative;z-index:2;animation:slide-up 0.6s cubic-bezier(0.22,1,0.36,1) both; }

  /* Step indicator */
  .step-indicator { display:flex;align-items:center;gap:0;margin-bottom:2rem; }
  .step-item { display:flex;align-items:center;gap:8px;flex:1; }
  .step-item:last-child { flex:0; }
  .step-circle {
    width:30px;height:30px;border-radius:50%;
    display:flex;align-items:center;justify-content:center;
    font-size:12px;font-weight:600;flex-shrink:0;
    transition:all 0.3s cubic-bezier(0.22,1,0.36,1);
    position:relative;
  }
  .step-circle.done {
    background:linear-gradient(135deg,#ff57b2,#8b5cf6);
    color:#fff;box-shadow:0 0 14px rgba(255,87,178,0.4);
  }
  .step-circle.active {
    background:rgba(255,87,178,0.12);
    border:2px solid #ff57b2;color:#ff57b2;
    animation:step-pop 0.3s cubic-bezier(0.22,1,0.36,1);
  }
  .step-circle.idle {
    background:rgba(255,255,255,0.04);
    border:1px solid rgba(255,255,255,0.12);color:rgba(255,255,255,0.25);
  }
  .step-line { flex:1;height:1px;background:rgba(255,255,255,0.08);margin:0 6px;transition:background 0.4s; }
  .step-line.done { background:linear-gradient(90deg,#ff57b2,#8b5cf6); }
  .step-label { display:none; }

  /* Progress bar */
  .progress-bar-wrap { height:3px;background:rgba(255,255,255,0.06);border-radius:4px;margin-bottom:2rem;overflow:hidden; }
  .progress-bar-fill {
    height:100%;border-radius:4px;
    background:linear-gradient(90deg,#ff57b2,#8b5cf6);
    transition:width 0.5s cubic-bezier(0.22,1,0.36,1);
  }

  .form-header { margin-bottom:1.8rem; }
  .step-badge {
    display:inline-flex;align-items:center;gap:6px;
    font-size:11px;color:rgba(255,87,178,0.8);
    background:rgba(255,87,178,0.08);border:1px solid rgba(255,87,178,0.2);
    border-radius:20px;padding:4px 12px;margin-bottom:1rem;letter-spacing:0.08em;text-transform:uppercase;
  }
  .step-badge-dot { width:5px;height:5px;border-radius:50%;background:#ff57b2; }
  .form-title { font-family:'Clash Display',sans-serif;font-size:2rem;font-weight:700;color:#fff;line-height:1.1;margin-bottom:0.4rem; }
  .form-desc { font-size:13.5px;color:rgba(255,255,255,0.38);font-weight:300;line-height:1.5; }

  /* Fields */
  .field { display:flex;flex-direction:column;gap:6px;margin-bottom:1rem; }
  .field label { font-size:12px;font-weight:500;color:rgba(255,255,255,0.55);letter-spacing:0.06em;text-transform:uppercase; }
  .input-wrap { position:relative; }
  .input-icon {
    position:absolute;left:14px;top:50%;transform:translateY(-50%);
    width:16px;height:16px;stroke:rgba(255,255,255,0.25);stroke-width:1.8;fill:none;pointer-events:none;transition:stroke 0.2s;z-index:1;
  }
  .field-input {
    width:100%;height:50px;
    padding:0 44px 0 44px;
    background:rgba(255,255,255,0.04);
    border:1px solid rgba(255,255,255,0.1);
    border-radius:12px;
    color:#fff;font-family:'Cabinet Grotesk',sans-serif;font-size:15px;font-weight:400;
    outline:none;transition:all 0.2s;-webkit-appearance:none;
  }
  .field-input.no-left-icon { padding-left:16px; }
  .field-input::placeholder { color:rgba(255,255,255,0.2); }
  .field-input:focus { background:rgba(255,255,255,0.07);border-color:rgba(255,87,178,0.5);box-shadow:0 0 0 3px rgba(255,87,178,0.08); }
  .field-input.has-error { border-color:rgba(239,68,68,0.6); }
  .field-input.valid { border-color:rgba(6,214,160,0.4); }

  .pw-toggle {
    position:absolute;right:14px;top:50%;transform:translateY(-50%);
    background:none;border:none;cursor:pointer;padding:0;
    color:rgba(255,255,255,0.3);transition:color 0.2s;display:flex;
  }
  .pw-toggle:hover { color:rgba(255,255,255,0.7); }
  .pw-toggle svg { width:16px;height:16px;stroke:currentColor;stroke-width:1.8;fill:none; }

  .valid-check {
    position:absolute;right:14px;top:50%;transform:translateY(-50%);
    width:16px;height:16px;pointer-events:none;
  }
  .valid-check svg { width:16px;height:16px;stroke:#06d6a0;stroke-width:2.2;fill:none;
    stroke-dasharray:30;stroke-dashoffset:0;animation:check-draw 0.3s ease forwards;
  }

  .error-msg { font-size:12px;color:#f87171;margin-top:3px; }

  /* Two columns row */
  .fields-row { display:grid;grid-template-columns:1fr 1fr;gap:12px; }

  /* Password strength */
  .pw-strength { margin-top:6px; }
  .pw-strength-bar { height:3px;background:rgba(255,255,255,0.06);border-radius:4px;overflow:hidden;margin-bottom:4px; }
  .pw-strength-fill { height:100%;border-radius:4px;transition:width 0.3s,background 0.3s; }
  .pw-strength-label { font-size:11px;font-weight:500; }

  /* Niche selector */
  .niche-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:4px; }
  .niche-btn {
    border:1px solid rgba(255,255,255,0.1);border-radius:10px;
    padding:8px 6px;background:rgba(255,255,255,0.03);
    cursor:pointer;transition:all 0.2s;text-align:center;
    display:flex;flex-direction:column;align-items:center;gap:4px;
  }
  .niche-btn:hover { background:rgba(255,87,178,0.06);border-color:rgba(255,87,178,0.3); }
  .niche-btn.selected {
    background:rgba(255,87,178,0.1);border-color:#ff57b2;
    box-shadow:0 0 12px rgba(255,87,178,0.15);
  }
  .niche-icon { font-size:18px;line-height:1; }
  .niche-label { font-size:11px;color:rgba(255,255,255,0.5);font-weight:500;letter-spacing:0.02em; }
  .niche-btn.selected .niche-label { color:#ff9de0; }

  /* Platform toggles */
  .platform-grid { display:flex;flex-wrap:wrap;gap:8px;margin-top:4px; }
  .platform-toggle {
    display:flex;align-items:center;gap:7px;
    border:1px solid rgba(255,255,255,0.1);border-radius:20px;
    padding:6px 14px;background:rgba(255,255,255,0.03);
    cursor:pointer;transition:all 0.2s;font-size:13px;
    color:rgba(255,255,255,0.45);font-weight:500;
  }
  .platform-toggle:hover { background:rgba(255,255,255,0.06); }
  .platform-toggle.selected { border-color:currentColor; }
  .platform-toggle .pt-dot { width:7px;height:7px;border-radius:50%;flex-shrink:0; }

  /* Terms */
  .terms-row { display:flex;align-items:flex-start;gap:9px;margin-bottom:1.4rem; }
  .terms-check { width:15px;height:15px;flex-shrink:0;margin-top:2px;border:1px solid rgba(255,255,255,0.2);border-radius:4px;accent-color:#ff57b2;cursor:pointer; }
  .terms-text { font-size:12.5px;color:rgba(255,255,255,0.35);line-height:1.5; }
  .terms-text a { color:rgba(255,87,178,0.8);text-decoration:none;cursor:pointer; }
  .terms-text a:hover { color:#ff57b2; }

  /* Buttons */
  .btn-row { display:flex;gap:10px; }
  .btn-back {
    height:52px;padding:0 20px;
    background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);
    border-radius:12px;color:rgba(255,255,255,0.5);
    font-family:'Cabinet Grotesk',sans-serif;font-size:15px;
    cursor:pointer;transition:all 0.2s;display:flex;align-items:center;gap:6px;
  }
  .btn-back:hover { background:rgba(255,255,255,0.08); }
  .btn-back svg { width:16px;height:16px;stroke:currentColor;stroke-width:2;fill:none; }

  .btn-primary {
    flex:1;height:52px;
    background:linear-gradient(135deg,#ff57b2,#8b5cf6);
    border:none;border-radius:12px;
    color:#fff;font-family:'Clash Display',sans-serif;font-size:15px;font-weight:600;
    cursor:pointer;letter-spacing:0.04em;
    transition:all 0.2s;position:relative;overflow:hidden;
    display:flex;align-items:center;justify-content:center;gap:8px;
  }
  .btn-primary:hover { transform:translateY(-1px);box-shadow:0 12px 32px rgba(255,87,178,0.35); }
  .btn-primary:active { transform:scale(0.98); }
  .btn-primary svg { width:16px;height:16px;stroke:currentColor;stroke-width:2;fill:none; }
  .btn-primary:disabled { opacity:0.45;cursor:not-allowed;transform:none;box-shadow:none; }

  .divider { display:flex;align-items:center;gap:10px;margin:1.2rem 0;font-size:12px;color:rgba(255,255,255,0.2);letter-spacing:0.06em; }
  .divider::before,.divider::after { content:'';flex:1;height:1px;background:rgba(255,255,255,0.08); }

  .btn-google {
    width:100%;height:48px;
    background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);
    border-radius:12px;color:rgba(255,255,255,0.75);
    font-family:'Cabinet Grotesk',sans-serif;font-size:14px;
    cursor:pointer;display:flex;align-items:center;justify-content:center;gap:10px;
    transition:all 0.2s;
  }
  .btn-google:hover { background:rgba(255,255,255,0.08);border-color:rgba(255,255,255,0.2); }

  .signin-row { text-align:center;font-size:13.5px;color:rgba(255,255,255,0.3);margin-top:1.2rem;font-weight:300; }
  .signin-row button { background:none;border:none;cursor:pointer;color:#ff57b2;font-family:'Cabinet Grotesk',sans-serif;font-size:13.5px;font-weight:500;padding:0;transition:color 0.2s; }
  .signin-row button:hover { color:#ff9de0; }

  /* Success screen */
  .success-screen { text-align:center;padding:2rem 0;animation:slide-up 0.5s cubic-bezier(0.22,1,0.36,1); }
  .success-ring {
    width:80px;height:80px;border-radius:50%;
    background:radial-gradient(circle,rgba(6,214,160,0.15),transparent);
    border:2px solid rgba(6,214,160,0.4);
    display:flex;align-items:center;justify-content:center;margin:0 auto 1.5rem;
    position:relative;
  }
  .success-ring::before {
    content:'';position:absolute;inset:-8px;border-radius:50%;
    border:1px solid rgba(6,214,160,0.15);
  }
  .success-ring svg { width:34px;height:34px;stroke:#06d6a0;stroke-width:2.2;fill:none;
    stroke-dasharray:40;animation:check-draw 0.5s 0.2s ease both;
  }
  .success-title { font-family:'Clash Display',sans-serif;font-size:1.8rem;color:#fff;margin-bottom:0.5rem; }
  .success-handle {
    display:inline-block;
    font-size:13px;padding:4px 14px;border-radius:20px;
    background:rgba(255,87,178,0.1);border:1px solid rgba(255,87,178,0.25);color:#ff9de0;
    margin-bottom:1rem;
  }
  .success-desc { font-size:13.5px;color:rgba(255,255,255,0.38);line-height:1.6;max-width:300px;margin:0 auto 2rem; }
  .success-features { display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:2rem;text-align:left; }
  .sf-item { display:flex;align-items:center;gap:8px;font-size:13px;color:rgba(255,255,255,0.55); }
  .sf-dot { width:6px;height:6px;border-radius:50%;background:linear-gradient(135deg,#ff57b2,#8b5cf6);flex-shrink:0; }

  @media(max-width:700px){
    .app-wrapper { grid-template-columns:1fr; }
    .left-panel { display:none; }
    .right-panel { padding:3rem 1.5rem;align-items:flex-start; }
    .fields-row { grid-template-columns:1fr; }
    .niche-grid { grid-template-columns:repeat(3,1fr); }
  }
`;

const TAGS = [
  "#ContentCreator","#Viral","#Trending","#Reels","#YouTubeShorts",
  "#TikTok","#GrowthHack","#InstagramMarketing","#CreatorEconomy",
  "#SocialMedia","#AITools","#HashtagStrategy","#DigitalCreator",
  "#ContentStrategy","#BrandCollab"
];

const NICHES = [
  { icon: "🎮", label: "Gaming" },
  { icon: "💄", label: "Beauty" },
  { icon: "🍳", label: "Food" },
  { icon: "💪", label: "Fitness" },
  { icon: "✈️", label: "Travel" },
  { icon: "💼", label: "Business" },
  { icon: "🎵", label: "Music" },
  { icon: "📸", label: "Photo" },
  { icon: "🛍️", label: "Fashion" },
];

const PLATFORMS = [
  { id: "instagram", label: "Instagram", color: "#e1306c", dot: "#e1306c" },
  { id: "tiktok", label: "TikTok", color: "#69c9d0", dot: "#69c9d0" },
  { id: "youtube", label: "YouTube", color: "#ff0000", dot: "#ff0000" },
  { id: "twitter", label: "X / Twitter", color: "#a5b4fc", dot: "#a5b4fc" },
  { id: "linkedin", label: "LinkedIn", color: "#0a66c2", dot: "#0a8fd0" },
];

const EyeIcon = ({ open }) =>
  open ? (
    <svg viewBox="0 0 24 24">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 48 48">
    <path fill="#4285F4" d="M46.145 24.506c0-1.613-.145-3.167-.415-4.661H24v8.818h12.449c-.537 2.894-2.17 5.346-4.624 6.987v5.806h7.484c4.378-4.032 6.836-9.975 6.836-16.95z"/>
    <path fill="#34A853" d="M24 47c6.267 0 11.52-2.078 15.36-5.632l-7.484-5.806c-2.074 1.39-4.726 2.21-7.876 2.21-6.057 0-11.19-4.09-13.02-9.59H3.224v5.993A23 23 0 0024 47z"/>
    <path fill="#FBBC05" d="M10.98 28.182A13.86 13.86 0 0110.25 24c0-1.457.25-2.873.73-4.182v-5.993H3.224A23 23 0 001 24c0 3.717.89 7.235 2.224 10.175l7.756-5.993z"/>
    <path fill="#EA4335" d="M24 10.228c3.416 0 6.476 1.175 8.887 3.478l6.663-6.663C35.516 3.218 30.264 1 24 1A23 23 0 003.224 13.825l7.756 5.993C12.81 14.318 17.943 10.228 24 10.228z"/>
  </svg>
);

function getPasswordStrength(pw) {
  if (!pw) return { score: 0, label: "", color: "transparent", width: "0%" };
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 1) return { score, label: "Weak", color: "#f87171", width: "25%" };
  if (score <= 2) return { score, label: "Fair", color: "#fb923c", width: "50%" };
  if (score <= 3) return { score, label: "Good", color: "#facc15", width: "70%" };
  return { score, label: "Strong", color: "#06d6a0", width: "100%" };
}

export default function SahayakSignUp({ onSignIn }) {
  const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const [showPw, setShowPw] = useState(false);
const [loading, setLoading] = useState(false);

  const [errors, setErrors]       = useState({});

  const doubled = [...TAGS, ...TAGS];

  
  const pwStrength = getPasswordStrength(password);

  const toggleNiche = (label) =>
    setNiches((v) => v.includes(label) ? v.filter((x) => x !== label) : [...v, label]);
  const togglePlatform = (id) =>
    setPlatforms((v) => v.includes(id) ? v.filter((x) => x !== id) : [...v, id]);

  const validate = () => {
  const e = {};

  if (!name.trim()) {
    e.name = "Name is required";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    e.email = "Enter a valid email";
  }

  if (password.length < 8) {
    e.password = "Password must be at least 8 characters";
  }

  return e;
};
const navigate=useNavigate();

  const handleSubmit = (ev) => {
    ev.preventDefault();
  const e = validate();

  setErrors(e);

  if (Object.keys(e).length) return;

  setLoading(true);

  setTimeout(async() => {
    try{
      const response=await axios.post("http://localhost:8000/signup",{
        name,email,password
      });
      
      toast.success(response.data.message)
      navigate("/")

    }catch(error){
      
      if(error.response){
        toast.error(error.response.data.detail ||"SignUp failed");
      }else{
        toast.error("server error")

      }

    }finally{
      setLoading(false);
    }
  }, 1200);
};

  

  return (
    <>
      <style>{styles}</style>
      <div className="app-wrapper">

        {/* ── LEFT PANEL ── */}
        <aside className="left-panel">
          <div className="bg-glow-1" />
          <div className="bg-glow-2" />
          <div className="bg-glow-3" />

          <div className="brand-row">
            <div className="logo-box">S</div>
            <div>
              <div className="brand-name">Sahayak</div>
              <div className="brand-sub">Social AI</div>
            </div>
          </div>

          <div className="hero-section">
            <div className="hero-headline">
              Your AI<br />content team,<br />always on.
            </div>
            <div className="hero-sub">
              Join creators worldwide using Sahayak to generate viral hashtags, captions and title ideas in seconds.
            </div>

            <div className="stats-grid">
              {[
                { num: "50K+", label: "Active creators", color: "#ff9de0" },
                { num: "2.4M", label: "Posts generated", color: "#a5b4fc" },
                { num: "347%", label: "Avg. reach boost", color: "#6effd8" },
                { num: "4.9★", label: "Creator rating", color: "#fbbf24" },
              ].map((s) => (
                <div className="stat-card" key={s.label}>
                  <div className="stat-num" style={{ color: s.color }}>{s.num}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="platforms-row">
              {[
                { label: "Instagram", color: "#e1306c" },
                { label: "TikTok",    color: "#69c9d0" },
                { label: "YouTube",   color: "#ff0000" },
              ].map((p) => (
                <div className="platform-badge" key={p.label}>
                  <div className="platform-dot" style={{ background: p.color }} />
                  {p.label}
                </div>
              ))}
            </div>
          </div>

          <div className="scroll-tags-wrapper">
            <div className="scroll-tags-inner">
              {doubled.map((t, i) => (
                <span key={i} className={`scroll-tag ${i%3===0?"hot":i%3===1?"cool":"fresh"}`}>{t}</span>
              ))}
            </div>
          </div>
        </aside>

        {/* ── RIGHT PANEL ── */}
        <main className="right-panel">
          <div className="form-card">
                <div className="form-header">
  <div className="step-badge">
    <span className="step-badge-dot" />
    Get Started
  </div>

  <div className="form-title">
    Create your account
  </div>

  <div className="form-desc">
    Join thousands of creators using Sahayak to grow faster with AI.
  </div>
</div>

<div className="field">
  <label>Full Name</label>

  <div className="input-wrap">
    <svg className="input-icon" viewBox="0 0 24 24">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>

    <input
      className={`field-input${
        errors.name ? " has-error" : name ? " valid" : ""
      }`}
      placeholder="John Doe"
      value={name}
      onChange={(e) => {
        setName(e.target.value);
        setErrors((v) => ({ ...v, name: "" }));
      }}
    />
  </div>

  {errors.name && (
    <div className="error-msg">{errors.name}</div>
  )}
</div>

<div className="field">
  <label>Email Address</label>

  <div className="input-wrap">
    <svg className="input-icon" viewBox="0 0 24 24">
      <rect x="2" y="4" width="20" height="16" rx="3" />
      <path d="M2 7l10 7 10-7" />
    </svg>

    <input
      type="email"
      value={email}
      placeholder="you@example.com"
      className={`field-input${
        errors.email ? " has-error" : ""
      }`}
      onChange={(e) => {
        setEmail(e.target.value);
        setErrors((v) => ({ ...v, email: "" }));
      }}
    />
  </div>

  {errors.email && (
    <div className="error-msg">{errors.email}</div>
  )}
</div>

<div className="field">
  <label>Password</label>

  <div className="input-wrap">
    <svg className="input-icon" viewBox="0 0 24 24">
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 018 0v4" />
    </svg>

    <input
      type={showPw ? "text" : "password"}
      value={password}
      placeholder="••••••••"
      className={`field-input${
        errors.password ? " has-error" : ""
      }`}
      onChange={(e) => {
        setPassword(e.target.value);
        setErrors((v) => ({ ...v, password: "" }));
      }}
    />

    <button
      type="button"
      className="pw-toggle"
      onClick={() => setShowPw(!showPw)}
    >
      <EyeIcon open={showPw} />
    </button>
  </div>

  {errors.password && (
    <div className="error-msg">{errors.password}</div>
  )}
</div>

<button
  className="btn-primary"
  onClick={handleSubmit}
  disabled={loading}
  style={{ width: "100%" }}
>
  {loading ? "Creating Account..." : "Create Account"}
</button>


<div className="signin-row">
  Already have an account?{" "}
  <button onClick={() => navigate("/")}>
    Sign in →
  </button>
</div>
            
          </div>
        </main>
      </div>
    </>
  );
}