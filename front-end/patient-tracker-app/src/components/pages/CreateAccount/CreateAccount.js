import React, { useState } from 'react';
import './CreateAccount.css';
import axios from 'axios' 
import config from '../../../config.json'
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';


function CreateAccount() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userType, setUserType] = useState('');
    let navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        if(!userType){
            alert("Select user type");
            return;
        }
        const hashed_password = CryptoJS.MD5(password).toString();
        axios({
                method:"post",
                url:config.backend_url + "/register",
                data:{
                    user_name:username,
                    password_hash:hashed_password,
                    type:userType,
                    is_active:true
                }
            })
            .then(res=> {
                alert(res.data.message)
                setUsername("")
                setPassword("")
                setConfirmPassword("")
                setUserType("")
                
                alert(userType)
                // Create a entry in the Patients/Doctor table
                if(userType == "Patient"){
                    axios({
                        method:"post",
                        url:config.backend_url + "/patients",
                        data:{
                            Patient_ID:username
                        }
                    })
                }
                navigate('/')
            })
            .catch(err=> {
                console.log(err)
                alert(err.response.data.message)
            })
    };

    return (
        <div className="create-account-container">
            <h1 className="create-account-title">Create Account</h1>
            <form onSubmit={handleSubmit} className="create-account-form">
                <p className="user-type-text">Please Select User type</p>
                <div className="user-type-buttons">
                    <button type="button" className={userType === 'Doctor' ? 'user-type-button doctor-selected' : 'user-type-button'} onClick={() => setUserType('Doctor')}>Doctor</button>
                    <button type="button" className={userType === 'Patient' ? 'user-type-button patient-selected' : 'user-type-button'} onClick={() => setUserType('Patient')}>Patient</button>
                </div>
                <div className="create-account-field">
                    <label htmlFor="username" className="create-account-label">Username:</label>
                    <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="create-account-input" required />
                </div>
                <div className="create-account-field">
                    <label htmlFor="password" className="create-account-label">Password:</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="create-account-input" required />
                </div>
                <div className="create-account-field">
                    <label htmlFor="confirmPassword" className="create-account-label">Confirm Password:</label>
                    <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="create-account-input" required />
                </div>
                <button type="submit" className="create-account-button">Create Account</button>
            </form>
        </div>
    );
}

export default CreateAccount;

