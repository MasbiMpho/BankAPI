import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function AccountPage() {

  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/user/${id}`)
      .then((response) => {
        if(!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
        console.log("API response:", data); 
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
        console.error("Error fetching data:", error);
      });
  }, [id]);
  return (
    <div>
        <h1>Account Info</h1>
        {user ? (
          <div>
            <p>Name: {user.userName}</p>
            <p>Account Number: {user.accountNumber}</p>
            <p>Deposit: R{user.balance.toFixed(2)}</p>
            <p>Account Type: {user.accountType}</p>
            <p>Status: {user.status}</p>
          </div>
        ) : (
          <p>No user found</p>
        )}
    </div>
  );
}