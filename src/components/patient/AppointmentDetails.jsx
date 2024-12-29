import React, { useState } from 'react';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import './AppointmentDetails.css';

const AppointmentDetails = ({ 
  appointment, 
  onClose, 
  onReschedule, 
  onCancel,
  onFeedbackSubmit 
}) => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const isUpcoming = new Date(appointment.date) > new Date();
  const isPast = new Date(appointment.date) < new Date();

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    onFeedbackSubmit(appointment.id, rating, comment);
    setShowFeedback(false);
  };

  return (
    <div className="appointment-details-modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        
        <div className="appointment-header">
          <h2>Appointment Details</h2>
          <span className={`status-badge status-${appointment.status.toLowerCase()}`}>
            {appointment.status}
          </span>
        </div>

        <div className="details-section">
          <h3>Appointment Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="label">Type:</span>
              <span>{appointment.type}</span>
            </div>
            <div className="info-item">
              <span className="label">Date:</span>
              <span>{format(new Date(appointment.date), 'MMMM d, yyyy')}</span>
            </div>
            <div className="info-item">
              <span className="label">Time:</span>
              <span>{format(new Date(appointment.date), 'h:mm a')}</span>
            </div>
            <div className="info-item">
              <span className="label">Duration:</span>
              <span>{appointment.duration}</span>
            </div>
            <div className="info-item">
              <span className="label">Location:</span>
              <span>{appointment.location}</span>
            </div>
            <div className="info-item">
              <span className="label">Booking ID:</span>
              <span>{appointment.bookingId}</span>
            </div>
            <div className="info-item">
              <span className="label">Payment Status:</span>
              <span className={`payment-status ${appointment.paymentStatus}`}>
                {appointment.paymentStatus}
              </span>
            </div>
          </div>
        </div>

        <div className="action-buttons">
          {isUpcoming && (
            <>
              <button 
                className="secondary-button"
                onClick={() => onReschedule(appointment)}
              >
                Reschedule
              </button>
              <button 
                className="danger-button"
                onClick={() => onCancel(appointment)}
              >
                Cancel
              </button>
            </>
          )}
        </div>

        {isPast && !showFeedback && (
          <div className="details-section">
            <h3>Feedback</h3>
            <button 
              className="secondary-button"
              onClick={() => setShowFeedback(true)}
            >
              Provide Feedback
            </button>
          </div>
        )}

        {showFeedback && (
          <div className="feedback-form">
            <h3>Rate Your Experience</h3>
            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <FontAwesomeIcon
                  key={star}
                  icon={faStarSolid}
                  className={`star ${star <= rating ? 'active' : ''}`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
            <textarea
              placeholder="Share your experience..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <div className="feedback-actions">
              <button 
                className="primary-button"
                onClick={handleFeedbackSubmit}
                disabled={!rating}
              >
                Submit Feedback
              </button>
              <button 
                className="secondary-button"
                onClick={() => setShowFeedback(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentDetails;
