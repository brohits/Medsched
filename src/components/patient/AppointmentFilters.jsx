import React from 'react';
import './AppointmentFilters.css';

const AppointmentFilters = ({ filters, onFilterChange }) => {
  const handleChange = (field, value) => {
    onFilterChange({
      ...filters,
      [field]: value
    });
  };

  return (
    <div className="appointment-filters">
      <div className="filter-group">
        <label htmlFor="period">Time Period</label>
        <select
          id="period"
          value={filters.period}
          onChange={(e) => handleChange('period', e.target.value)}
        >
          <option value="all">All Time</option>
          <option value="upcoming">Upcoming</option>
          <option value="past">Past</option>
          <option value="today">Today</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={filters.status}
          onChange={(e) => handleChange('status', e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="confirmed">Confirmed</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="sortBy">Sort By</label>
        <select
          id="sortBy"
          value={filters.sortBy}
          onChange={(e) => handleChange('sortBy', e.target.value)}
        >
          <option value="date-desc">Latest First</option>
          <option value="date-asc">Oldest First</option>
        </select>
      </div>
    </div>
  );
};

export default AppointmentFilters;
