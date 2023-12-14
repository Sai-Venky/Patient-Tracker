import React, { useState } from 'react';
import './PatientLogin.css';
import axios from 'axios' 
import { useNavigate } from 'react-router-dom';
import config from '../../../config.json'
import CryptoJS from 'crypto-js';


function PatientLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    let navigate = useNavigate();
    // Implement the login functionality here
    const handleLogin = (e) => {
            console.log(username)
            console.log(password)
            const hashed_password = CryptoJS.MD5(password).toString();
            axios({
                method:"post",
                url:config.backend_url + "login",
                data:{
                    user_name:username,
                    password_hash:hashed_password
                }
            })
            .then(res=> {
                //Login successful
                navigate('/dashboard'); // Use navigate to go to the dashboard
            })
            .catch(err=> {
                console.log(err)
                alert(err.response.data.message)
            })
            e.preventDefault(); // Prevent the default form submission
            
    };

    return (
        <div className="patient-login-container">
            <h1 className="patient-login-title">Patient Login</h1>
            <form onSubmit={handleLogin} className="patient-login-form">
                <div className="patient-login-field">
                    <label htmlFor="username" className="patient-login-label">Username:</label>
                    <input type="text" id="username" name="username" onChange={(e) => setUsername(e.target.value)} className="patient-login-input" required />
                </div>
                <div className="patient-login-field">
                    <label htmlFor="password" className="patient-login-label">Password:</label>
                    <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} className="patient-login-input" required />
                </div>
                <button type="submit" className="patient-login-button">Login</button>
            </form>
        </div>
    );
}

export default PatientLogin;