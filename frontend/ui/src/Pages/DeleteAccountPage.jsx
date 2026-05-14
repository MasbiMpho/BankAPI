import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function DeleteAccountPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/delete-account/${id}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Failed to delete account");
      }

  
      setMessage(`Account ${id} deleted successfully`);

      setTimeout(() => navigate("/users"), 500);
    } catch (error) {
      console.error("Delete error:", error);
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