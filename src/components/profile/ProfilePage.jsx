import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faBell,
  faWallet,
  faNotesMedical,
  faCog,
  faQuestionCircle
} from '@fortawesome/free-solid-svg-icons';
import NotificationSettings from './NotificationSettings';
import PaymentInfo from './PaymentInfo';
import MedicalHistory from './MedicalHistory';
import AccountSettings from './AccountSettings';
import Support from './Support';
import './ProfilePage.css';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('notifications');

  useEffect(() => {
    console.log('ProfilePage mounted');
  }, []);

  const renderTabContent = () => {
    console.log('Rendering tab:', activeTab);
    switch (activeTab) {
      case 'notifications':
        return <NotificationSettings />;
      case 'payment':
        return <PaymentInfo />;
      case 'medical':
        return <MedicalHistory />;
      case 'account':
        return <AccountSettings />;
      case 'support':
        return <Support />;
      default:
        return <NotificationSettings />;
    }
  };

  return (
    <div className="profile-page">
      <aside className="profile-sidebar">
        <div className="user-info">
          <div className="user-avatar">
            <img src="https://via.placeholder.com/100" alt="User Avatar" />
          </div>
          <h3>John Doe</h3>
          <p>Patient</p>
        </div>

        <nav className="profile-nav">
          <button
            className={`nav-item ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            <FontAwesomeIcon icon={faBell} />
            <span>Notifications</span>
          </button>

          <button
            className={`nav-item ${activeTab === 'payment' ? 'active' : ''}`}
            onClick={() => setActiveTab('payment')}
          >
            <FontAwesomeIcon icon={faWallet} />
            <span>Payment Info</span>
          </button>

          <button
            className={`nav-item ${activeTab === 'medical' ? 'active' : ''}`}
            onClick={() => setActiveTab('medical')}
          >
            <FontAwesomeIcon icon={faNotesMedical} />
            <span>Medical History</span>
          </button>

          <button
            className={`nav-item ${activeTab === 'account' ? 'active' : ''}`}
            onClick={() => setActiveTab('account')}
          >
            <FontAwesomeIcon icon={faCog} />
            <span>Account Settings</span>
          </button>

          <button
            className={`nav-item ${activeTab === 'support' ? 'active' : ''}`}
            onClick={() => setActiveTab('support')}
          >
            <FontAwesomeIcon icon={faQuestionCircle} />
            <span>Support</span>
          </button>
        </nav>
      </aside>

      <main className="profile-content">
        {renderTabContent()}
      </main>
    </div>
  );
};

export default ProfilePage;
