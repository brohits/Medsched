import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/home/HomePage';
import AdminDashboard from './components/admin/AdminDashboard';
import ManageDoctors from './components/admin/ManageDoctors';
import ManagePatients from './components/admin/ManagePatients';
import ManageAppointments from './components/admin/ManageAppointments';
import BookAppointment from './components/patient/BookAppointment';
import MyAppointments from './components/patient/MyAppointments';
import ProfilePage from './components/profile/ProfilePage';
import DoctorDashboard from './components/doctor/DoctorDashboard';
import Schedule from './components/doctor/Schedule';
import AppointmentRequests from './components/doctor/AppointmentRequests';
import './App.css';

function App() {
  const [userRole, setUserRole] = useState('patient');

  useEffect(() => {
    console.log('Current user role:', userRole);
  }, [userRole]);

  const handleRoleChange = (newRole) => {
    console.log('Role changed to:', newRole);
    setUserRole(newRole);
  };

  return (
    <Router>
      <div className="App">
        <Navbar userRole={userRole} onRoleChange={handleRoleChange} />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            
            {/* Patient Routes */}
            <Route path="/book-appointment" element={<BookAppointment />} />
            <Route path="/appointments" element={<MyAppointments />} />
            
            {/* Doctor Routes */}
            <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
            <Route path="/doctor/schedule" element={<Schedule />} />
            <Route path="/doctor/appointments" element={<AppointmentRequests />} />
            
            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/doctors" element={<ManageDoctors />} />
            <Route path="/admin/patients" element={<ManagePatients />} />
            <Route path="/admin/appointments" element={<ManageAppointments />} />
            
            {/* Common Routes */}
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
