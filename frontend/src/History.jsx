import { Link } from "react-router-dom";
import Layout from "./components/Layout";
import { HISTORY_ITEMS } from "./assets/globals";


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

export default function History() {
  return (
    <Layout>
      <h1 className="pg-title">History</h1>
      <p className="pg-sub">All your previous AI sessions.</p>

      <div className="hist-list">
        {HISTORY_ITEMS.map((item) => (
          <HistItem key={item.id} item={item} />
        ))}
      </div>
    </Layout>
  );
}
