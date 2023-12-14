import React, { useState } from 'react';
import './PrescribeMedication.css';

function PrescribeMedication() {
    const [patientId, setPatientId] = useState('');
    const [medication, setMedication] = useState('');
    const [frequency, setFrequency] = useState('');
    const [dosage, setDosage] = useState('');

    // Dummy data for medication options
    const medications = [
        { id: 'M001', name: 'Amoxicillin' },
        { id: 'M002', name: 'Ibuprofen' },
        { id: 'M003', name: 'Metformin' },
        // Add more medication options as needed
    ];

    const handleSubmit = (event) => {
        event.preventDefault();
        // Logic to handle form submission goes here
        console.log({ patientId, medication, frequency, dosage });
    };

    return (
        <div className="prescribe-medication-container">
            <form onSubmit={handleSubmit}>
                <label htmlFor="patient-id">Patient ID:</label>
                <input
                    id="patient-id"
                    type="text"
                    value={patientId}
                    onChange={(e) => setPatientId(e.target.value)}
                />
                <label htmlFor="medication">Medication:</label>
                <select
                    id="medication"
                    value={medication}
                    onChange={(e) => setMedication(e.target.value)}
                >
                    <option value="">Select Medication</option>
                    {medications.map((med) => (
                        <option key={med.id} value={med.id}>
                            {med.name} ({med.id})
                        </option>
                    ))}
                </select>
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
        </div>
    );
}

export default PrescribeMedication;

