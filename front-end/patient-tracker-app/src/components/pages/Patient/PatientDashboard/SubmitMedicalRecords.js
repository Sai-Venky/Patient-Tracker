import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom'; // Make sure to import useLocation
import './SubmitMedicalRecords.css';
import config from '../../../../config.json';

function SubmitMedicalRecords() {
    const [conditionName, setConditionName] = useState('');
    const [conditionDescription, setConditionDescription] = useState('');
    const [conditionStartDate, setConditionStartDate] = useState('');

    // Fetch the location state
    const location = useLocation();
    const historyId = location.state?.historyId;

    // Fetch condition data for editing when component mounts
    useEffect(() => {
        if (historyId) {
            // Replace with the actual API endpoint
            axios.get(`${config.backend_url}/medicalHistory/${historyId}`)
                .then(response => {
                    const condition = response.data;
                    setConditionName(condition.Condition_Name);
                    setConditionDescription(condition.Condition_Description);
                    // Format the date as needed for the input field
                    setConditionStartDate(new Date(condition.Condition_Start_Date).toISOString().split('T')[0]);
                })
                .catch(error => {
                    console.error('An error occurred while fetching the medical condition:', error);
                });
        }
    }, [historyId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Retrieve the patientID
        const patientID = sessionStorage.getItem('patientId');

        const medicalConditionData = {
            Patient_ID: patientID,
            Condition_Name: conditionName,
            Condition_Description: conditionDescription,
            Condition_Start_Date: conditionStartDate
        };

        // API Handling
        // Uncomment and use the actual API endpoint and method (POST for new, PUT for update)
        axios.post(`${config.backend_url}/medicalCondition`, medicalConditionData)
            .then(response => {
                alert('Medical condition submitted successfully.');
            })
            .catch(error => {
                console.error('An error occurred while submitting the medical condition:', error);
                alert('Failed to submit medical condition.');
            });
    };

    return (
        <div className="submit-records-container">
            <h2 className="form-heading">Submit Medical Condition</h2>
            <form onSubmit={handleSubmit} className="update-form">
                <div className="form-group">
                    <label htmlFor="condition-name">Condition Name:</label>
                    <input
                        type="text"
                        id="condition-name"
                        name="conditionName"
                        value={conditionName}
                        onChange={(e) => setConditionName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="condition-description">Condition Description:</label>
                    <textarea
                        id="condition-description"
                        name="conditionDescription"
                        value={conditionDescription}
                        onChange={(e) => setConditionDescription(e.target.value)}
                        required
                    ></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="condition-start-date">Condition Start Date:</label>
                    <input
                        type="date"
                        id="condition-start-date"
                        name="conditionStartDate"
                        value={conditionStartDate}
                        onChange={(e) => setConditionStartDate(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Submit Condition</button>
            </form>
        </div>
    );
}

export default SubmitMedicalRecords;

