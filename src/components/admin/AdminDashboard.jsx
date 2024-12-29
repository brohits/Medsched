import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalDoctors: 0,
    totalPatients: 0,
    totalAppointments: 0,
    pendingAppointments: 0
  });

  useEffect(() => {
    // Simulated data - replace with actual API calls
    setStats({
      totalDoctors: 15,
      totalPatients: 150,
      totalAppointments: 300,
      pendingAppointments: 25
    });
  }, []);

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Doctors</h3>
          <p>{stats.totalDoctors}</p>
          <Link to="/admin/doctors">Manage Doctors</Link>
        </div>
        
        <div className="stat-card">
          <h3>Total Patients</h3>
          <p>{stats.totalPatients}</p>
          <Link to="/admin/patients">Manage Patients</Link>
        </div>
        
        <div className="stat-card">
          <h3>Total Appointments</h3>
          <p>{stats.totalAppointments}</p>
          <Link to="/admin/appointments">View All</Link>
        </div>
        
        <div className="stat-card">
          <h3>Pending Appointments</h3>
          <p>{stats.pendingAppointments}</p>
          <Link to="/admin/appointments?status=pending">View Pending</Link>
        </div>
      </div>

      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
          <Link to="/admin/doctors/add" className="action-button">Add New Doctor</Link>
          <Link to="/admin/appointments/schedule" className="action-button">Schedule Appointment</Link>
          <Link to="/admin/settings" className="action-button">System Settings</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
