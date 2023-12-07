import React from 'react';
import './SubmitMedicalRecords.css';

function SubmitMedicalRecords() {
    const handleSubmit = (e) => {
    e.preventDefault();
    // Implement what happens when the form is submitted, e.g., send data to a server
    };

    return (
    <div className="submit-records-container">
        <h2 className="form-heading">Submit Medical Condition</h2>
        <form onSubmit={handleSubmit} className="update-form">
            <div className="form-group">
              <label htmlFor="condition-name">Condition Name:</label>
              <input type="text" id="condition-name" name="conditionName" required />
            </div>

            <div className="form-group">
              <label htmlFor="condition-description">Condition Description:</label>
              <textarea id="condition-description" name="conditionDescription" required></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="condition-start-date">Condition Start Date:</label>
              <input type="date" id="condition-start-date" name="conditionStartDate" required />
            </div>
            <button type="submit" className="submit-button">Submit Condition</button>
        </form>
    </div>
    );
}

export default SubmitMedicalRecords;
