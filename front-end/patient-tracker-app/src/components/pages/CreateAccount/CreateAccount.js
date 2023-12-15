import React, { useState } from 'react';
import './CreateAccount.css';
import axios from 'axios';
import config from '../../../config.json';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';

function CreateAccount() {
    // State variables to hold form input values
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userType, setUserType] = useState('');
    // Navigation hook to redirect after successful registration
    let navigate = useNavigate();

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();

        // Check if passwords match
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        // Check if user type is selected
        if (!userType) {
            alert('Select user type');
            return;
        }

        // Hash the password using MD5
        const hashed_password = CryptoJS.MD5(password).toString();

        // Make a POST request to register the user
        axios({
            method: 'post',
            url: config.backend_url + '/register',
            data: {
                user_name: username,
                password_hash: hashed_password,
                type: userType,
                is_active: true,
            },
        })
            .then((res) => {
                // Display success message
                alert(res.data.message);

                // Clear form fields
                setUsername('');
                setPassword('');
                setConfirmPassword('');
                setUserType('');

                // Create an entry in the Patients/Doctor table based on user type
                if (userType === 'Patient') {
                    axios({
                        method: 'post',
                        url: config.backend_url + '/patients',
                        data: {
                            Patient_ID: username,
                        },
                    });
                }

                // Redirect to the home page
                navigate('/');
            })
            .catch((err) => {
                // Log and display any errors
                console.log(err);
                alert(err.response.data.message);
            });
    };

    return (
        <div className="create-account-container">
            <h1 className="create-account-title">Create Account</h1>
            <form onSubmit={handleSubmit} className="create-account-form">
                {/* User type selection buttons */}
                <p className="user-type-text">Please Select User type</p>
                <div className="user-type-buttons">
                    <button
                        type="button"
                        className={userType === 'Doctor' ? 'user-type-button doctor-selected' : 'user-type-button'}
                        onClick={() => setUserType('Doctor')}
                    >
                        Doctor
                    </button>
                    <button
                        type="button"
                        className={userType === 'Patient' ? 'user-type-button patient-selected' : 'user-type-button'}
                        onClick={() => setUserType('Patient')}
                    >
                        Patient
                    </button>
                </div>

                {/* Username input */}
                <div className="create-account-field">
                    <label htmlFor="username" className="create-account-label">
                        Username:
                    </label>
                    <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="create-account-input" required />
                </div>

                {/* Password input */}
                <div className="create-account-field">
                    <label htmlFor="password" className="create-account-label">
                        Password:
                    </label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="create-account-input" required />
                </div>

                {/* Confirm Password input */}
                <div className="create-account-field">
                    <label htmlFor="confirmPassword" className="create-account-label">
                        Confirm Password:
                    </label>
                    <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="create-account-input" required />
                </div>

                {/* Submit button */}
                <button type="submit" className="create-account-button">
                    Create Account
                </button>
            </form>
        </div>
    );
}

export default CreateAccount;
