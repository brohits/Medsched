import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faEnvelope,
  faMobile,
  faCalendarAlt,
  faUserMd,
  faClipboardCheck
} from '@fortawesome/free-solid-svg-icons';
import './NotificationSettings.css';

const NotificationSettings = () => {
  const [settings, setSettings] = useState({
    email: {
      appointments: true,
      reminders: true,
      doctorMessages: true,
      marketing: false
    },
    sms: {
      appointments: true,
      reminders: true,
      doctorMessages: false,
      marketing: false
    },
    push: {
      appointments: true,
      reminders: true,
      doctorMessages: true,
      marketing: false
    }
  });

  const handleToggle = (channel, type) => {
    setSettings(prev => ({
      ...prev,
      [channel]: {
        ...prev[channel],
        [type]: !prev[channel][type]
      }
    }));
  };

  const getIcon = (type) => {
    switch (type) {
      case 'appointments':
        return faCalendarAlt;
      case 'reminders':
        return faBell;
      case 'doctorMessages':
        return faUserMd;
      case 'marketing':
        return faClipboardCheck;
      default:
        return faBell;
    }
  };

  const renderChannelSettings = (channel, icon) => (
    <div className="notification-channel">
      <div className="channel-header">
        <FontAwesomeIcon icon={icon} />
        <h3>{channel.charAt(0).toUpperCase() + channel.slice(1)} Notifications</h3>
      </div>
      <div className="notification-options">
        {Object.entries(settings[channel]).map(([type, enabled]) => (
          <div key={type} className="notification-option">
            <div className="option-info">
              <FontAwesomeIcon icon={getIcon(type)} />
              <span>{type.charAt(0).toUpperCase() + type.slice(1).replace(/([A-Z])/g, ' $1')}</span>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={enabled}
                onChange={() => handleToggle(channel, type)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="notification-settings">
      <div className="settings-header">
        <h2>Notification Settings</h2>
        <p>Manage how you receive notifications about appointments, messages, and updates.</p>
      </div>

      <div className="settings-content">
        {renderChannelSettings('email', faEnvelope)}
        {renderChannelSettings('sms', faMobile)}
        {renderChannelSettings('push', faBell)}
      </div>

      <div className="settings-footer">
        <button className="save-button">Save Changes</button>
      </div>
    </div>
  );
};

export default NotificationSettings;
