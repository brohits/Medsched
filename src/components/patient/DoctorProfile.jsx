import React from 'react';
import './DoctorProfile.css';

const DoctorProfile = ({ doctor, onClose, onBookAppointment }) => {
  if (!doctor) return null;

  return (
    <div className="doctor-profile-modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        
        <div className="profile-header">
          <img src={doctor.photo || '/default-avatar.png'} alt={doctor.name} className="profile-photo" />
          <div className="profile-header-info">
            <h2>{doctor.name}</h2>
            <p className="specialization">{doctor.specialization}</p>
            <div className="rating">
              <span className="stars">{'★'.repeat(Math.floor(doctor.rating))}</span>
              <span className="rating-count">({doctor.reviewCount} reviews)</span>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h3>About</h3>
          <p>{doctor.about || 'No description available.'}</p>
        </div>

        <div className="profile-section">
          <h3>Qualifications</h3>
          <ul className="qualifications-list">
            {doctor.qualifications?.map((qual, index) => (
              <li key={index}>{qual}</li>
            )) || <li>Information not available</li>}
          </ul>
        </div>

        <div className="profile-section">
          <h3>Experience</h3>
          <p>{doctor.experience} years of experience</p>
          {doctor.previousWorkplaces && (
            <ul className="experience-list">
              {doctor.previousWorkplaces.map((workplace, index) => (
                <li key={index}>{workplace}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="profile-section">
          <h3>Clinic Information</h3>
          <div className="clinic-info">
            <div className="info-item">
              <span className="label">Location:</span>
              <span>{doctor.location}</span>
            </div>
            <div className="info-item">
              <span className="label">Working Hours:</span>
              <span>{doctor.workingHours}</span>
            </div>
            <div className="info-item">
              <span className="label">Consultation Fee:</span>
              <span>${doctor.fee}</span>
            </div>
          </div>
        </div>

        <div className="profile-actions">
          <button onClick={onClose} className="secondary-button">
            Close
          </button>
          <button onClick={() => onBookAppointment(doctor)} className="primary-button">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
