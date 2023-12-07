// UpdatePatientInfo.js
import React from 'react';
import './UpdatePatientInfo.css'; // Importing the CSS file for styling

function UpdatePatientInfo() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="update-container">
      <h2 className="form-heading">Update Patient Information</h2>
      <form onSubmit={handleSubmit} className="update-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input type="number" id="age" name="age" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone number:</label>
          <input type="tel" id="phone" name="phone" required />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input type="text" id="address" name="address" required />
        </div>
        <div className="form-group">
          <label htmlFor="emergency-contact">Emergency Contact:</label>
          <input type="text" id="emergency-contact" name="emergencyContact" required />
        </div>
        <button type="submit" className="submit-button">Update Information</button>
      </form>
    </div>
  );
}

export default UpdatePatientInfo;

