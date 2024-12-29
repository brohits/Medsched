import React, { useState } from 'react';
import './AppointmentHistory.css';

const AppointmentHistory = () => {
  const [filter, setFilter] = useState('all');
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [feedback, setFeedback] = useState({ rating: 0, comment: '' });

  const appointments = [
    {
      id: 1,
      doctorName: 'Dr. John Smith',
      specialization: 'Cardiologist',
      date: '2024-01-25',
      time: '14:30',
      status: 'upcoming',
      type: 'in-person'
    },
    {
      id: 2,
      doctorName: 'Dr. Sarah Wilson',
      specialization: 'Dermatologist',
      date: '2024-01-15',
      time: '10:00',
      status: 'completed',
      type: 'virtual',
      rating: 5
    },
    {
      id: 3,
      doctorName: 'Dr. Michael Brown',
      specialization: 'Pediatrician',
      date: '2024-01-10',
      time: '16:45',
      status: 'cancelled',
      type: 'in-person'
    }
  ];

  const handleFeedbackSubmit = () => {
    console.log('Feedback submitted:', { appointmentId: selectedAppointment.id, ...feedback });
    setShowFeedbackModal(false);
    setSelectedAppointment(null);
    setFeedback({ rating: 0, comment: '' });
  };

  const openFeedbackModal = (appointment) => {
    setSelectedAppointment(appointment);
    setShowFeedbackModal(true);
  };

  const handleCancelAppointment = (appointmentId) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      console.log('Cancelling appointment:', appointmentId);
    }
  };

  const filteredAppointments = appointments.filter(appointment => {
    if (filter === 'all') return true;
    return appointment.status === filter;
  });

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'upcoming':
        return 'status-badge upcoming';
      case 'completed':
        return 'status-badge completed';
      case 'cancelled':
        return 'status-badge cancelled';
      default:
        return 'status-badge';
    }
  };

  return (
    <div className="appointment-history">
      <div className="history-header">
        <h2>Appointment History</h2>
        <div className="filter-buttons">
          <button
            className={'filter-btn ' + (filter === 'all' ? 'active' : '')}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={'filter-btn ' + (filter === 'upcoming' ? 'active' : '')}
            onClick={() => setFilter('upcoming')}
          >
            Upcoming
          </button>
          <button
            className={'filter-btn ' + (filter === 'completed' ? 'active' : '')}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
          <button
            className={'filter-btn ' + (filter === 'cancelled' ? 'active' : '')}
            onClick={() => setFilter('cancelled')}
          >
            Cancelled
          </button>
        </div>
      </div>

      <div className="appointments-list">
        {filteredAppointments.map(appointment => (
          <div key={appointment.id} className="appointment-card">
            <div className="appointment-info">
              <h3>{appointment.doctorName}</h3>
              <p className="specialization">{appointment.specialization}</p>
              <div className="appointment-details">
                <span>📅 {appointment.date}</span>
                <span>⏰ {appointment.time}</span>
                <span>{appointment.type === 'virtual' ? '💻 Virtual' : '🏥 In-person'}</span>
              </div>
              <span className={getStatusBadgeClass(appointment.status)}>
                {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
              </span>
            </div>
            
            <div className="appointment-actions">
              {appointment.status === 'upcoming' && (
                <button
                  className="cancel-btn"
                  onClick={() => handleCancelAppointment(appointment.id)}
                >
                  Cancel Appointment
                </button>
              )}
              {appointment.status === 'completed' && !appointment.rating && (
                <button
                  className="feedback-btn"
                  onClick={() => openFeedbackModal(appointment)}
                >
                  Leave Feedback
                </button>
              )}
              {appointment.rating && (
                <div className="rating">
                  {'⭐'.repeat(appointment.rating)}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {showFeedbackModal && (
        <div className="feedback-modal">
          <div className="modal-content">
            <h3>Leave Feedback</h3>
            <p>Appointment with {selectedAppointment.doctorName}</p>
            
            <div className="rating-input">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={'star ' + (star <= feedback.rating ? 'filled' : '')}
                  onClick={() => setFeedback(prev => ({ ...prev, rating: star }))}
                >
                  ★
                </span>
              ))}
            </div>

            <textarea
              placeholder="Share your experience..."
              value={feedback.comment}
              onChange={(e) => setFeedback(prev => ({ ...prev, comment: e.target.value }))}
            />

            <div className="modal-actions">
              <button 
                className="cancel-btn"
                onClick={() => setShowFeedbackModal(false)}
              >
                Cancel
              </button>
              <button 
                className="submit-btn"
                onClick={handleFeedbackSubmit}
                disabled={!feedback.rating}
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentHistory;
