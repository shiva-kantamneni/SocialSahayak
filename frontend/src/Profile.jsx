
import Layout from "./components/Layout";
import useUser from "./hooks/useUser";

export default function Profile() {
  const {user}=useUser();


  return (

    <Layout>
      <h1 className="pg-title">Profile</h1>
      <p className="pg-sub">Manage your account details.</p>

      <div className="card">
        <div className="avatar">{user?.name?.charAt(0).toUpperCase()}</div>
        <div className="prof-name">{user?.name}</div>
        <div className="prof-badge">Free plan</div>

        <div className="prof-fields">
          <div className="prof-field">
            <span className="pf-label">
              <i className="ti ti-mail" aria-hidden="true" />
              Email
            </span>
            <span className="pf-val">{user?.email}</span>
          </div>
          <div className="prof-field">
            <span className="pf-label">
              <i className="ti ti-crown" aria-hidden="true" />
              Plan
            </span>
            <span className="pf-val pf-upgrade">Free → Upgrade</span>
          </div>
        </div>
      </div>
    </Layout>
  );
}
