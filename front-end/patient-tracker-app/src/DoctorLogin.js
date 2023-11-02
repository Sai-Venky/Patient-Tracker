import React from 'react';
import './DoctorLogin.css'

function DoctorLogin() {
    const handleLogin = () => {
    // Implement the login functionality here
    };

    return (
        <div className="doctor-login-container">
            <h1 className="doctor-login-title">Doctor Login</h1>
            <form onSubmit={handleLogin} className="doctor-login-form">
                <div className="doctor-login-field">
                    <label htmlFor="username" className="doctor-login-label">Username:</label>
                    <input type="text" id="username" name="username" className="doctor-login-input" required />
                </div>
                <div className="doctor-login-field">
                    <label htmlFor="password" className="doctor-login-label">Password:</label>
                    <input type="password" id="password" name="password" className="doctor-login-input" required />
                    <a href="/forgot-password" className="doctor-forgot-password-link">Forgot Username or Password?</a>
                </div>
                <button type="submit" className="doctor-login-button">Login</button>
            </form>
        </div>
    );
}

export default DoctorLogin;