import React, { useState } from 'react';
import './PatientLogin.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../../../config.json';
import CryptoJS from 'crypto-js';

function PatientLogin() {
    // State variables to hold username and password
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // Navigation hook to redirect after successful login
    let navigate = useNavigate();

    // Function to handle the login process
    const handleLogin = (e) => {
        console.log(username);
        console.log(password);

        // Hash the password using MD5
        const hashed_password = CryptoJS.MD5(password).toString();

        // Make a POST request to the login endpoint
        axios({
            method: 'post',
            url: config.backend_url + 'login',
            data: {
                user_name: username,
                password_hash: hashed_password,
            },
        })
            .then((res) => {
                // Login successful, store patientId in sessionStorage
                sessionStorage.setItem('patientId', username);

                // Redirect to the dashboard using the navigate hook
                navigate('/dashboard');
            })
            .catch((err) => {
                console.log(err);

                // Display error message in case of login failure
                alert(err.response.data.message);
            });

        e.preventDefault(); // Prevent the default form submission
    };

    return (
        <div className="patient-login-container">
            <h1 className="patient-login-title">Patient Login</h1>
            <form onSubmit={handleLogin} className="patient-login-form">
                {/* Username input field */}
                <div className="patient-login-field">
                    <label htmlFor="username" className="patient-login-label">
                        Username:
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        onChange={(e) => setUsername(e.target.value)}
                        className="patient-login-input"
                        required
                    />
                </div>

                {/* Password input field */}
                <div className="patient-login-field">
                    <label htmlFor="password" className="patient-login-label">
                        Password:
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="patient-login-input"
                        required
                    />
                    {/* Forgot password link */}
                    <a href="/forgot-password" className="patient-forgot-password-link">
                        Forgot Username or Password?
                    </a>
                </div>

                {/* Login button */}
                <button type="submit" className="patient-login-button">
                    Login
                </button>
            </form>
        </div>
    );
}

export default PatientLogin;
