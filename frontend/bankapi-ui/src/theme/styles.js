import theme from "./theme";

const s = {
  app: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "'DM Sans', sans-serif",
  },
  sidebar: {
    width: 220,
    minHeight: "100vh",
    background: theme.surface,
    borderRight: `1px solid ${theme.border}`,
    display: "flex",
    flexDirection: "column",
    padding: "2rem 0",
    position: "fixed",
    top: 0,
    left: 0,
    bottom: 0,
    zIndex: 100,
  },
  logo: {
    padding: "0 1.5rem 2rem",
    borderBottom: `1px solid ${theme.border}`,
    marginBottom: "1.5rem",
  },
  logoMark: {
    width: 38,
    height: 38,
    background: theme.goldPale,
    border: `1.5px solid ${theme.gold}`,
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  logoText: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 17,
    fontWeight: 600,
    color: theme.text,
    letterSpacing: "0.02em",
  },
  logoSub: {
    fontSize: 10,
    color: theme.muted,
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    marginTop: 2,
  },
  navItem: (active) => ({
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "0.65rem 1.5rem",
    cursor: "pointer",
    fontSize: 13.5,
    fontWeight: active ? 500 : 400,
    color: active ? theme.gold : theme.muted,
    background: active ? theme.goldPale : "transparent",
    borderLeft: active ? `2px solid ${theme.gold}` : "2px solid transparent",
    transition: "all 0.18s ease",
    letterSpacing: "0.01em",
  }),
  main: {
    marginLeft: 220,
    flex: 1,
    minHeight: "100vh",
    padding: "2.5rem 3rem",
  },
  card: {
    background: theme.surface,
    border: `1px solid ${theme.border}`,
    borderRadius: 14,
    padding: "1.75rem",
    marginBottom: "1.25rem",
  },
  btn: (variant = "primary") => ({
    display: "inline-flex",
    alignItems: "center",
    gap: 7,
    padding: variant === "sm" ? "0.45rem 1rem" : "0.7rem 1.5rem",
    borderRadius: 8,
    border:
      variant === "danger"
        ? `1px solid ${theme.danger}40`
        : `1px solid ${theme.gold}50`,
    background:
      variant === "danger"
        ? `${theme.danger}15`
        : variant === "ghost"
        ? "transparent"
        : theme.goldPale,
    color:
      variant === "danger"
        ? theme.danger
        : variant === "ghost"
        ? theme.muted
        : theme.gold,
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
    letterSpacing: "0.02em",
    transition: "all 0.16s ease",
    fontFamily: "'DM Sans', sans-serif",
  }),
  input: {
    background: theme.bg,
    border: `1px solid ${theme.border}`,
    borderRadius: 8,
    padding: "0.65rem 1rem",
    color: theme.text,
    fontSize: 14,
    outline: "none",
    width: "100%",
    fontFamily: "'DM Sans', sans-serif",
    transition: "border-color 0.16s",
  },
  label: {
    fontSize: 11.5,
    color: theme.muted,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    fontWeight: 500,
    marginBottom: 7,
    display: "block",
  },
  badge: (type) => ({
    display: "inline-flex",
    padding: "3px 10px",
    borderRadius: 20,
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: "0.04em",
    background:
      type === "ACTIVE"
        ? `${theme.success}18`
        : type === "SAVINGS"
        ? theme.goldPale
        : `${theme.muted}18`,
    color:
      type === "ACTIVE"
        ? theme.success
        : type === "SAVINGS"
        ? theme.gold
        : theme.muted,
    border: `1px solid ${
      type === "ACTIVE"
        ? theme.success + "40"
        : type === "SAVINGS"
        ? theme.gold + "40"
        : theme.muted + "30"
    }`,
  }),
};

export default s;