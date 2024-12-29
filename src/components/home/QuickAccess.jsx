import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalendarCheck, 
  faUserMd, 
  faLaptopMedical, 
  faHeadset 
} from '@fortawesome/free-solid-svg-icons';
import './QuickAccess.css';

const QuickAccess = () => {
  const navigate = useNavigate();

  const quickLinks = [
    {
      title: 'My Appointments',
      icon: faCalendarCheck,
      path: '/appointments',
      description: 'View and manage your appointments'
    },
    {
      title: 'Find Doctor',
      icon: faUserMd,
      path: '/doctors',
      description: 'Search for specialists'
    },
    {
      title: 'Virtual Consult',
      icon: faLaptopMedical,
      path: '/virtual-consult',
      description: 'Online consultation'
    },
    {
      title: 'Support',
      icon: faHeadset,
      path: '/support',
      description: '24/7 customer support'
    }
  ];

  return (
    <div className="quick-access">
      {quickLinks.map((link, index) => (
        <div
          key={index}
          className="quick-access-card"
          onClick={() => navigate(link.path)}
        >
          <span className="quick-access-icon">
            <FontAwesomeIcon icon={link.icon} />
          </span>
          <h3>{link.title}</h3>
          <p>{link.description}</p>
        </div>
      ))}
    </div>
  );
};

export default QuickAccess;
