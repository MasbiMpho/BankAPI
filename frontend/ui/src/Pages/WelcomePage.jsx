import React, {useEffect, useState} from "react";
import "../Theme/globalStyles";
import "../Theme/styles";
import "../Theme/theme";
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
      </div>

  );
}