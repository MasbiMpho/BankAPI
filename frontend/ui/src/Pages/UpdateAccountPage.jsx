import { useState } from "react";

export default function UpdateAccountPage() {

    const [formData, setFormData] = useState({deposit:""});

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
            <h2>Update Account</h2>
            <form onSubmit={handleSubmit}>
                <br />
                <label>
                    Deposit: 
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
                <button type="submit">Update Account</button>
            </form>
        </div>
    );
}