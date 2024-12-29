import React, { useState } from 'react';
import './ManageAppointments.css';

const ManageAppointments = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: "John Doe",
      type: "General Checkup",
      date: "2024-12-26",
      time: "09:00",
      status: "scheduled"
    },
    {
      id: 2,
      patientName: "Jane Smith",
      type: "Follow-up",
      date: "2024-12-27",
      time: "10:30",
      status: "completed"
    }
  ]);

  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDate, setFilterDate] = useState('');

  const handleStatusChange = (appointmentId, newStatus) => {
    setAppointments(prev =>
      prev.map(appointment =>
        appointment.id === appointmentId
          ? { ...appointment, status: newStatus }
          : appointment
      )
    );
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesStatus = filterStatus === 'all' || appointment.status === filterStatus;
    const matchesDate = !filterDate || appointment.date === filterDate;
    return matchesStatus && matchesDate;
  });

  return (
    <div className="manage-appointments">
      <div className="page-header">
        <h1>Manage Appointments</h1>
      </div>

      <div className="filters">
        <div className="filter-group">
          <label>Status:</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All</option>
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Date:</label>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </div>
      </div>

      <div className="appointments-table">
        <table>
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Type</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map(appointment => (
              <tr key={appointment.id}>
                <td>{appointment.patientName}</td>
                <td>{appointment.type}</td>
                <td>{appointment.date}</td>
                <td>{appointment.time}</td>
                <td>
                  <select
                    value={appointment.status}
                    onChange={(e) => handleStatusChange(appointment.id, e.target.value)}
                    className={`status-select ${appointment.status}`}
                  >
                    <option value="scheduled">Scheduled</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td>
                  <button className="view-btn">View Details</button>
                  <button className="reschedule-btn">Reschedule</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredAppointments.length === 0 && (
          <div className="no-results">
            <p>No appointments found matching the selected filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageAppointments;
