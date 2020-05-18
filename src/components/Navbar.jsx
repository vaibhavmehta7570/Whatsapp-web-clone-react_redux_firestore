import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark static-top p-0">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            Web Chat
          </NavLink>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink exact className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Log In
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/signup">
                  Sign Up
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
