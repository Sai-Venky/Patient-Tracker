import React, { useState, useEffect } from 'react';
import './PatientDashboard.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import updatePatientInfoIcon from './PatientDashboardImages/Patient_info.png';
import config from '../../../../config.json';

function PatientDashboard() {
    let navigate = useNavigate();

    const [patientProfile, setPatientProfile] = useState({
        Name: '',
        Age: '',
        Email: '',
        Phone: '',
        Address: '',
        Emergency_Contact: ''
    });

    const [conditions, setConditions] = useState([]);
    const [editing, setEditing] = useState(false);
    const [newCondition, setNewCondition] = useState({
        ConditionName: '',
        Description: '',
        Date: ''
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

    const handleUpdatePatientInformation = () => {
        navigate('/update-info');
    };

    const handleUpdateMedicalHistory = () => {
        setEditing(!editing);
    };

    const handleAddCondition = () => {
        if (newCondition.ConditionName && newCondition.Description && newCondition.Date) {
            setConditions([...conditions, {...newCondition, SerialNumber: conditions.length + 1}]);
            setNewCondition({ ConditionName: '', Description: '', Date: '' });
        } else {
            alert('Please fill out all fields');
        }
    };

    const handleDeleteCondition = (index) => {
        setConditions(conditions.filter((_, conditionIndex) => index !== conditionIndex));
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Welcome, Patient</h1>
            </header>
            <div className="profile-and-utilities">
                <aside className="patient-profile">
                    <h3 className="patient-profile-header">Patient Profile</h3>
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
                    <div className="records-container">
                        <h2>Medical History</h2>
                        <table className="records-table">
                            <thead>
                            <tr>
                                <th>Serial Number</th>
                                <th>Condition Name</th>
                                <th>Description</th>
                                <th>Date</th>
                                {editing && <th>Actions</th>}
                            </tr>
                            </thead>
                            <tbody>
                            {editing && (
                                <tr>
                                    <td>New</td>
                                    <td>
                                        <input
                                            type="text"
                                            value={newCondition.ConditionName}
                                            onChange={(e) => setNewCondition({
                                                ...newCondition,
                                                ConditionName: e.target.value
                                            })}
                                            placeholder="Condition Name"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={newCondition.Description}
                                            onChange={(e) => setNewCondition({
                                                ...newCondition,
                                                Description: e.target.value
                                            })}
                                            placeholder="Description"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="date"
                                            value={newCondition.Date}
                                            onChange={(e) => setNewCondition({...newCondition, Date: e.target.value})}
                                        />
                                    </td>
                                    <td>
                                        <button className="add-button" onClick={handleAddCondition}>Add</button>
                                    </td>
                                </tr>
                            )}
                            {conditions.map((condition, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{condition.ConditionName}</td>
                                    <td>{condition.Description}</td>
                                    <td>{condition.Date}</td>
                                    {editing && (
                                        <td>
                                            <button className="delete-button" onClick={() => handleDeleteCondition(index)}>Delete</button>
                                        </td>
                                    )}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <button onClick={handleUpdateMedicalHistory} className="update-history-button">
                            {editing ? 'Finish Editing' : 'Update Medical History'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PatientDashboard;



