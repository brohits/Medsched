import React, { useState } from 'react';
import './AppointmentRequests.css';

const AppointmentRequests = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      patientName: "John Doe",
      date: "2024-12-26",
      time: "09:00",
      type: "General Checkup",
      notes: "First time visit",
      status: "pending"
    },
    {
      id: 2,
      patientName: "Jane Smith",
      date: "2024-12-27",
      time: "10:30",
      type: "Follow-up",
      notes: "Follow-up for previous treatment",
      status: "pending"
    }
  ]);

  const handleApprove = (id) => {
    setRequests(prev => prev.map(request => {
      if (request.id === id) {
        return { ...request, status: 'approved' };
      }
      return request;
    }));
  };

  const handleDecline = (id) => {
    setRequests(prev => prev.map(request => {
      if (request.id === id) {
        return { ...request, status: 'declined' };
      }
      return request;
    }));
  };

  return (
    <div className="appointment-requests">
      <h1>Appointment Requests</h1>

      <div className="requests-container">
        {requests.map(request => (
          <div key={request.id} className={`request-card ${request.status}`}>
            <div className="request-header">
              <h3>{request.patientName}</h3>
              <span className={`status ${request.status}`}>
                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
              </span>
            </div>

            <div className="request-details">
              <div className="detail-item">
                <span className="label">Date:</span>
                <span>{request.date}</span>
              </div>
              <div className="detail-item">
                <span className="label">Time:</span>
                <span>{request.time}</span>
              </div>
              <div className="detail-item">
                <span className="label">Type:</span>
                <span>{request.type}</span>
              </div>
              <div className="detail-item">
                <span className="label">Notes:</span>
                <span>{request.notes}</span>
              </div>
            </div>

            {request.status === 'pending' && (
              <div className="request-actions">
                <button 
                  className="action-btn approve"
                  onClick={() => handleApprove(request.id)}
                >
                  Approve
                </button>
                <button 
                  className="action-btn decline"
                  onClick={() => handleDecline(request.id)}
                >
                  Decline
                </button>
              </div>
            )}
          </div>
        ))}

        {requests.length === 0 && (
          <div className="no-requests">
            <p>No pending appointment requests</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentRequests;
