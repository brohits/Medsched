import React from 'react';
import './Filters.css';

const Filters = ({ onFilterChange, onSortChange }) => {
  const specializations = [
    'All',
    'Cardiologist',
    'Dentist',
    'Dermatologist',
    'General Physician',
    'Neurologist',
    'Pediatrician',
    'Psychiatrist',
  ];

  return (
    <div className="filters-container">
      <div className="filters-section">
        <h3>Filters</h3>
        <div className="filter-group">
          <label>Specialization</label>
          <select onChange={(e) => onFilterChange('specialization', e.target.value)}>
            {specializations.map(spec => (
              <option key={spec} value={spec.toLowerCase()}>{spec}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Location</label>
          <input 
            type="text" 
            placeholder="Enter city or area"
            onChange={(e) => onFilterChange('location', e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label>Availability</label>
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="available"
              onChange={(e) => onFilterChange('availableOnly', e.target.checked)}
            />
            <label htmlFor="available">Show available only</label>
          </div>
        </div>

        <div className="filter-group">
          <label>Rating</label>
          <select onChange={(e) => onFilterChange('rating', e.target.value)}>
            <option value="any">Any Rating</option>
            <option value="4">4+ Stars</option>
            <option value="3">3+ Stars</option>
            <option value="2">2+ Stars</option>
          </select>
        </div>
      </div>

      <div className="filters-section">
        <h3>Sort By</h3>
        <select onChange={(e) => onSortChange(e.target.value)}>
          <option value="relevance">Relevance</option>
          <option value="rating">Highest Rated</option>
          <option value="experience">Most Experienced</option>
          <option value="name">Name A-Z</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
