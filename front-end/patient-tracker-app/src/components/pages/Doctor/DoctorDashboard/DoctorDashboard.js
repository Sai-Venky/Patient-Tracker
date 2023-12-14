import React from 'react';
import './DoctorDashboard.css';
import { useNavigate } from 'react-router-dom';
import viewPatientsIcon from './DoctorDashboardImages/View_patients.png';
import medicalReportsIcon from './DoctorDashboardImages/Medical_reports.png';

function DoctorDashboard() {
    let navigate = useNavigate();

    // const [appointments, setAppointments] = useState([]); // Commented out for now as there's no API

    // useEffect(() => {
    //     // Fetch today's appointments when the component mounts
    //     // This part is commented out for now as there's no API
    // }, []);
    const dummyAppointments = [
        { id: '001', name: 'John Doe', time: '10:00 AM' },
        { id: '002', name: 'Jane Smith', time: '11:00 AM' }
    ];

    const handleViewPatients = () => {
        navigate('/view-patients');
    };

    const handlePrescribeMedication= () => {
        navigate('/prescribe-medication')
    };

    const handleScheduleAppointment = () => {
        // Logic to schedule an appointment
        // Possibly navigate to a scheduling page or open a modal
        console.log('Schedule an appointment');
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Welcome Doctor</h1>
            </header>
            <div className="dashboard-main">
                <div className="appointments-section">
                    <h2 className="appointments-header">Today's Appointments</h2>
                    <table className="appointments-table">
                        <thead>
                        <tr>
                            <th>Patient ID</th>
                            <th>Name</th>
                            <th>Appointment Time</th>
                        </tr>
                        </thead>
                        <tbody>
                            {dummyAppointments.map((appointment) => (
                                <tr key={appointment.id}>
                                    <td>{appointment.id}</td>
                                    <td>{appointment.name}</td>
                                    <td>{appointment.time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button className="schedule-appointment-btn" onClick={handleScheduleAppointment}>
                        Schedule an Appointment
                    </button>
                </div>
                <div className="tiles-section">
                    <div className="tile" onClick={handleViewPatients}>
                        <img src={viewPatientsIcon} alt="View All Patients" className="tile-icon" />
                        <span className="tile-label">View All Patients</span>
                    </div>
                    <div className="tile" onClick={handlePrescribeMedication}>
                        <img src={medicalReportsIcon} alt="Prescribe Medication" className="tile-icon" />
                        <span className="tile-label">Prescribe Medication</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DoctorDashboard;

