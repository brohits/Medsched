import React from 'react';
import './DoctorList.css';

const DoctorList = ({ doctors, onSelectDoctor }) => {
  return (
    <div className="doctor-list">
      <h2>Available Doctors</h2>
      <div className="doctors-grid">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="doctor-card" onClick={() => onSelectDoctor(doctor)}>
            <img src={doctor.avatar || '/default-avatar.png'} alt={doctor.name} />
            <h3>{doctor.name}</h3>
            <p>{doctor.specialization}</p>
            <p>Experience: {doctor.experience} years</p>
            <button className="select-btn">View Schedule</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorList;
