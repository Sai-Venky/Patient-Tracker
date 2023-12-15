import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './DoctorDashboard.css';
import medicalRecordsIcon from './DoctorDashboardImages/Medical_records.png';
import prescribeMedicationIcon from './DoctorDashboardImages/Medical_reports.png';
import diagnosePatientIcon from './DoctorDashboardImages/View_patients.png';
import axios from "axios";

function DoctorDashboard() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPatients, setSelectedPatients] = useState(new Set());
    const [patients, setPatients] = useState([]); // State to store patients data
    const [showMedicalRecords, setShowMedicalRecords] = useState(false);
    const [medicalRecords, setMedicalRecords] = useState([]);


    useEffect(() => {
        // Replace '' with  actual API endpoint
        axios.get('')
            .then(response => {
                setPatients(response.data); // Set the patient data in state
            })
            .catch(error => {
                console.error('There was an error fetching the patient data:', error);
            });
    }, []); // Empty dependency array means this effect runs once on mount

    const handlePatientAction = (action) => {
        const selectedPatientsCount = selectedPatients.size;

        if (selectedPatientsCount === 0) {
            alert('Please select a patient.');
        } else if (selectedPatientsCount > 1) {
            alert('Please select only one patient.');
        } else {
            const patientId = [...selectedPatients][0];
            console.log(`${action} for patient ID:`, patientId);
            // You can now use patientId to perform any action like navigate or API call
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

    const handleAccessRecords = () => {
        const selectedPatientsCount = selectedPatients.size;

        if (selectedPatientsCount !== 1) {
            alert('Please select exactly one patient to access medical records.');
            return;
        }

        const patientId = [...selectedPatients][0];
        axios.get(`http://example.com/api/medical-records/${patientId}`)
            .then(response => {
                setMedicalRecords(response.data); // Set the medical records data in state
                setShowMedicalRecords(true); // Show the medical records table
            })
            .catch(error => {
                console.error('There was an error fetching the medical records:', error);
            });
    };

    const handlePrescribeMedication = () => {
        const selectedPatientsCount = selectedPatients.size;

        if (selectedPatientsCount !== 1) {
            alert('Please select exactly one patient to prescribe medication.');
            return;
        }
        const patientId = [...selectedPatients][0];
        navigate('/prescribe-medication', { state: { patientId } });
    };

    const handleDiagnosePatient = () => {
        console.log('Diagnose patient');
        // Logic to diagnose patient goes here
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Welcome Doctor</h1>
            </header>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search patients..."
                    className="search-box"
                    onChange={handleSearchChange}
                />
            </div>
            <div className="patients-table-container">
                <h1 className="patients-table-header">Patient List</h1>
                <table className="patients-table">
                    <thead>
                    <tr>
                        <th>Patient ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Select Patient</th>
                    </tr>
                    </thead>
                    <tbody>
                    {patients.filter(patient =>
                        !searchTerm || patient.name.toLowerCase().includes(searchTerm) ||
                        patient.id.toLowerCase().includes(searchTerm)
                    ).map((patient) => (
                        <tr key={patient.id}>
                            <td>{patient.id}</td>
                            <td>{patient.name}</td>
                            <td>{patient.age}</td>
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
                <div className="tiles-container">
                    <div className="tile" onClick={handleAccessRecords}>
                        <img src={medicalRecordsIcon} alt="Access Medical Records" className="tile-icon" />
                        <span className="tile-label">Access Medical Records</span>
                    </div>
                    <div className="tile" onClick={handlePrescribeMedication}>
                        <img src={prescribeMedicationIcon} alt="Prescribe Medication" className="tile-icon" />
                        <span className="tile-label">Prescribe Medication</span>
                    </div>
                    <div className="tile" onClick={handleDiagnosePatient}>
                        <img src={diagnosePatientIcon} alt="Diagnose Patient" className="tile-icon" />
                        <span className="tile-label">Diagnose Patient</span>
                    </div>
                </div>
            </div>
            {showMedicalRecords && (
                <div className="medical-records-container">
                    <h2>Medical Records for Patient ID: {Array.from(selectedPatients)[0]}</h2>
                    <table className="medical-records-table">
                        {/* Table headers and body for medical records */}
                    </table>
                    <button onClick={() => setShowMedicalRecords(false)} className="close-records-btn">Close</button>
                </div>
            )}
        </div>
    );
}

export default DoctorDashboard;
