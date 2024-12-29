import React, { useState } from 'react';
import SearchBar from './SearchBar';
import Filters from './Filters';
import './BookAppointment.css';

const BookAppointment = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [filters, setFilters] = useState({
    type: 'all',
    location: '',
    availableOnly: false,
    timeSlot: 'any'
  });
  const [sortBy, setSortBy] = useState('relevance');

  // Mock data - replace with API call
  const mockAppointments = [
    {
      id: 1,
      type: "General Checkup",
      location: "New York City",
      availableSlots: [
        "2024-01-25 09:00 AM",
        "2024-01-25 10:00 AM",
        "2024-01-25 02:00 PM"
      ],
      fee: 150,
      duration: "30 minutes"
    }
  ];

  const handleSearch = (searchTerm) => {
    // Mock search - replace with API call
    setSearchResults(mockAppointments);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const handleBookAppointment = (appointment, slot) => {
    // Implement booking logic
    console.log('Booking appointment:', appointment, 'for slot:', slot);
  };

  return (
    <div className="book-appointment-container">
      <div className="search-section">
        <h1>Book an Appointment</h1>
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="content-section">
        <aside className="filters-sidebar">
          <Filters 
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
          />
        </aside>

        <main className="appointments-grid">
          {searchResults.map(appointment => (
            <div key={appointment.id} className="appointment-card">
              <div className="appointment-type">{appointment.type}</div>
              <div className="appointment-details">
                <p>Location: {appointment.location}</p>
                <p>Duration: {appointment.duration}</p>
                <p>Fee: ${appointment.fee}</p>
              </div>
              <div className="available-slots">
                <h4>Available Slots</h4>
                {appointment.availableSlots.map((slot, index) => (
                  <button 
                    key={index}
                    onClick={() => handleBookAppointment(appointment, slot)}
                    className="slot-button"
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          ))}
          {searchResults.length === 0 && (
            <div className="no-results">
              <p>No appointments available. Try adjusting your search criteria.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default BookAppointment;
