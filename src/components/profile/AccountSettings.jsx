import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faEnvelope,
  faLock,
  faShield,
  faEye,
  faEyeSlash,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import './AccountSettings.css';

const AccountSettings = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [formData, setFormData] = useState({
    email: 'user@example.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  const handleDeleteAccount = () => {
    // Handle account deletion
    setShowDeleteConfirm(false);
  };

  return (
    <div className="account-settings">
      <section className="settings-section">
        <div className="section-header">
          <FontAwesomeIcon icon={faUser} />
          <h2>Account Settings</h2>
        </div>

        <form onSubmit={handleSubmit} className="settings-form">
          <div className="form-group">
            <label>
              <FontAwesomeIcon icon={faEnvelope} />
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>
              <FontAwesomeIcon icon={faLock} />
              Current Password
            </label>
            <div className="password-input">
              <input
                type={showPassword ? 'text' : 'password'}
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>
              <FontAwesomeIcon icon={faLock} />
              New Password
            </label>
            <div className="password-input">
              <input
                type={showPassword ? 'text' : 'password'}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>
              <FontAwesomeIcon icon={faLock} />
              Confirm New Password
            </label>
            <div className="password-input">
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit" className="save-button">
            Save Changes
          </button>
        </form>
      </section>

      <section className="settings-section">
        <div className="section-header">
          <FontAwesomeIcon icon={faShield} />
          <h2>Security</h2>
        </div>

        <div className="security-options">
          <div className="security-option">
            <h3>Two-Factor Authentication</h3>
            <p>Add an extra layer of security to your account</p>
            <button className="enable-2fa">Enable 2FA</button>
          </div>

          <div className="security-option">
            <h3>Login History</h3>
            <p>View your recent login activity</p>
            <button className="view-history">View History</button>
          </div>
        </div>
      </section>

      <section className="settings-section danger-zone">
        <div className="section-header">
          <FontAwesomeIcon icon={faExclamationTriangle} />
          <h2>Danger Zone</h2>
        </div>

        <div className="danger-actions">
          <div className="danger-warning">
            <p>Once you delete your account, there is no going back. Please be certain.</p>
          </div>
          <button 
            className="delete-account"
            onClick={() => setShowDeleteConfirm(true)}
          >
            Delete Account
          </button>
        </div>
      </section>

      {showDeleteConfirm && (
        <div className="modal">
          <div className="modal-content">
            <h3>Delete Account</h3>
            <p>Are you sure you want to delete your account? This action cannot be undone.</p>
            <div className="modal-actions">
              <button onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
              <button className="delete-button" onClick={handleDeleteAccount}>
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountSettings;
