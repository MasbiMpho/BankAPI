import { useEffect } from "react";
import theme from "../theme/theme";

export default function Toast({ msg, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 28,
        right: 28,
        zIndex: 999,
        background: theme.surface,
        border: `1px solid ${type === "error" ? theme.danger : theme.success}50`,
        borderRadius: 10,
        padding: "0.8rem 1.25rem",
        display: "flex",
        alignItems: "center",
        gap: 10,
        fontSize: 13.5,
        color: type === "error" ? theme.danger : theme.success,
        animation: "fadeUp 0.25s ease",
        minWidth: 220,
        boxShadow: "0 8px 32px #00000060",
      }}
    >
      <span>{type === "error" ? "✕" : "✓"}</span>
      {msg}
    </div>
  );
}