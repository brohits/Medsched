import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHeart,
  faBaby,
  faSpa,
  faBone,
  faTooth,
  faBrain,
  faUserMd,
  faEye
} from '@fortawesome/free-solid-svg-icons';
import './Specializations.css';

const Specializations = () => {
  const navigate = useNavigate();

  const specializations = [
    {
      name: 'Cardiology',
      icon: faHeart,
      description: 'Heart and cardiovascular system specialists'
    },
    {
      name: 'Pediatrics',
      icon: faBaby,
      description: 'Medical care for infants, children, and adolescents'
    },
    {
      name: 'Dermatology',
      icon: faSpa,
      description: 'Skin, hair, and nail specialists'
    },
    {
      name: 'Orthopedics',
      icon: faBone,
      description: 'Musculoskeletal system specialists'
    },
    {
      name: 'Dental',
      icon: faTooth,
      description: 'Oral health and dental care'
    },
    {
      name: 'Neurology',
      icon: faBrain,
      description: 'Nervous system specialists'
    },
    {
      name: 'Psychology',
      icon: faUserMd,
      description: 'Mental health specialists'
    },
    {
      name: 'Ophthalmology',
      icon: faEye,
      description: 'Eye care specialists'
    }
  ];

  const handleSpecializationClick = (name) => {
    navigate('/doctors', { state: { specialization: name } });
  };

  return (
    <section className="specializations">
      <h2>Our Specializations</h2>
      <div className="specializations-grid">
        {specializations.map((spec, index) => (
          <div 
            key={index} 
            className="specialization-card"
            onClick={() => handleSpecializationClick(spec.name)}
          >
            <div className="icon">
              <FontAwesomeIcon icon={spec.icon} />
            </div>
            <h3>{spec.name}</h3>
            <p>{spec.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Specializations;
