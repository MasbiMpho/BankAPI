import { useState } from "react";

export default function CreateAccountPage() {
  const [formData, setFormData] = useState({ name: "", deposit: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedDeposit = Number(formData.deposit).toFixed(2);

    try {
      const response = await fetch(
        `http://localhost:8080/create-account?userName=${encodeURIComponent(
          formData.name
        )}&deposit=${formattedDeposit}`,
        { method: "POST" }
      );

      if (!response.ok) {
        throw new Error("Failed to create account");
      }

      const result = await response.json();

      setMessage(
        `Account created: ${result.userName} | ID: ${result.userId} | Account #: ${result.accountNumber}`
      );
      console.log("Account created:", result);
    } catch (error) {
      setMessage(`Error creating account: ${error.message}`);
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Create Account</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Enter your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          name="deposit"
          placeholder="Initial Deposit"
          value={formData.deposit}
          onChange={handleChange}
          required
        />

        <button type="submit">Create Account</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}