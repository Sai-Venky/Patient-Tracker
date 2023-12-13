import  React, { useState } from 'react';
import './DoctorLogin.css';
import axios from 'axios' 
import { useNavigate } from 'react-router-dom';
import config from '../../../config.json'
import CryptoJS from 'crypto-js';

function DoctorLogin() {
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
            alert("Login success")
            navigate('/doctor-dashboard'); // Use navigate to go to the dashboard
        })
        .catch(err=> {
            console.log(err)
            alert(err.response.data.message)
        })
        e.preventDefault();
    };

    return (
        <div className="doctor-login-container">
            <h1 className="doctor-login-title">Doctor Login</h1>
            <form onSubmit={handleLogin} className="doctor-login-form">
                <div className="doctor-login-field">
                    <label htmlFor="username" className="doctor-login-label">Username:</label>
                    <input type="text" id="username" name="username" onChange={(e) => setUsername(e.target.value)} className="doctor-login-input" required />
                </div>
                <div className="doctor-login-field">
                    <label htmlFor="password" className="doctor-login-label">Password:</label>
                    <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} className="doctor-login-input" required />
                    <a href="/forgot-password" className="doctor-forgot-password-link">Forgot Username or Password?</a>
                </div>
                <button type="submit" className="doctor-login-button">Login</button>
            </form>
        </div>
    );
}

export default DoctorLogin;