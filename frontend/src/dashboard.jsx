import { Link } from "react-router-dom";
import Layout from "./components/Layout";
import useUser from "./hooks/useUser";
import { useEffect,useState } from "react";
import useHistory from "./hooks/useHistory";

export default function Dashboard() {
  const {user}=useUser();
  const {history}=useHistory();

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
          <div className="stat-val">{history.length}</div>
          <div className="stat-label">Total chats</div>
        </div>
        <div className="stat">
          <div className="stat-val">Free</div>
          <div className="stat-label">Current plan</div>
        </div>
      </div>

      <div className="card">
        <div className="card-title">Recent sessions</div>
        <div className="hist-list">
          {history.slice(0, 2).map((chat) => (
            <Link 
              key={chat._id}
              to={`/dashboard/chat/${chat._id}`}
              className="hist-item"
              >
                <div className="hist-icon">
                  <i className="ti ti-message"/>
                </div>
                <div className="hist-info">
                  <div className="hist-name">
                    {chat.title}
                  </div>
                  <div className="hist-date">
                  {new Date(chat.updated_at).toLocaleString()}
                </div>

                </div>
                <i className="ti ti-chevron-right hist-arrow"/>

              </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
