import React from 'react';
import './DoctorDashboard.css';

const DoctorDashboard = () => {
  // Mock data for dashboard stats
  const stats = {
    todayAppointments: 8,
    pendingRequests: 5,
    totalPatients: 120,
    upcomingAppointments: 15
  };

  // Mock data for recent appointments
  const recentAppointments = [
    {
      id: 1,
      patientName: "John Doe",
      date: "2024-12-24",
      time: "14:30",
      type: "General Checkup",
      status: "Confirmed"
    },
    {
      id: 2,
      patientName: "Jane Smith",
      date: "2024-12-24",
      time: "15:00",
      type: "Follow-up",
      status: "Pending"
    }
  ];

  return (
    <div className="doctor-dashboard">
      <h1>Doctor Dashboard</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Today's Appointments</h3>
          <p className="stat-number">{stats.todayAppointments}</p>
        </div>
        <div className="stat-card">
          <h3>Pending Requests</h3>
          <p className="stat-number">{stats.pendingRequests}</p>
        </div>
        <div className="stat-card">
          <h3>Total Patients</h3>
          <p className="stat-number">{stats.totalPatients}</p>
        </div>
        <div className="stat-card">
          <h3>Upcoming Appointments</h3>
          <p className="stat-number">{stats.upcomingAppointments}</p>
        </div>
      </div>

      <div className="recent-appointments">
        <h2>Recent Appointments</h2>
        <div className="appointments-table">
          <table>
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentAppointments.map(appointment => (
                <tr key={appointment.id}>
                  <td>{appointment.patientName}</td>
                  <td>{appointment.date}</td>
                  <td>{appointment.time}</td>
                  <td>{appointment.type}</td>
                  <td>
                    <span className={`status ${appointment.status.toLowerCase()}`}>
                      {appointment.status}
                    </span>
                  </td>
                  <td>
                    <button className="action-btn view">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
