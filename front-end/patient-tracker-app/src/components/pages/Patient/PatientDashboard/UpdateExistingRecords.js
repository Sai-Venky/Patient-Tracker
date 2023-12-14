import React from 'react';
import './UpdateExistingRecords.css';
import {useNavigate} from "react-router-dom";

function UpdateExistingRecords() {
    let navigate = useNavigate()
    // This component will eventually fetch and display existing records
    // Dummy data for styling purposes
    const dummyRecords = [
        {
            SerialNumber: 1,
            ConditionName: "Hypertension",
            Description: "Chronic high blood pressure",
            Date: "2023-01-01",
        },
        {
            SerialNumber: 2,
            ConditionName: "Diabetes",
            Description: "Type 2 diabetes",
            Date: "2022-12-01",
        }
    ];

    // const handleEdit = (historyId) => {
    //     // Navigate to the SubmitMedicalRecords page with the historyId as a state parameter
    //     navigate('/submit-medical-record', { state: { historyId } });
    // };
    //
    // // Inside the map function in the tbody:
    // <button onClick={() => handleEdit(record.History_ID)} className="edit-button">Edit</button>

    return (
        <div className="records-container">
            <h2>Existing Records</h2>
            <table className="records-table">
                <thead>
                <tr>
                    <th>#Serial Number</th>
                    <th>Condition Name</th>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Edit</th>
                </tr>
                </thead>
                <tbody>
                {dummyRecords.map((record) => (
                    <tr key={record.SerialNumber}>
                        <td>{record.SerialNumber}</td>
                        <td>{record.ConditionName}</td>
                        <td>{record.Description}</td>
                        <td>{record.Date}</td>
                        <td><button className="edit-button">Edit</button></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default UpdateExistingRecords;
