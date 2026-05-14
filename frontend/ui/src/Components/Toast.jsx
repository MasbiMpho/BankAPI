import { useEffect } from "react";
// import "./Toast.css";

export default function Toast({ msg, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className={`toast toast--${type}`}>
      <span>{type === "error" ? "✕" : "✓"}</span>
      {msg}
    </div>
  );
}