import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faNotesMedical,
  faPills,
  faAllergies,
  faEdit,
  faPlus,
  faTrash,
  faFileMedical,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
import './MedicalHistory.css';

const MedicalHistory = () => {
  const [editMode, setEditMode] = useState(false);
  const [medicalInfo, setMedicalInfo] = useState({
    conditions: [
      { id: 1, name: 'Hypertension', since: '2020', status: 'Active' },
      { id: 2, name: 'Asthma', since: '2015', status: 'Managed' }
    ],
    medications: [
      { id: 1, name: 'Lisinopril', dosage: '10mg', frequency: 'Daily' },
      { id: 2, name: 'Ventolin Inhaler', dosage: '100mcg', frequency: 'As needed' }
    ],
    allergies: [
      { id: 1, type: 'Medication', name: 'Penicillin', severity: 'Severe' },
      { id: 2, type: 'Food', name: 'Peanuts', severity: 'Moderate' }
    ]
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [addType, setAddType] = useState(null);

  const handleAdd = (type) => {
    setAddType(type);
    setShowAddModal(true);
  };

  const handleDelete = (type, id) => {
    setMedicalInfo(prev => ({
      ...prev,
      [type]: prev[type].filter(item => item.id !== id)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    setShowAddModal(false);
  };

  const renderAddModal = () => {
    if (!showAddModal) return null;

    const getFields = () => {
      switch (addType) {
        case 'conditions':
          return (
            <>
              <div className="form-group">
                <label>Condition Name</label>
                <input type="text" placeholder="Enter condition name" />
              </div>
              <div className="form-group">
                <label>Since</label>
                <input type="text" placeholder="Year diagnosed" />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select>
                  <option value="Active">Active</option>
                  <option value="Managed">Managed</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>
            </>
          );
        case 'medications':
          return (
            <>
              <div className="form-group">
                <label>Medication Name</label>
                <input type="text" placeholder="Enter medication name" />
              </div>
              <div className="form-group">
                <label>Dosage</label>
                <input type="text" placeholder="Enter dosage" />
              </div>
              <div className="form-group">
                <label>Frequency</label>
                <input type="text" placeholder="How often taken" />
              </div>
            </>
          );
        case 'allergies':
          return (
            <>
              <div className="form-group">
                <label>Allergy Type</label>
                <select>
                  <option value="Medication">Medication</option>
                  <option value="Food">Food</option>
                  <option value="Environmental">Environmental</option>
                </select>
              </div>
              <div className="form-group">
                <label>Allergen</label>
                <input type="text" placeholder="Enter allergen name" />
              </div>
              <div className="form-group">
                <label>Severity</label>
                <select>
                  <option value="Mild">Mild</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Severe">Severe</option>
                </select>
              </div>
            </>
          );
        default:
          return null;
      }
    };

    return (
      <div className="modal">
        <div className="modal-content">
          <h3>Add {addType.charAt(0).toUpperCase() + addType.slice(1, -1)}</h3>
          <form onSubmit={handleSubmit}>
            {getFields()}
            <div className="modal-actions">
              <button type="button" onClick={() => setShowAddModal(false)}>Cancel</button>
              <button type="submit">Add</button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="medical-history">
      <div className="section-header">
        <h2>Medical History</h2>
        <button 
          className="edit-button"
          onClick={() => setEditMode(!editMode)}
        >
          <FontAwesomeIcon icon={faEdit} />
          {editMode ? 'Save Changes' : 'Edit'}
        </button>
      </div>

      <div className="medical-sections">
        <section className="medical-section">
          <div className="section-title">
            <FontAwesomeIcon icon={faNotesMedical} />
            <h3>Medical Conditions</h3>
            {editMode && (
              <button 
                className="add-button"
                onClick={() => handleAdd('conditions')}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            )}
          </div>
          <div className="items-list">
            {medicalInfo.conditions.map(condition => (
              <div key={condition.id} className="medical-item">
                <div className="item-info">
                  <h4>{condition.name}</h4>
                  <p>Since: {condition.since}</p>
                  <span className={`status ${condition.status.toLowerCase()}`}>
                    {condition.status}
                  </span>
                </div>
                {editMode && (
                  <button 
                    className="delete-button"
                    onClick={() => handleDelete('conditions', condition.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="medical-section">
          <div className="section-title">
            <FontAwesomeIcon icon={faPills} />
            <h3>Current Medications</h3>
            {editMode && (
              <button 
                className="add-button"
                onClick={() => handleAdd('medications')}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            )}
          </div>
          <div className="items-list">
            {medicalInfo.medications.map(medication => (
              <div key={medication.id} className="medical-item">
                <div className="item-info">
                  <h4>{medication.name}</h4>
                  <p>Dosage: {medication.dosage}</p>
                  <p>Frequency: {medication.frequency}</p>
                </div>
                {editMode && (
                  <button 
                    className="delete-button"
                    onClick={() => handleDelete('medications', medication.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="medical-section">
          <div className="section-title">
            <FontAwesomeIcon icon={faAllergies} />
            <h3>Allergies</h3>
            {editMode && (
              <button 
                className="add-button"
                onClick={() => handleAdd('allergies')}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            )}
          </div>
          <div className="items-list">
            {medicalInfo.allergies.map(allergy => (
              <div key={allergy.id} className="medical-item">
                <div className="item-info">
                  <h4>{allergy.name}</h4>
                  <p>Type: {allergy.type}</p>
                  <span className={`severity ${allergy.severity.toLowerCase()}`}>
                    {allergy.severity}
                  </span>
                </div>
                {editMode && (
                  <button 
                    className="delete-button"
                    onClick={() => handleDelete('allergies', allergy.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      {renderAddModal()}
    </div>
  );
};

export default MedicalHistory;
