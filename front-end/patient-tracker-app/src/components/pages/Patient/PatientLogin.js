import React from 'react';
import './PatientLogin.css';

function PatientLogin() {
    const handleLogin = () => {
        // Implement the login functionality here
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