import React, { useState } from 'react';
import './ManagePatients.css';

const ManagePatients = () => {
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 234-567-8900",
      dateOfBirth: "1990-05-15",
      status: "active"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+1 234-567-8901",
      dateOfBirth: "1985-08-22",
      status: "active"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    status: 'active'
  });

  const handleAddPatient = (e) => {
    e.preventDefault();
    setPatients(prev => [...prev, { ...newPatient, id: prev.length + 1 }]);
    setNewPatient({
      name: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      status: 'active'
    });
    setShowAddModal(false);
  };

  const handleStatusChange = (patientId, newStatus) => {
    setPatients(prev =>
      prev.map(patient =>
        patient.id === patientId
          ? { ...patient, status: newStatus }
          : patient
      )
    );
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="manage-patients">
      <div className="page-header">
        <h1>Manage Patients</h1>
        <button 
          className="add-button"
          onClick={() => setShowAddModal(true)}
        >
          Add New Patient
        </button>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search patients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="patients-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Date of Birth</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map(patient => (
              <tr key={patient.id}>
                <td>{patient.name}</td>
                <td>{patient.email}</td>
                <td>{patient.phone}</td>
                <td>{patient.dateOfBirth}</td>
                <td>
                  <select
                    value={patient.status}
                    onChange={(e) => handleStatusChange(patient.id, e.target.value)}
                    className={`status-select ${patient.status}`}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="blocked">Blocked</option>
                  </select>
                </td>
                <td>
                  <button className="view-btn">View History</button>
                  <button className="edit-btn">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add New Patient</h2>
            <form onSubmit={handleAddPatient}>
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  value={newPatient.name}
                  onChange={(e) => setNewPatient(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  value={newPatient.email}
                  onChange={(e) => setNewPatient(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone:</label>
                <input
                  type="tel"
                  value={newPatient.phone}
                  onChange={(e) => setNewPatient(prev => ({ ...prev, phone: e.target.value }))}
                  required
                />
              </div>
              <div className="form-group">
                <label>Date of Birth:</label>
                <input
                  type="date"
                  value={newPatient.dateOfBirth}
                  onChange={(e) => setNewPatient(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit">Add Patient</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePatients;
