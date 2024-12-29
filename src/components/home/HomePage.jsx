import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from './HeroSection';
import QuickAccess from './QuickAccess';
import Specializations from './Specializations';
import HowItWorks from './HowItWorks';
import Testimonials from './Testimonials';
import Features from './Features';
import Announcements from './Announcements';
import ContactSection from './ContactSection';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  const handleFindDoctor = () => {
    navigate('/doctors');
  };

  const handleBookAppointment = () => {
    navigate('/appointments');
  };

  return (
    <div className="home-page">
      <HeroSection 
        onFindDoctor={handleFindDoctor}
        onBookAppointment={handleBookAppointment}
      />
      
      <QuickAccess />
      
      <section className="section">
        <h2 className="section-title">Find Specialists</h2>
        <Specializations />
      </section>

      <section className="section light-bg">
        <h2 className="section-title">How It Works</h2>
        <HowItWorks />
      </section>

      <section className="section">
        <h2 className="section-title">What Our Patients Say</h2>
        <Testimonials />
      </section>

      <section className="section light-bg">
        <h2 className="section-title">Why Choose Us</h2>
        <Features />
      </section>

      <section className="section">
        <h2 className="section-title">Latest Updates</h2>
        <Announcements />
      </section>

      <ContactSection />
    </div>
  );
};

export default HomePage;
