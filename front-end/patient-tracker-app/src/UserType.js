import React from 'react';
import './UserType.css';
import { useNavigate } from 'react-router-dom';
import logo from './App_logo.png';

function UserType() {
  let navigate = useNavigate();

  const handleUserTypeClick = (userType) => {
    if(userType === 'Doctor') {
     navigate('/doctor-login');
    } else {
      navigate('/patient-login');
    }
  };
  return (
    <div>
      <img src={logo} alt="Logo" style={{maxWidth: '100%'}} />
      <h2 style = {{color:'black'}}>Welcome to the Patient Tracker App</h2>
        <p style = {{color:'black'}}>Please select the type of User</p>
      <button
        className="button button-doctor"
        onClick={() => handleUserTypeClick('Doctor')}
      >
        Doctor
      </button>
      <button
        className="button button-patient"
        onClick={() => handleUserTypeClick('Patient')}
      >
        Patient
      </button>
      <a href="/create-account" className="new-user-link">New User?</a>
    </div>
  );
}

export default UserType;