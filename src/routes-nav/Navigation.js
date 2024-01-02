import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./Navigation.css";
import pharmamateImage from "../pharmamate.png";

/** Navigation bar for site. Shows up on every page.
 *
 * When user is logged in, shows links to main areas of site. When not,
 * shows link to Login and Signup forms.
 *
 * Rendered by App.
 */

function Navigation({ logout }) {
  const { currentUser } = useContext(UserContext);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  // console.debug("Navigation", "currentUser=", currentUser);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  function loggedInNav() {
    return (
      <ul className="navbar-nav">
        <li className="nav-item ">
          <NavLink className="nav-link " to="/med_history">
            Medication History
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/health_journal">
            Health Journal
          </NavLink>
        </li>
        <li className="nav-item ">
          <NavLink className="nav-link " to="/profile">
            <i className="fa-regular fa-user"></i> {currentUser.username}
          </NavLink>
        </li>
        <li className="nav-item">
          <Link className="nav-link " to="/" onClick={logout}>
            <i className="fa-solid fa-right-from-bracket"></i>Log out
          </Link>
        </li>
      </ul>
    );
  }

  function loggedOutNav() {
    return (
      <ul className="nav justify-content-end">
        <li className="nav-item ">
          <NavLink className="nav-link" to="/login">
            Login
          </NavLink>
        </li>
        <li className="nav-item mr-4">
          <NavLink className="nav-link" to="/signup">
            Sign Up
          </NavLink>
        </li>
      </ul>
    );
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
      <div className="container">
        <Link className="navbar-brand" to="/">
          {
            <img
              src={pharmamateImage}
              className="rounded"
              width="auto"
              height="60"
              alt="Pharmamate"
            />
          }
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={!isNavCollapsed ? true : false}
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
          id="navbarNav"
        >
          {currentUser ? loggedInNav() : loggedOutNav()}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
