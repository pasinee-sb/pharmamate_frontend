import React, { useState, useContext } from "react";
import Alert from "../common/Alert";
import UserContext from "../auth/UserContext";

import PharmamateAPI from "../api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

/** Profile editing form.
 *
 * Displays profile form and handles changes to local form state.
 * Submitting the form calls the API to save, and triggers user reloading
 * throughout the site.

 *
 * Routed as /profile
 * Routes -> ProfileForm -> Alert
 */

function ProfileForm() {
  const { currentUser, setCurrentUser, token, setToken } =
    useContext(UserContext);
  const [formData, setFormData] = useState({
    username: currentUser.username,
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState([]);
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    password: false,
    confirmPassword: false,
  });

  const [saveConfirmed, setSaveConfirmed] = useState(false);

  console.debug(
    "ProfileForm",
    "currentUser=",
    currentUser,
    "formData=",
    formData,
    "formErrors=",
    formErrors,
    "saveConfirmed=",
    saveConfirmed,
    "token=",
    token
  );

  /** on form submit:
   * - attempt save to backend & report any errors
   * - if successful
   *   - clear previous error messages and password
   *   - show save-confirmed message
   *   - set current user info throughout the site
   */

  async function handleSubmit(evt) {
    evt.preventDefault();

    //Check if the password and the repeatPassword fields match
    if (formData.password !== formData.confirmPassword) {
      setFormErrors(["Passwords don't match"]);
      return;
    }
    let username = formData.username;
    let profileData = { password: formData.password };
    let updatedUser;
    let newToken;

    try {
      newToken = await PharmamateAPI.login({
        username: formData.username,
        password: formData.oldPassword,
      });

      if (newToken) {
        if (newToken) {
          updatedUser = await PharmamateAPI.saveProfile(username, profileData);
          setCurrentUser(updatedUser);
          setToken(newToken);
          resetForm();
          setSaveConfirmed(true);
        }
      }
    } catch (err) {
      setFormErrors(err);
      return;
    }
  }

  const resetForm = () => {
    setFormData({
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
    setFormErrors([]);
  };

  /** Handle form data changing */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((f) => ({
      ...f,
      [name]: value,
    }));
    setFormErrors([]);
  }

  /**Toggle password visibility */
  function togglePasswordVisibility(field) {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  }

  return (
    <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
      <h3 className="display-4">Profile</h3>
      <div className="card">
        <div className="card-body">
          <form>
            <div className="form-group">
              <label className="text-primary mb-3">Username :</label>
              <p>{formData.username}</p>
            </div>

            <div className="form-group">
              <div className="input-group">
                <label className="text-primary mb-3">Old Password:</label>
                <div className="input-group">
                  <input
                    type={showPassword.oldPassword ? "text" : "password"}
                    name="oldPassword"
                    className="form-control mb-3"
                    value={formData.oldPassword}
                    onChange={handleChange}
                  />
                  <div className="input-group-append">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => togglePasswordVisibility("oldPassword")}
                    >
                      <FontAwesomeIcon
                        icon={showPassword.oldPassword ? faEyeSlash : faEye}
                      />
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="text-primary mb-3">New Password :</label>
                <div className="input-group">
                  <input
                    type={showPassword.password ? "text" : "password"}
                    name="password"
                    className="form-control mb-3"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <div className="input-group-append">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => togglePasswordVisibility("password")}
                    >
                      <FontAwesomeIcon
                        icon={showPassword.password ? faEyeSlash : faEye}
                      />
                    </button>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label className="text-primary mb-3">
                  Re-type New Password :
                </label>
                <div className="input-group mb-3">
                  <input
                    type={showPassword.confirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    className="form-control"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <div className="input-group-append">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() =>
                        togglePasswordVisibility("confirmPassword")
                      }
                    >
                      <FontAwesomeIcon
                        icon={showPassword.confirmPassword ? faEyeSlash : faEye}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {formErrors.length ? (
              <Alert type="danger" messages={formErrors} />
            ) : null}

            {saveConfirmed ? (
              <Alert type="success" messages={["Updated successfully."]} />
            ) : null}

            <button
              className="btn btn-primary btn-block mt-4"
              onClick={handleSubmit}
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfileForm;
