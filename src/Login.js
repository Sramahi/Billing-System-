import React, { useState } from "react";
import "./App.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // check if the email and password match any saved accounts
    const savedAccounts = JSON.parse(localStorage.getItem("accounts")) || [];
    const matchedAccount = savedAccounts.find(
      (account) => account.email === email && account.password === password
    );
    if (matchedAccount) {
      // save the account as logged in
      localStorage.setItem("loggedIn", true);
      // redirect to dashboard
      window.location.href = "/dashboard";
    } else {
      // show error message
      setMessage("Invalid email or password");
    }
  };

  return (
    <div className="container">
      <form>
        <h1>Login</h1>
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
        <div className="button-container">
          <button type="submit" onClick={handleLogin}>
            Log In
          </button>
          <button type="button" onClick={() => window.location.href = "/signup"}>
            Sign Up
          </button>
        </div>
        {message && <div className="error">{message}</div>}
      </form>
    </div>
  );
}

export default Login;
