import React, { useState } from 'react';
import './Billing.css';

function Billing({ savedData }) {
  const [firstNameQuery, setFirstNameQuery] = useState('');
  const [lastNameQuery, setLastNameQuery] = useState('');
  const [dobQuery, setDobQuery] = useState('');
  const [selectedPatientIndex, setSelectedPatientIndex] = useState(null);

  const handleFirstNameSearch = (event) => {
    setFirstNameQuery(event.target.value);
  };

  const handleLastNameSearch = (event) => {
    setLastNameQuery(event.target.value);
  };

  const handleDobSearch = (event) => {
    setDobQuery(event.target.value);
  };

  const filteredPatients = savedData.filter((patient) =>
    `${patient.firstName}`
      .toLowerCase()
      .includes(firstNameQuery.toLowerCase()) &&
    `${patient.lastName}`
      .toLowerCase()
      .includes(lastNameQuery.toLowerCase()) &&
    patient.dateOfBirth.includes(dobQuery)
  );

  const handleClick = (patientIndex) => {
    setSelectedPatientIndex((prevIndex) => {
      // Toggle visibility by checking if the clicked patient is already selected
      if (prevIndex === patientIndex) {
        return null;
      } else {
        return patientIndex;
      }
    });
  };

  return (
    <div className="Billing">
      <h1>Welcome to the Dashboard</h1>
      <div>
        <input
          type="text"
          placeholder="Search by First Name"
          value={firstNameQuery}
          onChange={handleFirstNameSearch}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Search by Last Name"
          value={lastNameQuery}
          onChange={handleLastNameSearch}
        />
      </div>
      <div>
        <input
          type="date"
          placeholder="Search by Date of Birth"
          value={dobQuery}
          onChange={handleDobSearch}
        />
      </div>
      <ul className="patient-list">
        {filteredPatients.map((patient, index) => (
          <li key={index} className="patient-list-item">
            <button onClick={() => handleClick(index)} className="patient-name">
              {`${patient.firstName} ${patient.lastName}`}
            </button>
            {selectedPatientIndex === index && (
              <div className="patient-info">
                <p>Phone Number: {patient.phoneNumber}</p>
                <p>Gender: {patient.gender}</p>
                <p>Email: {patient.email}</p>
                <p>Date of Birth: {patient.dateOfBirth}</p>
                <p>Other Information: {patient.otherInfo}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Billing;