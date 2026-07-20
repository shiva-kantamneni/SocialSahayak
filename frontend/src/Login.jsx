import { useEffect, useState } from "react";
import { useAsyncError, useNavigate } from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import { Navigate } from "react-router-dom";
const API_URL=import.meta.env.VITE_API_URL;

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700&family=Cabinet+Grotesk:wght@300;400;500;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body, #root { height: 100%; font-family: 'Cabinet Grotesk', sans-serif; }
  body { background: #0a0a0f; overflow-x: hidden; }

  @keyframes float { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-12px)} }
  @keyframes pulse-ring { 0%{transform:scale(0.8);opacity:0.8} 100%{transform:scale(2.2);opacity:0} }
  @keyframes slide-up { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fade-in { from{opacity:0} to{opacity:1} }
  @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes tag-scroll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }

  .app-wrapper { display:grid; grid-template-columns:1fr 1fr; min-height:100vh; }

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
    fontFamily:"Clash Display",sans-serif;font-size:18px;font-weight:700;color:#fff;
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
  .hero-sub { font-size:14px;color:rgba(255,255,255,0.45);line-height:1.6;font-weight:300;max-width:340px; }

  .floating-card {
    background:rgba(255,255,255,0.04);
    border:1px solid rgba(255,255,255,0.08);
    border-radius:16px;padding:1.2rem 1.4rem;
    margin-bottom:1rem;animation:float 4s ease-in-out infinite;
    backdrop-filter:blur(10px);
    display:flex;align-items:flex-start;gap:12px;
  }
  .floating-card:nth-child(2){animation-delay:0.5s}
  .floating-card:nth-child(3){animation-delay:1s}
  .card-icon { width:32px;height:32px;border-radius:8px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:14px; }
  .card-label { font-size:11px;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:4px; }
  .card-value { font-size:13px;color:rgba(255,255,255,0.85);font-weight:500;line-height:1.4; }
  .card-tags { display:flex;gap:5px;flex-wrap:wrap;margin-top:6px; }
  .tag-chip { font-size:11px;padding:2px 8px;border-radius:20px;font-weight:500; }

  .scroll-tags-wrapper { position:relative;z-index:2;overflow:hidden;margin-bottom:0.5rem; }
  .scroll-tags-inner { display:flex;gap:8px;width:max-content;animation:tag-scroll 18s linear infinite; }
  .scroll-tag { font-size:12px;padding:5px 12px;border-radius:20px;white-space:nowrap;font-weight:500;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.6); }
  .scroll-tag.hot { background:rgba(255,87,178,0.12);border-color:rgba(255,87,178,0.3);color:#ff9de0; }
  .scroll-tag.cool { background:rgba(99,102,241,0.12);border-color:rgba(99,102,241,0.3);color:#a5b4fc; }
  .scroll-tag.fresh { background:rgba(6,214,160,0.1);border-color:rgba(6,214,160,0.25);color:#6effd8; }

  .right-panel {
    background:#0f0f18;
    display:flex;align-items:center;justify-content:center;
    padding:2.5rem 2rem;position:relative;
  }
  .right-panel::before {
    content:'';position:absolute;inset:0;
    background:radial-gradient(ellipse at 60% 30%,rgba(139,92,246,0.06) 0%,transparent 60%);
    pointer-events:none;
  }

  .form-card { width:100%;max-width:400px;position:relative;z-index:2;animation:slide-up 0.6s cubic-bezier(0.22,1,0.36,1) both; }
  .form-header { margin-bottom:2.2rem; }
  .step-badge {
    display:inline-flex;align-items:center;gap:6px;
    font-size:11px;color:rgba(255,87,178,0.8);
    background:rgba(255,87,178,0.08);border:1px solid rgba(255,87,178,0.2);
    border-radius:20px;padding:4px 12px;margin-bottom:1rem;letter-spacing:0.08em;text-transform:uppercase;
  }
  .step-badge-dot { width:5px;height:5px;border-radius:50%;background:#ff57b2;position:relative; }
  .form-title { font-family:'Clash Display',sans-serif;font-size:2rem;font-weight:700;color:#fff;line-height:1.1;margin-bottom:0.4rem; }
  .form-desc { font-size:13.5px;color:rgba(255,255,255,0.38);font-weight:300;line-height:1.5; }

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
  .field-input::placeholder { color:rgba(255,255,255,0.2); }
  .field-input:focus { background:rgba(255,255,255,0.07);border-color:rgba(255,87,178,0.5);box-shadow:0 0 0 3px rgba(255,87,178,0.08); }
  .field-input.has-error { border-color:rgba(239,68,68,0.6); }
  .pw-toggle {
    position:absolute;right:14px;top:50%;transform:translateY(-50%);
    background:none;border:none;cursor:pointer;padding:0;
    color:rgba(255,255,255,0.3);transition:color 0.2s;display:flex;
  }
  .pw-toggle:hover { color:rgba(255,255,255,0.7); }
  .pw-toggle svg { width:16px;height:16px;stroke:currentColor;stroke-width:1.8;fill:none; }
  .error-msg { font-size:12px;color:#f87171;margin-top:3px; }

  .row-between { display:flex;justify-content:space-between;align-items:center;margin-bottom:1.4rem; }
  .remember { display:flex;align-items:center;gap:7px;font-size:13px;color:rgba(255,255,255,0.4);cursor:pointer;user-select:none; }
  .remember-check { width:15px;height:15px;border:1px solid rgba(255,255,255,0.2);border-radius:4px;background:rgba(255,255,255,0.04);cursor:pointer;accent-color:#ff57b2; }
  .forgot-btn { background:none;border:none;cursor:pointer;font-size:13px;color:rgba(255,87,178,0.8);font-family:'Cabinet Grotesk',sans-serif;font-weight:500;transition:color 0.2s;padding:0; }
  .forgot-btn:hover { color:#ff57b2; }

  .btn-primary {
    width:100%;height:52px;
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
  .btn-primary:disabled { opacity:0.5;cursor:not-allowed;transform:none; }

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

  .signup-row { text-align:center;font-size:13.5px;color:rgba(255,255,255,0.3);margin-top:1.2rem;font-weight:300; }
  .signup-row button { background:none;border:none;cursor:pointer;color:#ff57b2;font-family:'Cabinet Grotesk',sans-serif;font-size:13.5px;font-weight:500;padding:0;transition:color 0.2s; }
  .signup-row button:hover { color:#ff9de0; }

  .modal-overlay {
    position:fixed;inset:0;background:rgba(0,0,0,0.75);backdrop-filter:blur(8px);
    z-index:200;display:flex;align-items:center;justify-content:center;
    animation:fade-in 0.2s ease;
  }
  .modal-box {
    background:linear-gradient(145deg,#15151f,#1a1a28);
    border:1px solid rgba(255,255,255,0.1);border-radius:20px;
    padding:2.5rem;width:90%;max-width:380px;
    animation:slide-up 0.3s cubic-bezier(0.22,1,0.36,1);
  }
  .modal-icon {
    width:52px;height:52px;border-radius:14px;
    background:linear-gradient(135deg,rgba(255,87,178,0.2),rgba(139,92,246,0.2));
    border:1px solid rgba(255,87,178,0.25);
    display:flex;align-items:center;justify-content:center;margin-bottom:1.2rem;
  }
  .modal-icon svg { width:24px;height:24px;stroke:#ff57b2;stroke-width:1.8;fill:none; }
  .modal-title { font-family:'Clash Display',sans-serif;font-size:1.4rem;font-weight:700;color:#fff;margin-bottom:0.4rem; }
  .modal-desc { font-size:13px;color:rgba(255,255,255,0.4);line-height:1.6;margin-bottom:1.5rem;font-weight:300; }
  .modal-actions { display:flex;gap:10px;margin-top:1.2rem; }
  .btn-outline { flex:1;height:44px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:rgba(255,255,255,0.5);font-family:'Cabinet Grotesk',sans-serif;font-size:14px;cursor:pointer;transition:all 0.2s; }
  .btn-outline:hover { background:rgba(255,255,255,0.08); }
  .btn-modal-send { flex:1.5;height:44px;background:linear-gradient(135deg,#ff57b2,#8b5cf6);border:none;border-radius:10px;color:#fff;font-family:'Clash Display',sans-serif;font-size:14px;font-weight:600;cursor:pointer;transition:all 0.2s; }
  .btn-modal-send:hover { box-shadow:0 8px 24px rgba(255,87,178,0.3); }
  .success-state { text-align:center;padding:1rem 0; }
  .success-check { width:60px;height:60px;border-radius:50%;background:rgba(6,214,160,0.1);border:1px solid rgba(6,214,160,0.3);display:flex;align-items:center;justify-content:center;margin:0 auto 1rem; }
  .success-check svg { width:26px;height:26px;stroke:#06d6a0;stroke-width:2;fill:none; }
  .success-title { font-family:'Clash Display',sans-serif;font-size:1.2rem;color:#fff;margin-bottom:0.4rem; }
  .success-desc { font-size:13px;color:rgba(255,255,255,0.4);line-height:1.6; }

  @media(max-width:700px){
    .app-wrapper { grid-template-columns:1fr; }
    .left-panel { display:none; }
    .right-panel { padding:3rem 1.5rem;align-items:flex-start; }
  }
`;

const TAGS = [
  "#ContentCreator","#Viral","#Trending","#Reels","#YouTubeShorts",
  "#TikTok","#GrowthHack","#InstagramMarketing","#CreatorEconomy",
  "#SocialMedia","#AITools","#HashtagStrategy","#DigitalCreator",
  "#ContentStrategy","#BrandCollab"
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
export default function SahayakSignIn({ onSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});



  const validate = () => {
    const e = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email address";
    if (password.length < 8) e.password = "Password must be at least 8 characters";
    return e;
  };
  const navigate=useNavigate();

  const token=localStorage.getItem("token");
  if(token){
    return <Navigate to="/dashboard" replace/>;
  }

  const handleSubmit = async(ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      try{
      setLoading(true);
      const response=await axios.post(`${API_URL}/signin`,{
        email,
        password
      });
    
      localStorage.setItem("token",response.data.token);
        const token=localStorage.getItem("token");
      toast.success(response.data.message);
      navigate("/dashboard")

    }catch(error){
      console.error(error);
      if(error.response){
        toast.error(error.response.data.detail ||"SignIN failed");
      }else{
        toast.error("server error");

      }
    }finally{
      setLoading(false);
    }
  }
  };

  const doubled = [...TAGS, ...TAGS];

  

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
              Create content<br />that actually<br />goes viral.
            </div>
            <div className="hero-sub" style={{ marginBottom: "2rem" }}>
              AI-powered hashtags, titles &amp; captions crafted for your audience — in seconds.
            </div>

            <div className="floating-card">
              <div className="card-icon" style={{ background: "rgba(255,87,178,0.15)" }}>🏷️</div>
              <div>
                <div className="card-label">AI Hashtag Pack</div>
                <div className="card-tags">
                  {["#Trending", "#Viral2025", "#ContentCreator", "#ReelsNow"].map((t) => (
                    <span
                      key={t}
                      className="tag-chip"
                      style={{
                        background: "rgba(255,87,178,0.12)",
                        color: "#ff9de0",
                        border: "1px solid rgba(255,87,178,0.25)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="floating-card">
              <div className="card-icon" style={{ background: "rgba(99,102,241,0.15)" }}>✍️</div>
              <div>
                <div className="card-label">Caption Generated</div>
                <div className="card-value">
                  "This one trick doubled my reach overnight 🔥 Drop a ❤️ if you want part 2!"
                </div>
              </div>
            </div>

            <div className="floating-card">
              <div className="card-icon" style={{ background: "rgba(6,214,160,0.12)" }}>📈</div>
              <div>
                <div className="card-label">Engagement boost</div>
                <div className="card-value">
                  +347% reach in 24 hrs with optimised title suggestions
                </div>
              </div>
            </div>
          </div>

          <div className="scroll-tags-wrapper">
            <div className="scroll-tags-inner">
              {doubled.map((t, i) => (
                <span
                  key={i}
                  className={`scroll-tag ${i % 3 === 0 ? "hot" : i % 3 === 1 ? "cool" : "fresh"}`}
                >
                  {t}
                </span>
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
                Creator Portal
              </div>
              <div className="form-title">Welcome back</div>
              <div className="form-desc">
                Sign in to your Sahayak account and start creating 🚀
              </div>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              {/* Email */}
              <div className="field">
                <label htmlFor="email">Email address</label>
                <div className="input-wrap">
                  <svg className="input-icon" viewBox="0 0 24 24">
                    <rect x="2" y="4" width="20" height="16" rx="3" />
                    <path d="M2 7l10 7 10-7" />
                  </svg>
                  <input
                    id="email"
                    className={`field-input${errors.email ? " has-error" : ""}`}
                    type="email"
                    placeholder="creator@example.com"
                    value={email}
                    autoComplete="email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((v) => ({ ...v, email: "" }));
                    }}
                  />
                </div>
                {errors.email && <div className="error-msg">{errors.email}</div>}
              </div>

              {/* Password */}
              <div className="field">
                <label htmlFor="password">Password</label>
                <div className="input-wrap">
                  <svg className="input-icon" viewBox="0 0 24 24">
                    <rect x="5" y="11" width="14" height="10" rx="2" />
                    <path d="M8 11V7a4 4 0 018 0v4" />
                  </svg>
                  <input
                    id="password"
                    className={`field-input${errors.password ? " has-error" : ""}`}
                    type={showPw ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    autoComplete="current-password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors((v) => ({ ...v, password: "" }));
                    }}
                  />
                  <button
                    type="button"
                    className="pw-toggle"
                    onClick={() => setShowPw((v) => !v)}
                    aria-label="Toggle password visibility"
                  >
                    <EyeIcon open={showPw} />
                  </button>
                </div>
                {errors.password && <div className="error-msg">{errors.password}</div>}
              </div>


              {/* Submit */}
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? (
                  <svg
                    viewBox="0 0 24 24"
                    style={{ animation: "spin-slow 1s linear infinite" }}
                  >
                    <circle cx="12" cy="12" r="10" strokeOpacity="0.3" />
                    <path d="M12 2a10 10 0 0110 10" />
                  </svg>
                ) : null}
                {loading ? (
                  "Signing in…"
                ) : (
                  <>
                    Sign in
                    <svg viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
              {/* Sign up */}
              <div className="signup-row">
                Don't have an account?{" "}
                <button type="button" onClick={()=>navigate("/signup")}>
                  Create one free →
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}
