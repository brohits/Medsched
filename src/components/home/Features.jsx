import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMobile, 
  faStar, 
  faLaptopMedical, 
  faLock, 
  faHandshake, 
  faBell 
} from '@fortawesome/free-solid-svg-icons';
import './Features.css';

const Features = () => {
  const features = [
    {
      title: 'Easy Scheduling',
      description: 'Book appointments with just a few clicks',
      icon: faMobile
    },
    {
      title: 'Top Specialists',
      description: 'Access to verified healthcare professionals',
      icon: faStar
    },
    {
      title: 'Virtual Consult',
      description: 'Connect with doctors from anywhere',
      icon: faLaptopMedical
    },
    {
      title: 'Secure Platform',
      description: 'Your health data is safe with us',
      icon: faLock
    },
    {
      title: '24/7 Support',
      description: 'Round-the-clock customer assistance',
      icon: faHandshake
    },
    {
      title: 'Smart Reminders',
      description: 'Never miss an appointment',
      icon: faBell
    }
  ];

  return (
    <div className="features-grid">
      {features.map((feature, index) => (
        <div key={index} className="feature-card">
          <span className="feature-icon">
            <FontAwesomeIcon icon={feature.icon} />
          </span>
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Features;
