// import "./Sidebar.css";
import Icon from "./Icon";
import { NAV, NAV_ICONS } from "../Api/connection";

export default function Sidebar({ page, onNavigate }) {
  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo__mark">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        </div>
        <div className="sidebar-logo__text">BankAPI</div>
        <div className="sidebar-logo__sub">Management Console</div>
      </div>

      {/* Nav links */}
      <nav>
        {NAV.map((item) => (
          <div
            key={item}
            className={`sidebar-nav-item${page === item ? " sidebar-nav-item--active" : ""}`}
            onClick={() => onNavigate(item)}
          >
            <Icon name={NAV_ICONS[item]} />
            {item}
          </div>
        ))}
      </nav>

      {/* Status footer */}
      <div className="sidebar-footer">
        <div className="sidebar-footer__status">
          <div className="sidebar-footer__dot" />
          API connected
        </div>
        localhost:8080
      </div>
    </aside>
  );
}