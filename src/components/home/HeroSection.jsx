import React from 'react';
import './HeroSection.css';
import medImage from './3683409.jpg';

const HeroSection = ({ onFindDoctor, onBookAppointment }) => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-text">
          <h1>Find the Best Doctors and Schedule Appointments Effortlessly</h1>
          <p>
            Connect with top healthcare professionals, book appointments, and manage your
            health journey all in one place. Experience healthcare made simple.
          </p>
          <div className="hero-buttons">
            <button className="primary-button" onClick={onFindDoctor}>
              Find a Doctor
            </button>
            <button className="secondary-button" onClick={onBookAppointment}>
              Book Appointment
            </button>
          </div>
        </div>
        <div className="hero-image">
         <img
            src={medImage}
            alt="Healthcare"/>
        </div>
      </div>

      <div className="hero-stats">
        <div className="stat-item">
          <span className="stat-number">1000+</span>
          <span className="stat-label">Verified Doctors</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">50k+</span>
          <span className="stat-label">Happy Patients</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">20+</span>
          <span className="stat-label">Specializations</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
