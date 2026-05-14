import React, {useEffect, useState} from "react";
import Icon from "../Components/Icon";
import Spinner from "../Components/Spinner";
import QuickStats from "./Quickstats";
import { API } from "../Api/connection";


const ENDPOINTS = [
  { method: "GET",    path: "/users",                          desc: "Fetch all accounts" },
  { method: "GET",    path: "/user/{id}",                      desc: "Account by ID" },
  { method: "GET",    path: "/account-number?accountNumber=…", desc: "Account by number" },
  { method: "POST",   path: "/create-account",                 desc: "Create new account" },
  { method: "PUT",    path: "/update-account/{id}",            desc: "Deposit / update balance" },
  { method: "DELETE", path: "/delete-account/{id}",            desc: "Delete account" },
];

export default function WelcomePage() {
    const [message, setMessage] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        API()
          .then((response) => {
            console.log("API Response:", response.data);
            setMessage(response.data);
          })
          .catch((error) => console.error("Error fetching data:", error));
      }, []);

  return (

      <div style={{ padding: "2rem", textAlign: "center" }}>
          <h1>{message}</h1>
      

     <div className="page">
      {/* Hero */}
      <div className="hero">
        <div className="hero__glow" />
        <div className="hero__line" />
 
        <div className="hero__badge-row">
          <div className="hero__icon"><Icon name="bank" /></div>
          <span className="hero__tag">Bank API — v1.0</span>
        </div>
 
        {loading ? (
          <Spinner />
        ) : (
          <h1 className="hero__title">{message}</h1>
        )}
 
        <p className="hero__desc">
          Manage accounts, process deposits, and access account data through a
          secure REST interface. Built with Spring Boot · PostgreSQL · Swagger UI.
        </p>
 
        <div className="hero__actions">
          <button className="btn" onClick={() => onNavigate("Accounts")}>
            <Icon name="users" /> View Accounts
          </button>
          <button className="btn btn--ghost" onClick={() => onNavigate("New Account")}>
            <Icon name="plus" /> Create Account
          </button>
        </div>
      </div>
 
      {/* Stats row */}
      {/* { <QuickStats onNavigate={onNavigate} />} */}
 
      {/* Endpoint reference */}
      <div className="endpoints-section">
        <h3 className="endpoints-section__title">API Endpoints</h3>
        <div className="endpoints-list">
          {ENDPOINTS.map(({ method, path, desc }) => (
            <div key={path} className="endpoint-row">
              <span className={`method-badge method-badge--${method.toLowerCase()}`}>
                {method}
              </span>
              <code className="endpoint-row__path">{path}</code>
              <span className="endpoint-row__desc">{desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}