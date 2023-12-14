import React, {useState} from 'react';
import './UpdatePatientInfo.css';
import axios from "axios";
import config from '../../../../config.json';

function UpdatePatientInfo() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    phone: '',
    address: '',
    emergencyContact: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const patientID = sessionStorage.getItem('patientId');
    if (!patientID) {
      alert('No patient ID found. Please log in again.');
      return;
    }
    let data = {
      "Name":formData.name,
      "Address":formData.address,
      "Age":formData.age,
      "Email":formData.email,
      "Phone_Number":formData.phone,
      "Emergency_Contact":formData.emergencyContact
    }
    
    data["Patient_ID"]=patientID
    axios.put(`${config.backend_url}patients/${patientID}`,data)
        .then(response => {
          // Handle the successful update here
          alert('Patient information updated successfully!');
        })
        .catch(error => {
          console.error('An error occurred while updating patient information:', error);
          alert('Failed to update patient information.');
        });
   };

  return (
    <div className="update-container">
      <h2 className="form-heading">Update Patient Information</h2>
      <form onSubmit={handleSubmit} className="update-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text"
                 id="name"
                 name="name"
                 value={formData.name}
                 onChange={handleChange}
                 required
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input type="number"
                 id="age"
                 name="age"
                 value={formData.age}
                 onChange={handleChange}
                 required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email"
                 id="email"
                 name="email"
                 value={formData.email}
                 onChange={handleChange}
                 required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone number:</label>
          <input type="tel"
                 id="phone"
                 name="phone"
                 value={formData.phone}
                 onChange={handleChange}
                 required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input type="text" id="address" name="address" required/>
          <input type="text"
                 id="address"
                 name="address"
                 value={formData.address}
                 onChange={handleChange}
                 required
          />
        </div>
        <div className="form-group">
          <label htmlFor="emergency-contact">Emergency Contact:</label>
          <input type="text"
                 id="emergency-contact"
                 name="emergencyContact"
                 value={formData.emergencyContact}
                 onChange={handleChange}
                 required
          />
        </div>
        <button type="submit" className="submit-button">Update Information</button>
      </form>
    </div>
  );
}

export default UpdatePatientInfo;

