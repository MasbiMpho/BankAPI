import { useState } from "react";

export default function CreateAccountPage() {

        
    const [formData, setFormData] = useState({name:"", deposit:""});

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});  
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const forrmattedDeposit = parseFloat(formData.deposit).toFixed(2);

        const accountData = {
            name: formData.name,
            deposit: forrmattedDeposit
        };

        console.log("Creating account:", accountData);
    }


    return (
        <div>
            <h2>Create Account</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name: 
                    <input 
                        type="text"
                        name="name"
                        placeholder="Enter your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required />
                </label>
                <br />
                <label>
                    Initial Deposit: 
                    <input 
                        type="text"
                        step="0.01"
                        name="deposit"
                        placeholder="Enter initial deposit"
                        value={formData.deposit}
                        onChange={handleChange}
                        required />
                </label>
                <br />
                <button type="submit">Create Account</button>
            </form>
        </div>
    );
}