import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './PrescribeMedication.css';

function PrescribeMedication() {
    const navigate = useNavigate();
    const location = useLocation();
    const [patientId, setPatientId] = useState(location.state?.patientId || '');
    const [medication, setMedication] = useState('');
    const [frequency, setFrequency] = useState('');
    const [dosage, setDosage] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log({ patientId, medication, frequency, dosage });

        // TODO: Add your API call here to submit the prescription data

        setIsSubmitted(true);

        // Navigate back to the dashboard after 2 seconds
        setTimeout(() => {
            navigate('/doctor-dashboard'); // Replace '/' with your doctor dashboard path if it's different
        }, 2000);
    };

    return (
        <div className="prescribe-medication-container">
            {isSubmitted ? (
                <div className="submission-success">
                    Prescription submitted successfully!
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <label htmlFor="patient-id">Patient ID:</label>
                    <input
                        id="patient-id"
                        type="text"
                        value={patientId}
                        readOnly // The field is read-only because the patient ID is passed from the selection
                    />
                    <label htmlFor="medication">Medication:</label>
                    <input
                        id="medication"
                        type="text"
                        value={medication}
                        onChange={(e) => setMedication(e.target.value)}
                        placeholder="Enter medication name"
                    />
                    <label htmlFor="frequency">Frequency:</label>
                    <input
                        id="frequency"
                        type="text"
                        value={frequency}
                        onChange={(e) => setFrequency(e.target.value)}
                        placeholder="e.g., Once daily"
                    />
                    <label htmlFor="dosage">Dosage:</label>
                    <input
                        id="dosage"
                        type="text"
                        value={dosage}
                        onChange={(e) => setDosage(e.target.value)}
                        placeholder="e.g., 500mg"
                    />
                    <button type="submit">Submit</button>
                </form>
            )}
        </div>
    );
}

export default PrescribeMedication;


