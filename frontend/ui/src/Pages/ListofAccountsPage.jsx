import { use, useEffect, useState } from "react";


export default function ListofAccountsPage() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/users")
      .then((response) => {
        if(!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
        console.log("API response:", data); 
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
        console.error("Error fetching data:", error);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
        <h1>List of Accounts</h1>
        <ul>
            {users.map((user) => (
                <li key={user.id}>
                    Name: {user.userName} | Account Number: {user.accountNumber} | Deposit: R{user.balance.toFixed(2)} | Account Type: {user.accountType} | Status: {user.status}
                </li>
            ))}
        </ul>
    </div>
  );
}   
