import React, { useState, useEffect } from 'react';
import "./Claims.css"

function Claims() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    gender: "",
    email: "",
    dateOfBirth: "",
    otherInfo: ""
  });

  const [savedData, setSavedData] = useState([]);

  const [isSaved, setIsSaved] = useState(false);

  const [selectedPatient, setSelectedPatient] = useState(null);

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    gender: "",
    email: "",
    dateOfBirth: ""
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const { firstName, lastName, phoneNumber, gender, email, dateOfBirth } = formData;

    // Validation
    let formIsValid = true;
    const newErrors = {};

    if (firstName.trim() === "") {
      newErrors.firstName = "First name is required.";
      formIsValid = false;
    }

    if (lastName.trim() === "") {
      newErrors.lastName = "Last name is required.";
      formIsValid = false;
    }

    if (phoneNumber.trim() === "") {
      newErrors.phoneNumber = "Phone number is required.";
      formIsValid = false;
    }

    if (gender.trim() === "") {
      newErrors.gender = "Gender is required.";
      formIsValid = false;
    }

    if (email.trim() === "") {
      newErrors.email = "Email is required.";
      formIsValid = false;
    }

    if (dateOfBirth.trim() === "") {
      newErrors.dateOfBirth = "Date of birth is required.";
      formIsValid = false;
    }

    if (formIsValid) {
      setErrors({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        gender: "",
        email: "",
        dateOfBirth: ""
      });

      console.log(formData);
      // Submit the form data to the server here

      const newSavedData = [...savedData, formData];
      localStorage.setItem('savedData', JSON.stringify(newSavedData));

      setSavedData(newSavedData);
      setIsSaved(true);
      setFormData({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        gender: "",
        email: "",
        dateOfBirth: "",
        otherInfo: ""
      });
    } else {
      setErrors(newErrors);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  useEffect(() => {
    const savedDataString = localStorage.getItem('savedData');
    if (savedDataString) {
      const savedDataArray = JSON.parse(savedDataString);
      setSavedData(savedDataArray);
    }
  }, []);

  const handleDeletePatient = (patientIndex) => {
    const newSavedData = [...savedData];
    newSavedData.splice(patientIndex, 1);
    localStorage.setItem('savedData', JSON.stringify(newSavedData));
    setSavedData(newSavedData);
    setSelectedPatient(null); // clear selected patient if the deleted patient was selected
  };

  const handleClick = (patient) => {
    setSelectedPatient((prevState) => {
      // Toggle visibility by checking if the clicked patient is already selected
      if (prevState === patient) {
        return null;
      } else {
        return patient;
      }
    });
  };

  return (
    <div className="form-container">
      <h1>Fill in your information</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
          {errors.firstName && <p className="error-message">{errors.firstName}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
          {errors.lastName && <p className="error-message">{errors.lastName}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
          />
          {errors.phoneNumber && <p className="error-message">{errors.phoneNumber}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <select name="gender" value={formData.gender} onChange={handleInputChange}>
            <option value=""></option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && <p className="error-message">{errors.gender}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="dateOfBirth">Date of Birth:</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
          />
          {errors.dateOfBirth && <p className="error-message">{errors.dateOfBirth}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="otherInfo">Other Information:</label>
          <textarea
            name="otherInfo"
            value={formData.otherInfo}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      {isSaved && (
        <div className="saved-message">
          <p>Information has been saved</p>
        </div>
      )}

      <div className="patient-list">
        <h2>Patient List</h2>
        <ul>
          {savedData.map((data, index) => (
            <li key={index}>
              <button onClick={() => handleClick(data)}>
                {`${data.firstName} ${data.lastName}`}
              </button>
              <button onClick={() => handleDeletePatient(index)}>Delete</button>
              {/* If the selectedPatient is the current patient, render their information */}
              {selectedPatient === data && (
                <div>
                  <p>Phone Number: {data.phoneNumber}</p>
                  <p>Gender: {data.gender}</p>
                  <p>Email: {data.email}</p>
                  <p>Date of Birth: {data.dateOfBirth}</p>
                  <p>Other Information: {data.otherInfo}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Claims;