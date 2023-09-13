import React, { useState, useEffect } from "react";
import Claims from "./Claims";
import Billing from "./Billing";
import Patient from "./Patient";
import "./App.css";

function Menu() {
  const [selectedMenuItem, setSelectedMenuItem] = useState("");
  const [savedData, setSavedData] = useState([]);

  const handleLogout = () => {
    // remove the logged in status from local storage
    localStorage.removeItem("loggedIn");
    // redirect to the login page
    window.location.href = "/";
  };

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
    window.history.pushState(null, null, `/${menuItem}`);
  };

  useEffect(() => {
    const path = window.location.pathname;
    const menuItem = path.substring(1); // remove the leading "/"
    setSelectedMenuItem(menuItem);
  }, []);

  useEffect(() => {
    const savedDataString = localStorage.getItem("savedData");
    if (savedDataString) {
      const savedDataArray = JSON.parse(savedDataString);
      setSavedData(savedDataArray);
    }
  }, []);

  return (
    <div className="wrapper">
      <header>
        <nav>
          <ul>
            <li>
              <a
                href="/patient"
                className={selectedMenuItem === "patient" ? "active" : ""}
                onClick={() => handleMenuItemClick("patient")}
              >
                Patient
              </a>
            </li>
            <li className="dropdown">
              <a
                href="/billing"
                className={selectedMenuItem === "billing" ? "active" : ""}
                onClick={() => handleMenuItemClick("billing")}
              >
                Billing
              </a>
              <ul className="dropdown-content">
                <li>
                  <a
                    href="/billing/claims"
                    className={selectedMenuItem === "claims" ? "active" : ""}
                    onClick={() => handleMenuItemClick("claims")}
                  >
                    Claims
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="/Login" onClick={handleLogout}>
                Log Out
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <div className="dashboard">
        {selectedMenuItem === "patient" ? (
          <Patient selectedPatientId={null} />
        ) : selectedMenuItem === "billing" ? (
          <Billing savedData={savedData} />
        ) : (
          <Claims savedData={savedData} />
        )}
      </div>
    </div>
  );
}

export default Menu;
