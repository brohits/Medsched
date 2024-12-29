import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ userRole, onRoleChange }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const handleRoleChange = (role) => {
    onRoleChange(role);
    setIsDropdownOpen(false);
    navigate('/');
  };

  const getNavLinks = () => {
    switch (userRole) {
      case 'patient':
        return (
          <>
            <li><Link to="/" className={isActive('/')}>Home</Link></li>
            <li><Link to="/book-appointment" className={isActive('/book-appointment')}>Book Appointment</Link></li>
            <li><Link to="/appointments" className={isActive('/appointments')}>My Appointments</Link></li>
            <li><Link to="/profile" className={isActive('/profile')}>Profile</Link></li>
          </>
        );
      case 'doctor':
        return (
          <>
            <li><Link to="/doctor/dashboard" className={isActive('/doctor/dashboard')}>Dashboard</Link></li>
            <li><Link to="/doctor/schedule" className={isActive('/doctor/schedule')}>Schedule</Link></li>
            <li><Link to="/doctor/appointments" className={isActive('/doctor/appointments')}>Appointment Requests</Link></li>
          </>
        );
      case 'admin':
        return (
          <>
            <li><Link to="/admin/dashboard" className={isActive('/admin/dashboard')}>Dashboard</Link></li>
            <li><Link to="/admin/doctors" className={isActive('/admin/doctors')}>Manage Doctors</Link></li>
            <li><Link to="/admin/patients" className={isActive('/admin/patients')}>Manage Patients</Link></li>
            <li><Link to="/admin/appointments" className={isActive('/admin/appointments')}>Manage Appointments</Link></li>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <h1>MedScheduler</h1>
        </Link>
      </div>
      
      <ul className="nav-links">
        {getNavLinks()}
      </ul>

      <div className="navbar-right">
        <div className="user-role-selector">
          <label htmlFor="role-select">Role:</label>
          <select 
            id="role-select"
            value={userRole}
            onChange={(e) => handleRoleChange(e.target.value)}
            className="role-switcher"
          >
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
