import React, { useState, useContext, useEffect } from "react";
import { useHistory, Redirect } from "react-router-dom";
import Alert from "../common/Alert";
import LoadingSpinner from "../common/LoadingSpinner";
import UserContext from "../auth/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
/** Login form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls login function prop
 * - redirects to /companies route
 *
 * Routes -> LoginForm -> Alert
 * Routed as /login
 */

function LoginForm({ login }) {
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useContext(UserContext);
  const history = useHistory();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  console.debug(
    "LoginForm",
    "login=",
    typeof login,
    "formData=",
    formData,
    "formErrors",
    formErrors
  );
  useEffect(() => {
    if (currentUser) {
      history.push("/med_history");
    }
  }, [currentUser, history]); // Add this useEffect hook

  /** Handle form submit:
   *
   * Calls login func prop and, if successful, redirect to /
   * .
   */

  async function handleSubmit(evt) {
    evt.preventDefault();
    setIsLoading(true);
    let result = await login(formData);
    console.log("This is result from log in", result);
    setIsLoading(false);
    console.log("this is current user", currentUser);
    if (result.success) {
      return;
    } else {
      setFormErrors([result.errors]);
    }
  }

  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((l) => ({ ...l, [name]: value }));
  }
  //Toggle password visibility
  function togglePasswordVisibility() {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }

  return (
    <div className="LoginForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h3 className="display-4 mb-3">Log In</h3>

        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="text-primary mb-3">Username :</label>
                <input
                  name="username"
                  className="form-control mb-3"
                  value={formData.username}
                  onChange={handleChange}
                  autoComplete="username"
                  required
                />
              </div>
              <div className="form-group">
                <label className="text-primary mb-3">Password :</label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="form-control mb-3"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    required
                  />
                  <div className="input-group-append">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={togglePasswordVisibility}
                    >
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {formErrors.length ? (
                <Alert type="danger" messages={formErrors} />
              ) : null}

              <button
                className="btn btn-primary float-right"
                onSubmit={handleSubmit}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        <div className="mb-auto">{isLoading ? <LoadingSpinner /> : ""}</div>
      </div>
    </div>
  );
}

export default LoginForm;
