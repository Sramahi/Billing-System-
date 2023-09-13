import React, { useState } from "react";
import "./App.css";


function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const handleSignup = (e) => {
      e.preventDefault();
      // retrieve saved accounts
      const savedAccounts = JSON.parse(localStorage.getItem("accounts")) || [];
      // check if account with the same email already exists
      const existingAccount = savedAccounts.find((account) => account.email === email);
      if (existingAccount) {
        alert("An account with this email already exists. Please log in instead.");
        return;
      }
      // create new account object
      const newAccount = { name, email, password };
      // add new account to saved accounts array
      savedAccounts.push(newAccount);
      // save updated accounts array to local storage
      localStorage.setItem("accounts", JSON.stringify(savedAccounts));
      // save the account as logged in
      localStorage.setItem("loggedIn", true);
      // redirect to dashboard
      window.location.href = "/dashboard";
    };
  
    return (
      <div className="container">
        <form>
          <h1>Sign Up</h1>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" onClick={handleSignup}>
            Sign Up
          </button>
        </form>
      </div>
    );
  }
  export default Signup;
