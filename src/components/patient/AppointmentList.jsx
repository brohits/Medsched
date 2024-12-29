import React from 'react';
import { format } from 'date-fns';
import './AppointmentList.css';

const AppointmentList = ({ appointments, onSelect, onReschedule, onCancel }) => {
  const isUpcoming = (date) => new Date(date) > new Date();

  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'status-badge status-confirmed';
      case 'pending':
        return 'status-badge status-pending';
      case 'completed':
        return 'status-badge status-completed';
      case 'cancelled':
        return 'status-badge status-cancelled';
      default:
        return 'status-badge';
    }
  };

  return (
    <div className="appointment-list">
      {appointments.map((appointment) => (
        <div key={appointment.id} className="appointment-card">
          <div className="appointment-header">
            <div className="appointment-type">
              <h3>{appointment.type}</h3>
              <p className="duration">{appointment.duration}</p>
            </div>
            <span className={getStatusBadgeClass(appointment.status)}>
              {appointment.status}
            </span>
          </div>

          <div className="appointment-details">
            <div className="detail-item">
              <i className="icon">📅</i>
              <span>{format(new Date(appointment.date), 'MMMM d, yyyy')}</span>
            </div>
            <div className="detail-item">
              <i className="icon">⏰</i>
              <span>{format(new Date(appointment.date), 'h:mm a')}</span>
            </div>
            <div className="detail-item">
              <i className="icon">🏥</i>
              <span>{appointment.location}</span>
            </div>
            <div className="detail-item">
              <i className="icon">💳</i>
              <span>${appointment.amount}</span>
            </div>
          </div>

          <div className="appointment-actions">
            <button 
              className="action-btn view-details"
              onClick={() => onSelect(appointment)}
            >
              View Details
            </button>
            
            {isUpcoming(appointment.date) && (
              <>
                <button 
                  className="action-btn reschedule"
                  onClick={() => onReschedule(appointment.id)}
                >
                  Reschedule
                </button>
                <button 
                  className="action-btn cancel"
                  onClick={() => onCancel(appointment.id)}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      ))}

      {appointments.length === 0 && (
        <div className="no-appointments">
          <p>No appointments found</p>
        </div>
      )}
    </div>
  );
};

export default AppointmentList;
