import { useState, useEffect, useCallback } from "react";
import theme from "../theme/theme";
import s from "../theme/styles";
import Icon from "../components/Icon";
import Spinner from "../components/Spinner";
import { API } from "../constants/api";

export default function AccountsPage({ toast }) {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [depositAmt, setDepositAmt] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    fetch(`${API}/users`)
      .then((r) => (r.ok ? r.json() : []))
      .then(setAccounts)
      .catch(() => setAccounts([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this account? This cannot be undone.")) return;
    const r = await fetch(`${API}/delete-account/${id}`, { method: "DELETE" });
    if (r.ok) {
      toast("Account deleted", "success");
      load();
    } else {
      toast("Failed to delete account", "error");
    }
  };

  const handleDeposit = async (id) => {
    if (!depositAmt || isNaN(depositAmt)) return;
    setSubmitting(true);
    const r = await fetch(`${API}/update-account/${id}?balance=${depositAmt}`, {
      method: "PUT",
    });
    if (r.ok) {
      toast(`Deposited R ${parseFloat(depositAmt).toLocaleString()}`, "success");
      setEditId(null);
      setDepositAmt("");
      load();
    } else {
      toast("Failed to update account", "error");
    }
    setSubmitting(false);
  };

  const HEADERS = ["ID", "Username", "Account No.", "Type", "Balance", "Status", "Actions"];

  return (
    <div style={{ animation: "fadeUp 0.4s ease" }}>
      {/* Page header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.75rem",
        }}
      >
        <div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 26,
              fontWeight: 700,
              color: theme.text,
            }}
          >
            Accounts
          </h2>
          <p style={{ fontSize: 13, color: theme.muted, marginTop: 4 }}>
            {accounts.length} account{accounts.length !== 1 ? "s" : ""} registered
          </p>
        </div>
        <button style={s.btn()} onClick={load}>
          <Icon name="search" /> Refresh
        </button>
      </div>

      <div style={s.card}>
        {loading ? (
          <Spinner />
        ) : accounts.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "3rem",
              color: theme.muted,
            }}
          >
            <div style={{ fontSize: 32, marginBottom: 12, opacity: 0.4 }}>⊘</div>
            No accounts found
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5 }}>
              <thead>
                <tr>
                  {HEADERS.map((h) => (
                    <th
                      key={h}
                      style={{
                        textAlign: "left",
                        padding: "0.6rem 0.85rem",
                        fontSize: 11,
                        color: theme.muted,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        fontWeight: 500,
                        borderBottom: `1px solid ${theme.border}`,
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {accounts.map((acc) => (
                  <>
                    <tr
                      key={acc.id}
                      style={{
                        borderBottom: `1px solid ${theme.border}30`,
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = theme.surfaceHover)
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "transparent")
                      }
                    >
                      <td style={{ padding: "0.8rem 0.85rem", color: theme.muted }}>
                        {acc.id}
                      </td>
                      <td
                        style={{
                          padding: "0.8rem 0.85rem",
                          fontWeight: 500,
                          color: theme.text,
                        }}
                      >
                        {acc.userName}
                      </td>
                      <td style={{ padding: "0.8rem 0.85rem" }}>
                        <code
                          style={{
                            fontSize: 12.5,
                            color: theme.muted,
                            fontFamily: "monospace",
                            background: theme.bg,
                            padding: "2px 8px",
                            borderRadius: 5,
                          }}
                        >
                          {acc.accountNumber}
                        </code>
                      </td>
                      <td style={{ padding: "0.8rem 0.85rem" }}>
                        <span style={s.badge(acc.accountType)}>{acc.accountType}</span>
                      </td>
                      <td style={{ padding: "0.8rem 0.85rem" }}>
                        <span
                          style={{
                            fontWeight: 600,
                            fontFamily: "'Playfair Display', serif",
                            color: theme.gold,
                          }}
                        >
                          R{" "}
                          {parseFloat(acc.balance || 0).toLocaleString("en-ZA", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      </td>
                      <td style={{ padding: "0.8rem 0.85rem" }}>
                        <span style={s.badge(acc.status)}>{acc.status}</span>
                      </td>
                      <td style={{ padding: "0.8rem 0.85rem" }}>
                        <div style={{ display: "flex", gap: 8 }}>
                          <button
                            style={s.btn("sm")}
                            onClick={() => {
                              setEditId(editId === acc.id ? null : acc.id);
                              setDepositAmt("");
                            }}
                          >
                            <Icon name="edit" />
                          </button>
                          <button
                            style={s.btn("danger")}
                            onClick={() => handleDelete(acc.id)}
                          >
                            <Icon name="trash" />
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Inline deposit row */}
                    {editId === acc.id && (
                      <tr key={`edit-${acc.id}`} style={{ background: theme.goldPale }}>
                        <td colSpan={7} style={{ padding: "0.9rem 0.85rem" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <span
                              style={{
                                fontSize: 12,
                                color: theme.gold,
                                letterSpacing: "0.06em",
                                textTransform: "uppercase",
                              }}
                            >
                              Deposit amount (R)
                            </span>
                            <input
                              style={{ ...s.input, width: 160, background: theme.surface }}
                              type="number"
                              placeholder="500.00"
                              value={depositAmt}
                              onChange={(e) => setDepositAmt(e.target.value)}
                            />
                            <button
                              style={s.btn()}
                              onClick={() => handleDeposit(acc.id)}
                              disabled={submitting}
                            >
                              {submitting ? "…" : "Confirm Deposit"}
                            </button>
                            <button
                              style={s.btn("ghost")}
                              onClick={() => setEditId(null)}
                            >
                              Cancel
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}