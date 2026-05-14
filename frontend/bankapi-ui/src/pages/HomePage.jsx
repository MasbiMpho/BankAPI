import { useState, useEffect } from "react";
import theme from "../theme/theme";
import s from "../theme/styles";
import Icon from "../components/Icon";
import Spinner from "../components/Spinner";
import QuickStats from "./QuickStats";
import { API } from "../constants/api";

export default function HomePage({ onNavigate }) {
  const [welcome, setWelcome] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/`)
      .then((r) => r.text())
      .then(setWelcome)
      .catch(() => setWelcome("Welcome to the Bank API"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ animation: "fadeUp 0.4s ease" }}>
      {/* Hero */}
      <div
        style={{
          ...s.card,
          padding: "3.5rem 3rem",
          marginBottom: "2rem",
          position: "relative",
          overflow: "hidden",
          border: `1px solid ${theme.gold}30`,
        }}
      >
        {/* Glow orb */}
        <div
          style={{
            position: "absolute",
            top: -60,
            right: -60,
            width: 260,
            height: 260,
            borderRadius: "50%",
            background: theme.goldPale,
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />
        {/* Bottom line accent */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${theme.gold}50, transparent)`,
          }}
        />

        {/* Badge row */}
        <div
          style={{
            marginBottom: "1rem",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: theme.goldPale,
              border: `1.5px solid ${theme.gold}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: theme.gold,
            }}
          >
            <Icon name="bank" />
          </div>
          <span
            style={{
              fontSize: 11,
              color: theme.gold,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            Bank API — v1.0
          </span>
        </div>

        {/* Welcome headline from API */}
        {loading ? (
          <div style={{ height: 64, display: "flex", alignItems: "center" }}>
            <Spinner />
          </div>
        ) : (
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              color: theme.text,
              lineHeight: 1.15,
              marginBottom: "1rem",
              letterSpacing: "-0.01em",
            }}
          >
            {welcome}
          </h1>
        )}

        <p
          style={{
            fontSize: 15,
            color: theme.muted,
            maxWidth: 520,
            lineHeight: 1.75,
            marginBottom: "2rem",
            fontWeight: 300,
          }}
        >
          Manage accounts, process deposits, and access account data through a
          secure REST interface. Built with Spring Boot · PostgreSQL · Swagger
          UI.
        </p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button style={s.btn("primary")} onClick={() => onNavigate("Accounts")}>
            <Icon name="users" /> View Accounts
          </button>
          <button style={s.btn("ghost")} onClick={() => onNavigate("New Account")}>
            <Icon name="plus" /> Create Account
          </button>
        </div>
      </div>

      {/* Stats row */}
      <QuickStats onNavigate={onNavigate} />

      {/* Endpoint reference */}
      <div style={{ ...s.card, marginTop: "1.25rem" }}>
        <h3
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 17,
            fontWeight: 600,
            marginBottom: "1.25rem",
            color: theme.text,
          }}
        >
          API Endpoints
        </h3>
        <div style={{ display: "grid", gap: 10 }}>
          {[
            { method: "GET",    path: "/users",                          desc: "Fetch all accounts" },
            { method: "GET",    path: "/user/{id}",                      desc: "Account by ID" },
            { method: "GET",    path: "/account-number?accountNumber=…", desc: "Account by number" },
            { method: "POST",   path: "/create-account",                 desc: "Create new account" },
            { method: "PUT",    path: "/update-account/{id}",            desc: "Deposit / update balance" },
            { method: "DELETE", path: "/delete-account/{id}",            desc: "Delete account" },
          ].map(({ method, path, desc }) => (
            <div
              key={path}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "0.6rem 0.9rem",
                borderRadius: 8,
                background: theme.bg,
                border: `1px solid ${theme.border}`,
              }}
            >
              <span
                style={{
                  fontSize: 10.5,
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  padding: "3px 8px",
                  borderRadius: 5,
                  background:
                    method === "GET"    ? `${theme.info}18`    :
                    method === "POST"   ? `${theme.success}18` :
                    method === "PUT"    ? `${theme.gold}18`    :
                                         `${theme.danger}18`,
                  color:
                    method === "GET"    ? theme.info    :
                    method === "POST"   ? theme.success :
                    method === "PUT"    ? theme.gold    :
                                         theme.danger,
                  minWidth: 50,
                  textAlign: "center",
                }}
              >
                {method}
              </span>
              <code
                style={{
                  fontSize: 13,
                  color: theme.muted,
                  fontFamily: "monospace",
                  flex: 1,
                }}
              >
                {path}
              </code>
              <span style={{ fontSize: 12.5, color: theme.muted }}>{desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}