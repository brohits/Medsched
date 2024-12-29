import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, 
  faCalendarAlt, 
  faUserMd, 
  faClipboardList 
} from '@fortawesome/free-solid-svg-icons';
import './HowItWorks.css';

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: 'Find a Doctor',
      description: 'Search and filter through our network of qualified healthcare professionals',
      icon: faSearch
    },
    {
      number: 2,
      title: 'Book an Appointment',
      description: 'Choose a convenient time slot and book your appointment',
      icon: faCalendarAlt
    },
    {
      number: 3,
      title: 'Get Consultation',
      description: 'Visit the doctor or attend a virtual consultation',
      icon: faUserMd
    },
    {
      number: 4,
      title: 'Follow Up',
      description: 'Stay connected with your doctor and track your progress',
      icon: faClipboardList
    }
  ];

  return (
    <div className="how-it-works">
      {steps.map((step, index) => (
        <div key={index} className="step-card">
          <div className="step-number">{step.number}</div>
          <div className="step-icon">
            <FontAwesomeIcon icon={step.icon} />
          </div>
          <h3>{step.title}</h3>
          <p>{step.description}</p>
        </div>
      ))}
    </div>
  );
};

export default HowItWorks;
