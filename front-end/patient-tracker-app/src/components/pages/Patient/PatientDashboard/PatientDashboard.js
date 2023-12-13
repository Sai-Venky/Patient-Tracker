import React from 'react';
import './PatientDashboard.css';
import { useNavigate } from 'react-router-dom';
import updatePatientInfoIcon from './PatientDashboardImages/Patient_info.png'
import updateRecordIcon from './PatientDashboardImages/Update_icon.png';
import medicalRecordIcon from './PatientDashboardImages/Submit.png';

function PatientDashboard() {
    let navigate = useNavigate()
    const handleUpdatePatientInformation = () => {
        navigate('/update-info');
    };

    const handleSubmitRecords = () => {
        navigate('/submit-medical-records');
    };

    const handleUpdateRecords = () => {
        navigate('/update-existing-records');
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Welcome Patient</h1>
            </header>
            <div className="tile" onClick={handleUpdatePatientInformation}>
                <img src={updatePatientInfoIcon} alt="Submit Medical Records" className="tile-icon" />
                <span className="tile-label">Update Patient Information</span>
            </div>
            <div className="tile" onClick={handleSubmitRecords}>
                <img src={medicalRecordIcon} alt="Submit Medical Records" className="tile-icon" />
                <span className="tile-label">Submit Medical Records</span>
            </div>
            <div className="tile" onClick={handleUpdateRecords}>
                <img src={updateRecordIcon} alt="Update Existing Records" className="tile-icon" />
                <span className="tile-label">Update Existing Records</span>
            </div>
        </div>
    );
}

export default PatientDashboard;