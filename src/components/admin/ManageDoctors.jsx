import React, { useState } from 'react';
import './ManageDoctors.css';

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      name: "Dr. John Smith",
      specialization: "Cardiologist",
      email: "john.smith@example.com",
      phone: "+1 234-567-8900",
      status: "active"
    },
    {
      id: 2,
      name: "Dr. Sarah Johnson",
      specialization: "Pediatrician",
      email: "sarah.johnson@example.com",
      phone: "+1 234-567-8901",
      status: "active"
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newDoctor, setNewDoctor] = useState({
    name: '',
    specialization: '',
    email: '',
    phone: '',
    status: 'active'
  });

  const handleAddDoctor = (e) => {
    e.preventDefault();
    setDoctors(prev => [...prev, { ...newDoctor, id: prev.length + 1 }]);
    setNewDoctor({
      name: '',
      specialization: '',
      email: '',
      phone: '',
      status: 'active'
    });
    setShowAddModal(false);
  };

  const handleStatusChange = (doctorId, newStatus) => {
    setDoctors(prev =>
      prev.map(doctor =>
        doctor.id === doctorId
          ? { ...doctor, status: newStatus }
          : doctor
      )
    );
  };

  return (
    <div className="manage-doctors">
      <div className="page-header">
        <h1>Manage Doctors</h1>
        <button 
          className="add-button"
          onClick={() => setShowAddModal(true)}
        >
          Add New Doctor
        </button>
      </div>

      <div className="doctors-grid">
        {doctors.map(doctor => (
          <div key={doctor.id} className={`doctor-card ${doctor.status}`}>
            <div className="doctor-info">
              <h3>{doctor.name}</h3>
              <p className="specialization">{doctor.specialization}</p>
              <p className="contact">
                <i className="icon">📧</i> {doctor.email}
              </p>
              <p className="contact">
                <i className="icon">📱</i> {doctor.phone}
              </p>
            </div>
            <div className="doctor-actions">
              <select
                value={doctor.status}
                onChange={(e) => handleStatusChange(doctor.id, e.target.value)}
                className={`status-select ${doctor.status}`}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
              <button className="edit-btn">Edit</button>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add New Doctor</h2>
            <form onSubmit={handleAddDoctor}>
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  value={newDoctor.name}
                  onChange={(e) => setNewDoctor(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
              <div className="form-group">
                <label>Specialization:</label>
                <input
                  type="text"
                  value={newDoctor.specialization}
                  onChange={(e) => setNewDoctor(prev => ({ ...prev, specialization: e.target.value }))}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  value={newDoctor.email}
                  onChange={(e) => setNewDoctor(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone:</label>
                <input
                  type="tel"
                  value={newDoctor.phone}
                  onChange={(e) => setNewDoctor(prev => ({ ...prev, phone: e.target.value }))}
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit">Add Doctor</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageDoctors;
