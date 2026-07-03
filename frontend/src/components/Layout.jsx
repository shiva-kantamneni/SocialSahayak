import { Link, useLocation, useNavigate } from "react-router-dom";
import { GLOBAL_STYLES } from "../assets/globals";

const NAV = [
  { path: "/dashboard",         icon: "ti-layout-dashboard", label: "Dashboard" },
  { path: "/dashboard/chat",    icon: "ti-message-bolt",     label: "Chat"      },
  { path: "/dashboard/history", icon: "ti-history",          label: "History"   },
  { path: "/dashboard/profile", icon: "ti-user",             label: "Profile"   },
];

export default function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/",{replace:true});
  }

  return (
    <>
      <style>{GLOBAL_STYLES}</style>
      <div className="db-root">
        {/* Sidebar */}
        <div className="sb">
          <Link to="/dashboard" className="logo">
            <div className="logo-box">AI</div>
            <h2>Sahayak</h2>
          </Link>

          <nav className="nav">
            {NAV.map((n) => (
              <Link
                key={n.path}
                to={n.path}
                className={`nav-btn${location.pathname === n.path ? " active" : ""}`}
              >
                <i className={`ti ${n.icon}`} aria-hidden="true" />
                <span>{n.label}</span>
              </Link>
            ))}
          </nav>

          <button className="nav-logout" onClick={handleLogout}>
            <i className="ti ti-logout" aria-hidden="true" />
            <span>Logout</span>
          </button>
        </div>

        {/* Page content */}
        <div className="main">{children}</div>
      </div>
    </>
  );
}
