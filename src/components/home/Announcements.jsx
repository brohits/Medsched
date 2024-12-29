import React from 'react';
import './Announcements.css';

const Announcements = () => {
  const announcements = [
    {
      title: 'COVID-19 Guidelines Updated',
      description: 'New safety protocols for in-person consultations',
      date: '2024-01-15',
      type: 'important'
    },
    {
      title: 'New Specialists Joined',
      description: 'Welcome our new team of cardiologists and pediatricians',
      date: '2024-01-10',
      type: 'news'
    },
    {
      title: 'Virtual Consultations Available',
      description: 'Now offering online appointments for select specializations',
      date: '2024-01-05',
      type: 'feature'
    }
  ];

  const getAnnouncementIcon = (type) => {
    switch (type) {
      case 'important':
        return '🔔';
      case 'news':
        return '📰';
      case 'feature':
        return '✨';
      default:
        return '📌';
    }
  };

  return (
    <div className="announcements-container">
      {announcements.map((announcement, index) => (
        <div key={index} className={'announcement-card ' + announcement.type}>
          <div className="announcement-icon">
            {getAnnouncementIcon(announcement.type)}
          </div>
          <div className="announcement-content">
            <h3>{announcement.title}</h3>
            <p>{announcement.description}</p>
            <span className="announcement-date">
              {new Date(announcement.date).toLocaleDateString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Announcements;
