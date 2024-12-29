import React from 'react';
import './DoctorCard.css';

const DoctorCard = ({ doctor, onSelect }) => {
  const {
    name,
    photo,
    specialization,
    experience,
    rating,
    reviewCount,
    location,
    consultationType,
    fee,
  } = doctor;

  return (
    <div className="doctor-card">
      <div className="doctor-header">
        <img src={photo || '/default-avatar.png'} alt={name} className="doctor-photo" />
        <div className="doctor-rating">
          <span className="stars">{'★'.repeat(Math.floor(rating))}</span>
          <span className="rating-count">({reviewCount} reviews)</span>
        </div>
      </div>

      <div className="doctor-info">
        <h3>{name}</h3>
        <p className="specialization">{specialization}</p>
        <p className="experience">{experience} years experience</p>
        
        <div className="location-info">
          <i className="location-icon">📍</i>
          <span>{location}</span>
        </div>

        <div className="consultation-info">
          <div className="consultation-type">
            <i className="type-icon">{consultationType === 'virtual' ? '💻' : '🏥'}</i>
            <span>{consultationType === 'virtual' ? 'Virtual Consultation' : 'In-Person Visit'}</span>
          </div>
          <div className="consultation-fee">
            <span className="fee-amount">${fee}</span>
            <span className="fee-text">per visit</span>
          </div>
        </div>
      </div>

      <div className="doctor-actions">
        <button onClick={() => onSelect(doctor)} className="view-profile-btn">
          View Profile
        </button>
        <button onClick={() => onSelect(doctor)} className="book-appointment-btn">
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;
