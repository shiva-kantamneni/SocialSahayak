import { Link } from "react-router-dom";
import Layout from "./components/Layout";
import { useEffect,useState } from "react";
import useHistory from "./hooks/useHistory";



export default function History() {
  const {history}=useHistory();

  
  return (
    <Layout>
      <h1 className="pg-title">History</h1>
      <p className="pg-sub">All your previous AI sessions.</p>
      <div className="hist-list">
       {history.map((chat) => {  

        
  return (
    <Link
      key={chat._id}
      to={`/dashboard/chat/${chat._id}`}
      className="hist-item"
    >
      <div className="hist-icon">
        <i className="ti ti-message" />
      </div>

      <div className="hist-info">
        <div className="hist-name">
          {chat.title}
        </div>

        <div className="hist-date">
          {new Date(chat.updated_at).toLocaleString()}
        </div>
      </div>

      <i className="ti ti-chevron-right hist-arrow" />
    </Link>
  );
})}
      </div>
    </Layout>
  );
}
