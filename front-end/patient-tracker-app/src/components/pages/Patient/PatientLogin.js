import React from 'react';
import './PatientLogin.css';
import { useNavigate } from 'react-router-dom';

function PatientLogin() {
    let navigate = useNavigate();
    // Implement the login functionality here
    const handleLogin = (e) => {
            e.preventDefault(); // Prevent the default form submission
            navigate('/dashboard'); // Use navigate to go to the dashboard
    };

    return (
        <div className="patient-login-container">
            <h1 className="patient-login-title">Patient Login</h1>
            <form onSubmit={handleLogin} className="patient-login-form">
                <div className="patient-login-field">
                    <label htmlFor="username" className="patient-login-label">Username:</label>
                    <input type="text" id="username" name="username" className="patient-login-input" required />
                </div>
                <div className="patient-login-field">
                    <label htmlFor="password" className="patient-login-label">Password:</label>
                    <input type="password" id="password" name="password" className="patient-login-input" required />
                    <a href="/forgot-password" className="patient-forgot-password-link">Forgot Username or Password?</a>
                </div>
                <button type="submit" className="patient-login-button">Login</button>
            </form>
        </div>
    );
}

export default PatientLogin;