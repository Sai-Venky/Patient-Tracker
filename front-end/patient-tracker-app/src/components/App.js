import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserType from './pages/UserType/UserType';
import DoctorLogin from './pages/Doctor/DoctorLogin';
import PatientLogin from './pages/Patient/PatientLogin';
import UpdatePatientInfo from './pages/Patient/PatientDashboard/UpdatePatientInfo';
import PatientDashboard from './pages/Patient/PatientDashboard/PatientDashboard';
import CreateAccount from './pages/CreateAccount/CreateAccount';
import DoctorDashboard from './pages/Doctor/DoctorDashboard/DoctorDashboard';
import PrescribeMedication from "./pages/Doctor/DoctorDashboard/PrescribeMedication";
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<UserType />} />
            <Route path="/doctor-login" element={<DoctorLogin />} />
            <Route path="/patient-login" element={<PatientLogin />} />
            <Route path="/dashboard" element={<PatientDashboard />} />
            <Route path="/update-info" element={<UpdatePatientInfo />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
            <Route path="/prescribe-medication" element={<PrescribeMedication />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
