import React, { useState } from 'react';
import './Schedule.css';

const Schedule = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [schedule, setSchedule] = useState([
    {
      id: 1,
      time: '09:00',
      patient: 'John Doe',
      type: 'General Checkup',
      status: 'Confirmed'
    },
    {
      id: 2,
      time: '10:00',
      patient: 'Jane Smith',
      type: 'Follow-up',
      status: 'Confirmed'
    },
    {
      id: 3,
      time: '11:00',
      patient: null,
      type: null,
      status: 'Available'
    }
  ]);

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  const handleDateChange = (event) => {
    setSelectedDate(new Date(event.target.value));
  };

  const handleBlockTime = (time) => {
    setSchedule(prev => prev.map(slot => {
      if (slot.time === time) {
        return {
          ...slot,
          status: slot.status === 'Blocked' ? 'Available' : 'Blocked'
        };
      }
      return slot;
    }));
  };

  return (
    <div className="schedule-container">
      <h1>Schedule Management</h1>

      <div className="schedule-header">
        <div className="date-picker">
          <label htmlFor="date">Select Date:</label>
          <input
            type="date"
            id="date"
            value={selectedDate.toISOString().split('T')[0]}
            onChange={handleDateChange}
          />
        </div>
      </div>

      <div className="time-slots">
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Patient</th>
              <th>Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {timeSlots.map(time => {
              const slot = schedule.find(s => s.time === time) || {
                time,
                patient: null,
                type: null,
                status: 'Available'
              };

              return (
                <tr key={time} className={`slot ${slot.status.toLowerCase()}`}>
                  <td>{time}</td>
                  <td>{slot.patient || '-'}</td>
                  <td>{slot.type || '-'}</td>
                  <td>
                    <span className={`status ${slot.status.toLowerCase()}`}>
                      {slot.status}
                    </span>
                  </td>
                  <td>
                    {slot.status === 'Available' || slot.status === 'Blocked' ? (
                      <button
                        className={`action-btn ${slot.status === 'Blocked' ? 'unblock' : 'block'}`}
                        onClick={() => handleBlockTime(time)}
                      >
                        {slot.status === 'Blocked' ? 'Unblock' : 'Block'}
                      </button>
                    ) : (
                      <button className="action-btn view">View</button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Schedule;
