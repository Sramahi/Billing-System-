import React from "react";
import Login from "./Login";
import Signup from "./Signup";
import Menu from "./Menu";
import "./App.css";

function App() {
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";

  return (
    <>
      {isLoggedIn ? (
        // Display menu if the user is logged in
        <Menu />
      ) : (
        // Display login or signup page if the user is not logged in
        window.location.pathname === "/signup" ? <Signup /> : <Login />
      )}
    </>
  );
}

export default App;