// import { useEffect, useState } from "react";

// export default function CreateAccountPage() {


//     const [formData, setFormData] = useState({name:"", deposit:""});
//     const [user, setUser] = useState("");


//     // useEffect(() => {
//     //     fetch("http://localhost:8080/create-account")
//     //     .then((response) => {
//     //         if(!response.ok) {
//     //         throw new Error("Network response was not ok");
//     //         }
//     //         return response.json();
//     //     })
//     //     .then((data) => {
//     //         setUser(data);
//     //         setLoading(false);
//     //         console.log("API response:", data); 
//     //     })
//     //     .catch((error) => {
//     //         setError(error.message);
//     //         setLoading(false);
//     //         console.error("Error fetching data:", error);
//     //     });
//     // }, []);
    


//     const handleChange = (e) => {
//         const {name, value} = e.target;
//         setFormData({...formData, [name]: value});  
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const forrmattedDeposit = parseFloat(formData.deposit).toFixed(2);

//         const accountData = {
//             name: formData.name,
//             deposit: forrmattedDeposit
//         };

//         try {
//             const response = await fetch("http://localhost:8080/create-account", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify(accountData)
//             });
//             const result = await response.json();
//             setUser(`Account created successfully: ${result.userName} & ID: ${result.id} with account number ${result.accountNumber}`);
//             console.log("Creating account:", accountData);
//         } catch (error) {
//             setUser(`Error creating account: ${error.message}`);
//             console.error("Error creating account:", error);
//         }
//     }


//     return (
//         <div>
//             <h2>Create Account</h2>
//             <form onSubmit={handleSubmit}>
//                 <label>
//                     Name: 
//                     <input 
//                         type="text"
//                         name="name"
//                         placeholder="Enter your Name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         required />
//                 </label>
//                 <br />
//                 <label>
//                     Initial Deposit: 
//                     <input 
//                         type="text"
//                         step="0.01"
//                         name="deposit"
//                         placeholder="Enter initial deposit"
//                         value={formData.deposit}
//                         onChange={handleChange}
//                         required />
//                 </label>
//                 <br />
//                 <button type="submit">Create Account</button>
//             </form>
//             {user && <p>{user}</p>}
//         </div>
//     );
// }

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
    } catch (err) {
      setMessage(`Error creating account: ${err.message}`);
      console.error(err);
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