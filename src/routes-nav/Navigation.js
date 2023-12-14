import React, { useContext } from "react";
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
  console.debug("Navigation", "currentUser=", currentUser);

  function loggedInNav() {
    return (
      <ul className="nav justify-content-end">
        <li className="nav-item ">
          <NavLink className="nav-link active" to="/med_history">
            Medication History
          </NavLink>
        </li>
        <li className="nav-item mr-4">
          <NavLink className="nav-link active" to="/health_journal">
            Health Journal
          </NavLink>
        </li>
        <li className="nav-item mr-4">
          <NavLink className="nav-link active" to="/profile">
            Profile
          </NavLink>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/" onClick={logout}>
            Log out {currentUser.first_name || currentUser.username}
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
    <nav className="navbar bg-body-tertiary bg-success-subtle">
      <div class="container">
        <Link className="navbar-brand" to="/">
          {
            <img
              src={pharmamateImage}
              class="rounded"
              width="auto"
              height="60"
              alt="Pharmamate"
            />
          }
        </Link>
        {currentUser ? loggedInNav() : loggedOutNav()}
      </div>
    </nav>
  );
}

export default Navigation;
