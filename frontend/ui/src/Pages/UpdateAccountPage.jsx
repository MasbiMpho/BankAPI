import { useState } from "react";
import { useParams } from "react-router-dom";

export default function UpdateAccountPage() {
    const { id } = useParams();
    const [deposit, setDeposit] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const forrmattedDeposit = parseFloat(deposit).toFixed(2);

        try {
            const response = await fetch(`http://localhost:8080/update-account/${id}?balance=${forrmattedDeposit}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ deposit: forrmattedDeposit })
            });

            if(!response.ok) {
                throw new Error("Network response was not ok");
            }
            const result = await response.json();
            setMessage(`Account updated successfully: ${result.userName} with new balance R${result.balance.toFixed(2)}`);
            console.log(message);
        } catch (error) {
            console.error("Error updating account:", error);
            setMessage("Error updating account. Please try again.");
        }
    }

    return (
        <div>
            <h2>Update Account ID: {id}</h2>
            <form onSubmit={handleSubmit}>
                <br />
                <label>
                    Deposit: 
                    <input 
                        type="text"
                        step="0.01"
                        name="deposit"
                        placeholder="Enter initial deposit"
                        value={deposit}
                        onChange={(e) => setDeposit(e.target.value)}
                        required />
                </label>
                <br />
                <button type="submit">Update Account</button>
            </form>
        </div>
    );
}