import React, { useState, useEffect } from 'react';
import './PatientDashboard.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import updatePatientInfoIcon from './PatientDashboardImages/Patient_info.png';
import updateRecordIcon from './PatientDashboardImages/Update_icon.png';
import medicalRecordIcon from './PatientDashboardImages/Submit.png';
import config from '../../../../config.json';

function PatientDashboard() {
    let navigate = useNavigate();

    const handleUpdatePatientInformation = () => {
        navigate('/update-info');
    };

    const handleSubmitRecords = () => {
        navigate('/submit-medical-records');
    };

    const handleUpdateRecords = () => {
        navigate('/update-existing-records');
    };

    const [patientProfile, setPatientProfile] = useState({
        Name: '',
        Age: '',
        Email: '',
        Phone: '',
        Address: '',
        Emergency_Contact: ''
    });

    useEffect(() => {
        // Fetch the patient profile from the backend
        const patientID = sessionStorage.getItem('patientId');
        axios.get(`${config.backend_url}/patients/${patientID}`)
            .then(response => {
                setPatientProfile(response.data);
            })
            .catch(error => {
                console.error('Error fetching patient profile', error);
            });
    }, []);

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Welcome, Patient</h1>
            </header>
            <div className="profile-and-utilities">
                <aside className="patient-profile">
                    <h3>Patient Profile</h3>
                    <p><strong>Name:</strong> {patientProfile.Name}</p>
                    <p><strong>Age:</strong> {patientProfile.Age}</p>
                    <p><strong>Email:</strong> {patientProfile.Email}</p>
                    <p><strong>Phone:</strong> {patientProfile.Phone}</p>
                    <div className="tile" onClick={handleUpdatePatientInformation}>
                        <img src={updatePatientInfoIcon} alt="Update Patient Information" className="tile-icon"/>
                        <span className="tile-label">Update Patient Information</span>
                    </div>
                </aside>
                <div className="utilities-container">
                    <div className="tile" onClick={handleSubmitRecords}>
                        <img src={medicalRecordIcon} alt="Submit Medical Records" className="tile-icon"/>
                        <span className="tile-label">Submit Medical Records</span>
                    </div>
                    <div className="tile" onClick={handleUpdateRecords}>
                        <img src={updateRecordIcon} alt="Update Existing Records" className="tile-icon"/>
                        <span className="tile-label">Update Existing Records</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PatientDashboard;

