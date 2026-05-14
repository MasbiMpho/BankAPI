import { useState } from "react";
import theme from "../theme/theme";
import s from "../theme/styles";
import Icon from "../components/Icon";
import Spinner from "../components/Spinner";
import { API } from "../constants/api";

export default function SearchPage({ toast }) {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState("id");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResult(null);
    setNotFound(false);

    const url =
      mode === "id"
        ? `${API}/user/${query}`
        : `${API}/account-number?accountNumber=${encodeURIComponent(query)}`;

    const r = await fetch(url);
    if (r.ok) {
      setResult(await r.json());
    } else {
      setNotFound(true);
      toast("Account not found", "error");
    }
    setLoading(false);
  };

  const switchMode = (m) => {
    setMode(m);
    setResult(null);
    setQuery("");
    setNotFound(false);
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
        Search Account
      </h2>
      <p style={{ fontSize: 13, color: theme.muted, marginBottom: "2rem" }}>
        Look up an account by ID or account number.
      </p>

      <div style={s.card}>
        {/* Mode toggle */}
        <div style={{ display: "flex", gap: 8, marginBottom: "1.25rem" }}>
          {["id", "accountNumber"].map((m) => (
            <button
              key={m}
              style={{ ...s.btn(mode === m ? "primary" : "ghost"), fontSize: 12.5 }}
              onClick={() => switchMode(m)}
            >
              {m === "id" ? "By ID" : "By Account No."}
            </button>
          ))}
        </div>

        <label style={s.label}>
          {mode === "id" ? "Account ID" : "Account Number"}
        </label>
        <div style={{ display: "flex", gap: 10 }}>
          <input
            style={s.input}
            placeholder={mode === "id" ? "e.g. 1" : "e.g. 123456789"}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            onFocus={(e) => { e.target.style.borderColor = theme.gold; }}
            onBlur={(e)  => { e.target.style.borderColor = theme.border; }}
          />
          <button
            style={{ ...s.btn(), whiteSpace: "nowrap" }}
            onClick={handleSearch}
            disabled={loading}
          >
            <Icon name="search" /> {loading ? "…" : "Search"}
          </button>
        </div>
      </div>

      {loading && (
        <div style={{ marginTop: "1rem" }}>
          <Spinner />
        </div>
      )}

      {/* Result card */}
      {result && (
        <div
          style={{
            ...s.card,
            marginTop: "1.25rem",
            animation: "fadeUp 0.3s ease",
            border: `1px solid ${theme.gold}30`,
          }}
        >
          {/* Account header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: "1.25rem",
              paddingBottom: "1rem",
              borderBottom: `1px solid ${theme.border}`,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: theme.goldPale,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                fontWeight: 700,
                fontFamily: "'Playfair Display', serif",
                color: theme.gold,
              }}
            >
              {result.userName?.charAt(0).toUpperCase()}
            </div>
            <div>
              <div style={{ fontWeight: 500, fontSize: 16, color: theme.text }}>
                {result.userName}
              </div>
              <div style={{ fontSize: 12, color: theme.muted }}>ID #{result.id}</div>
            </div>
            <div style={{ marginLeft: "auto" }}>
              <span style={s.badge(result.status)}>{result.status}</span>
            </div>
          </div>

          {/* Account details */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0.9rem 1.5rem",
              fontSize: 13.5,
            }}
          >
            {[
              ["Account Number", result.accountNumber],
              ["Account Type",   result.accountType],
              [
                "Balance",
                `R ${parseFloat(result.balance || 0).toLocaleString("en-ZA", {
                  minimumFractionDigits: 2,
                })}`,
              ],
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
                <div
                  style={{
                    fontWeight: 500,
                    color: k === "Balance" ? theme.gold : theme.text,
                    fontFamily: k === "Balance" ? "'Playfair Display', serif" : "inherit",
                    fontSize: k === "Balance" ? 17 : 14,
                  }}
                >
                  {v}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Not found state */}
      {notFound && !loading && (
        <div
          style={{
            marginTop: "1.25rem",
            padding: "1.5rem",
            textAlign: "center",
            color: theme.danger,
            background: `${theme.danger}0A`,
            border: `1px solid ${theme.danger}25`,
            borderRadius: 12,
            fontSize: 14,
            animation: "fadeUp 0.3s ease",
          }}
        >
          No account found for {mode === "id" ? "ID" : "account number"}{" "}
          <strong>{query}</strong>
        </div>
      )}
    </div>
  );
}