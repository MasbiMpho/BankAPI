import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function DeleteAccountPage() {
    
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8080/delete-account/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete account");
      }

      const result = await response.json();
      setMessage(`Account ${id} deleted successfully!`);

      setTimeout(() => navigate("/accounts"), 2000);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Delete Account ID: {id}</h2>
      <p>Are you sure you want to delete this account?</p>
      <button
        onClick={handleDelete}
        style={{ background: "red", color: "white", padding: "8px 16px" }}
      >
        Confirm Delete
      </button>
      {message && <p>{message}</p>}
    </div>
  );  
}
