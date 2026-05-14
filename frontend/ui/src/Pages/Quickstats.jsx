import { useState, useEffect } from "react";
// import "./QuickStats.css";
import Icon from "../Components/Icon";
import { API } from "../Api/connection";

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
      .catch(() => { setCount(0); setTotal("R 0"); });
  }, []);

  const statCards = [
    { label: "Total Accounts", value: count === null ? "—" : count,  icon: "users", action: () => onNavigate("Accounts") },
    { label: "Total Deposits", value: total === null ? "—" : total,  icon: "bank" },
    { label: "Account Type",   value: "Savings",                     icon: "shield" },
  ];

  return (
    <div className="quick-stats">
      {statCards.map(({ label, value, icon, action }) => (
        <div
          key={label}
          className={`stat-card${action ? " stat-card--clickable" : ""}`}
          onClick={action}
        >
          <div className="stat-card__header">
            <span className="stat-card__label">{label}</span>
            <div className="stat-card__icon"><Icon name={icon} /></div>
          </div>
          <div className="stat-card__value">
            {value === "—" ? (
              <span className="stat-card__value--loading">—</span>
            ) : (
              value
            )}
          </div>
        </div>
      ))}
    </div>
  );
}