import { useState, useEffect } from "react";
import theme from "../theme/theme";
import s from "../theme/styles";
import Icon from "../components/Icon";
import { API } from "../constants/api";

export default function QuickStats({ onNavigate }) {
  const [count, setCount] = useState(null);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    fetch(`${API}/users`)
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        setCount(data.length);
        const sum = data.reduce((a, b) => a + parseFloat(b.balance || 0), 0);
        setTotal(
          sum.toLocaleString("en-ZA", {
            style: "currency",
            currency: "ZAR",
            maximumFractionDigits: 0,
          })
        );
      })
      .catch(() => {
        setCount(0);
        setTotal("R 0");
      });
  }, []);

  const statCards = [
    {
      label: "Total Accounts",
      value: count === null ? "—" : count,
      icon: "users",
      action: () => onNavigate("Accounts"),
    },
    {
      label: "Total Deposits",
      value: total === null ? "—" : total,
      icon: "bank",
    },
    { label: "Account Type", value: "Savings", icon: "shield" },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "1rem",
      }}
    >
      {statCards.map(({ label, value, icon, action }) => (
        <div
          key={label}
          style={{ ...s.card, cursor: action ? "pointer" : "default" }}
          onClick={action}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 14,
            }}
          >
            <span style={{ ...s.label, marginBottom: 0 }}>{label}</span>
            <div style={{ color: theme.gold, opacity: 0.7 }}>
              <Icon name={icon} />
            </div>
          </div>
          <div
            style={{
              fontSize: 26,
              fontWeight: 600,
              fontFamily: "'Playfair Display', serif",
              color: theme.text,
              letterSpacing: "-0.02em",
            }}
          >
            {value === "—" ? (
              <span
                style={{
                  animation: "pulse 1.2s infinite",
                  display: "inline-block",
                }}
              >
                —
              </span>
            ) : (
              value
            )}
          </div>
        </div>
      ))}
    </div>
  );
}