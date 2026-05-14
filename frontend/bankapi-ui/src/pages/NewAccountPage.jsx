import { useState } from "react";
import theme from "../theme/theme";
import s from "../theme/styles";
import Icon from "../components/Icon";
import { API } from "../constants/api";

const FIELDS = [
  { key: "userName", label: "Full Name",            placeholder: "e.g. Jane Smith", type: "text"   },
  { key: "deposit",  label: "Opening Deposit (R)",  placeholder: "e.g. 1000.00",    type: "number" },
];

export default function NewAccountPage({ toast }) {
  const [form, setForm] = useState({ userName: "", deposit: "" });
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState(null);

  const handleSubmit = async () => {
    if (!form.userName.trim() || !form.deposit) {
      toast("Please fill in all fields", "error");
      return;
    }
    setLoading(true);
    const r = await fetch(
      `${API}/create-account?userName=${encodeURIComponent(form.userName)}&deposit=${form.deposit}`,
      { method: "POST" }
    );
    if (r.ok) {
      const data = await r.json();
      setCreated(data);
      toast("Account created successfully!", "success");
      setForm({ userName: "", deposit: "" });
    } else {
      toast("Failed to create account", "error");
    }
    setLoading(false);
  };

  return (
    <div style={{ animation: "fadeUp 0.4s ease", maxWidth: 560 }}>
      <h2
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 26,
          fontWeight: 700,
          color: theme.text,
          marginBottom: 6,
        }}
      >
        New Account
      </h2>
      <p style={{ fontSize: 13, color: theme.muted, marginBottom: "2rem" }}>
        Open a new savings account with an initial deposit.
      </p>

      <div style={s.card}>
        {FIELDS.map(({ key, label, placeholder, type }) => (
          <div key={key} style={{ marginBottom: "1.25rem" }}>
            <label style={s.label}>{label}</label>
            <input
              style={s.input}
              type={type}
              placeholder={placeholder}
              value={form[key]}
              onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
              onFocus={(e) => { e.target.style.borderColor = theme.gold; }}
              onBlur={(e)  => { e.target.style.borderColor = theme.border; }}
            />
          </div>
        ))}

        {/* Account type note */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            paddingTop: 8,
            borderTop: `1px solid ${theme.border}`,
            marginTop: "0.5rem",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: theme.gold,
              flexShrink: 0,
            }}
          />
          <span style={{ fontSize: 12, color: theme.muted }}>
            Account type will be set to{" "}
            <strong style={{ color: theme.gold }}>Savings</strong> · Status:{" "}
            <strong style={{ color: theme.success }}>Active</strong>
          </span>
        </div>

        <button
          style={{
            ...s.btn(),
            marginTop: "1.5rem",
            width: "100%",
            justifyContent: "center",
            padding: "0.85rem",
            fontSize: 14,
            animation: "goldGlow 2.5s infinite",
          }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Creating…" : "Open Account"}{" "}
          {!loading && <Icon name="plus" />}
        </button>
      </div>

      {/* Created account confirmation */}
      {created && (
        <div
          style={{
            ...s.card,
            marginTop: "1.25rem",
            border: `1px solid ${theme.success}40`,
            animation: "fadeUp 0.3s ease",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: "1rem",
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: `${theme.success}18`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: theme.success,
                fontSize: 16,
              }}
            >
              ✓
            </div>
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 16,
                color: theme.success,
              }}
            >
              Account Created
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0.75rem 1.5rem",
              fontSize: 13.5,
            }}
          >
            {[
              ["ID",          created.id],
              ["Name",        created.userName],
              ["Account No.", created.accountNumber],
              ["Balance",     `R ${parseFloat(created.balance).toLocaleString("en-ZA", { minimumFractionDigits: 2 })}`],
              ["Type",        created.accountType],
              ["Status",      created.status],
            ].map(([k, v]) => (
              <div key={k}>
                <div
                  style={{
                    fontSize: 10.5,
                    color: theme.muted,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: 3,
                  }}
                >
                  {k}
                </div>
                <div style={{ fontWeight: 500, color: theme.text }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}