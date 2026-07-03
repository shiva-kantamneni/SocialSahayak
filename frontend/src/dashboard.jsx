import { Link } from "react-router-dom";
import Layout from "./components/Layout";
import { HISTORY_ITEMS } from "./assets/globals";
import useUser from "./hooks/useUser";

function HistItem({ item }) {
  return (
    <Link to="/dashboard/chat" className="hist-item">
      <div className="hist-icon">
        <i className={`ti ${item.icon}`} aria-hidden="true" />
      </div>
      <div className="hist-info">
        <div className="hist-name">{item.name}</div>
        <div className="hist-date">{item.date}</div>
      </div>
      <i className="ti ti-chevron-right hist-arrow" aria-hidden="true" />
    </Link>
  );
}

export default function Dashboard() {
  const {user}=useUser();
  return (
    <Layout>
      <h1 className="pg-title">Good morning, {user?.name} 👋</h1>
      <p className="pg-sub">Here's what's happening with your Sahayak account.</p>

      <Link to="/dashboard/chat" className="start-chat-btn">
        <i className="ti ti-message-bolt" aria-hidden="true" />
        Start new chat
      </Link>

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
          {HISTORY_ITEMS.slice(0, 2).map((item) => (
            <HistItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
