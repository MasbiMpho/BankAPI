import theme from "../theme/theme";
import s from "../theme/styles";
import Icon from "./Icon";
import { NAV, NAV_ICONS } from "../constants/api";

export default function Sidebar({ page, onNavigate }) {
  return (
    <aside style={s.sidebar}>
      {/* Logo */}
      <div style={s.logo}>
        <div style={s.logoMark}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke={theme.gold}
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        </div>
        <div style={s.logoText}>BankAPI</div>
        <div style={s.logoSub}>Management Console</div>
      </div>

      {/* Nav links */}
      <nav>
        {NAV.map((item) => (
          <div
            key={item}
            style={s.navItem(page === item)}
            onClick={() => onNavigate(item)}
            onMouseEnter={(e) => {
              if (page !== item) {
                e.currentTarget.style.background = theme.surfaceHover;
                e.currentTarget.style.color = theme.text;
              }
            }}
            onMouseLeave={(e) => {
              if (page !== item) {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = theme.muted;
              }
            }}
          >
            <Icon name={NAV_ICONS[item]} />
            {item}
          </div>
        ))}
      </nav>

      {/* Status footer */}
      <div
        style={{
          marginTop: "auto",
          padding: "1rem 1.5rem",
          borderTop: `1px solid ${theme.border}`,
        }}
      >
        <div style={{ fontSize: 11, color: theme.muted, lineHeight: 1.6 }}>
          <div
            style={{
              color: theme.success,
              marginBottom: 4,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: theme.success,
              }}
            />
            API connected
          </div>
          localhost:8080
        </div>
      </div>
    </aside>
  );
}