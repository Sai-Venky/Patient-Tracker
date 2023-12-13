import React, { useState } from 'react';
import './ViewPatients.css';

function ViewPatients() {
    // Dummy patient data with the specified attributes
    const patients = [
        { patientID: 'P001', name: 'John Doe', age: 30, conditionName: 'Flu', conditionDescription: 'Showing symptoms of flu.', startDate: '2023-01-01' },
        // ... more patient data
    ];

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredPatients = patients.filter(
        patient =>
            patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.conditionName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleViewMore = (patient) => {
        // Here you would open a modal or display details
        alert(`Details for ${patient.name}: 
        ID: ${patient.patientID}, 
        Age: ${patient.age}, 
        Condition: ${patient.conditionName}, 
        Description: ${patient.conditionDescription}, 
        Start Date: ${patient.startDate}`);
    };

    return (
        <div className="view-patients-layout">
            <div className="search-filter-container">
                <input
                    type="text"
                    placeholder="Search by Name or Condition..."
                    className="search-input"
                    onChange={handleSearch}
                />
            </div>
            <div className="view-patients-container">
                <h1>Patient List</h1>
                <div className="patients-table-container">
                    <table className="patients-table">
                        <thead>
                        <tr>
                            <th>Patient ID</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Condition Name</th>
                            <th>View More</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredPatients.map(patient => (
                            <tr key={patient.patientID}>
                                <td>{patient.patientID}</td>
                                <td>{patient.name}</td>
                                <td>{patient.age}</td>
                                <td>{patient.conditionName}</td>
                                <td>
                                    <button className="view-more-button" onClick={() => handleViewMore(patient)}>View More</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ViewPatients;



