import React, { useState } from 'react';
import './ViewPatients.css';
import medicalRecordsIcon from './DoctorDashboardImages/Medical_records.png';


function ViewPatients() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPatients, setSelectedPatients] = useState(new Set());

    // Dummy patient data
    const patients = [
        { id: 'P001', name: 'John Doe', age: 30, condition: 'Hypertension' },
        { id: 'P002', name: 'Jane Smith', age: 45, condition: 'Diabetes' },
        { id: 'P003', name: 'Mark Taylor', age: 25, condition: 'Flu' }
    ];

    const handleAccessRecords = () => {
        // Logic to access selected patient's medical records
        console.log('Access Patient\'s Medical Records');
        const selectedPatientsCount = selectedPatients.size;

        if (selectedPatientsCount === 0) {
            // No patient is selected
            alert('Please select a patient.');
        } else if (selectedPatientsCount > 1) {
            // More than one patient is selected
            alert('Please select only one patient.');
        } else {
            // Exactly one patient is selected, proceed with accessing records
            console.log('Access Patient\'s Medical Records for patient ID:', [...selectedPatients][0]);
            // You can put your logic here to access the records of the selected patient
        }
    };

    const handleCheckboxChange = (patientId) => {
        setSelectedPatients((prevSelectedPatients) => {
            const newSelectedPatients = new Set(prevSelectedPatients);
            if (newSelectedPatients.has(patientId)) {
                newSelectedPatients.delete(patientId);
            } else {
                newSelectedPatients.add(patientId);
            }
            return newSelectedPatients;
        });
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const isRowHighlighted = (patient) => {
        return searchTerm && (patient.name.toLowerCase().includes(searchTerm) ||
            patient.id.toLowerCase().includes(searchTerm) ||
            patient.condition.toLowerCase().includes(searchTerm));
    };

    return (
        <div className="view-patients-container">
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search patients..."
                    className="search-box"
                    onChange={handleSearchChange}
                />
            </div>
            <h1 className="patients-table-header">Patient List</h1>
            <div className="patients-table-container">
                <table className="patients-table">
                    <thead>
                    <tr>
                        <th>Patient ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Condition Name</th>
                        <th>Select Patient</th>
                    </tr>
                    </thead>
                    <tbody>
                    {patients.map((patient) => (
                        <tr key={patient.id} className={isRowHighlighted(patient) ? 'highlighted' : ''}>
                            <td>{patient.id}</td>
                            <td>{patient.name}</td>
                            <td>{patient.age}</td>
                            <td>{patient.condition}</td>
                            <td>
                                <input
                                    type="checkbox"
                                    id={`select-${patient.id}`}
                                    name="select_patient"
                                    value={patient.id}
                                    onChange={() => handleCheckboxChange(patient.id)}
                                    checked={selectedPatients.has(patient.id)}
                                />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="tile-container">
                <div className="tile" onClick={handleAccessRecords}>
                    <img src={medicalRecordsIcon} alt="Access Medical Records" className="tile-icon"/>
                    <span className="tile-label">Access Patient's Medical Records</span>
                </div>
            </div>
        </div>
    );
}

export default ViewPatients;

