import React, { useState } from 'react';
import AppointmentList from './AppointmentList';
import AppointmentDetails from './AppointmentDetails';
import AppointmentFilters from './AppointmentFilters';
import { format } from 'date-fns';
import './MyAppointments.css';

const MyAppointments = () => {
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [filters, setFilters] = useState({
    period: 'all',
    status: 'all',
    sortBy: 'date-desc'
  });

  // Mock data - replace with API calls
  const appointments = [
    {
      id: 1,
      type: "General Checkup",
      date: new Date(2024, 0, 25, 14, 30),
      duration: "30 minutes",
      status: "confirmed",
      location: "123 Medical Center, New York",
      bookingId: "APT20240125143",
      paymentStatus: "paid",
      amount: 150
    },
    {
      id: 2,
      type: "Follow-up Visit",
      date: new Date(2024, 0, 28, 10, 0),
      duration: "20 minutes",
      status: "pending",
      location: "123 Medical Center, New York",
      bookingId: "APT20240128100",
      paymentStatus: "pending",
      amount: 100
    }
  ];

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleAppointmentSelect = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const handleAppointmentClose = () => {
    setSelectedAppointment(null);
  };

  const handleReschedule = (appointmentId, newDate) => {
    // Implement rescheduling logic
    console.log('Rescheduling appointment:', appointmentId, 'to', newDate);
  };

  const handleCancel = (appointmentId) => {
    // Implement cancellation logic
    console.log('Cancelling appointment:', appointmentId);
  };

  const handleFeedbackSubmit = (appointmentId, rating, comment) => {
    // Implement feedback submission logic
    console.log('Feedback submitted for appointment:', appointmentId, rating, comment);
  };

  const filterAppointments = (appointments) => {
    let filtered = [...appointments];

    // Filter by period
    if (filters.period !== 'all') {
      const now = new Date();
      filtered = filtered.filter(apt => {
        const aptDate = new Date(apt.date);
        switch (filters.period) {
          case 'upcoming':
            return aptDate > now;
          case 'past':
            return aptDate < now;
          case 'today':
            return format(aptDate, 'yyyy-MM-dd') === format(now, 'yyyy-MM-dd');
          default:
            return true;
        }
      });
    }

    // Filter by status
    if (filters.status !== 'all') {
      filtered = filtered.filter(apt => apt.status === filters.status);
    }

    // Sort appointments
    filtered.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return filters.sortBy === 'date-desc' ? dateB - dateA : dateA - dateB;
    });

    return filtered;
  };

  const filteredAppointments = filterAppointments(appointments);

  return (
    <div className="my-appointments">
      <div className="appointments-header">
        <h1>My Appointments</h1>
        <AppointmentFilters 
          filters={filters} 
          onFilterChange={handleFilterChange} 
        />
      </div>

      <div className="appointments-content">
        <AppointmentList
          appointments={filteredAppointments}
          onSelect={handleAppointmentSelect}
          onReschedule={handleReschedule}
          onCancel={handleCancel}
        />
      </div>

      {selectedAppointment && (
        <AppointmentDetails
          appointment={selectedAppointment}
          onClose={handleAppointmentClose}
          onReschedule={handleReschedule}
          onCancel={handleCancel}
          onFeedbackSubmit={handleFeedbackSubmit}
        />
      )}
    </div>
  );
};

export default MyAppointments;
