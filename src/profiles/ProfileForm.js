import React, { useState, useContext } from "react";
import Alert from "../common/Alert";
import JoblyApi from "../api/api";
import UserContext from "../auth/UserContext";

// eslint-disable-next-line
import useTimedMessage from "../hooks/useTimedMessage";
import PharmamateAPI from "../api/api";

/** Profile editing form.
 *
 * Displays profile form and handles changes to local form state.
 * Submitting the form calls the API to save, and triggers user reloading
 * throughout the site.
 *
 * Confirmation of a successful save is normally a simple <Alert>, but
 * you can opt-in to our fancy limited-time-display message hook,
 * `useTimedMessage`, but switching the lines below.
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

  // switch to use our fancy limited-time-display message hook
  const [saveConfirmed, setSaveConfirmed] = useState(false);
  // const [saveConfirmed, setSaveConfirmed] = useTimedMessage();

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
        console.log(username);
        console.log(profileData);

        try {
          updatedUser = await PharmamateAPI.saveProfile(username, profileData);
        } catch (err) {
          debugger;

          setFormErrors(err);
          return;
        }

        console.log(`this is update user ${updatedUser}`);

        // trigger reloading of user information throughout the site
        setCurrentUser(updatedUser);
        setToken(newToken); // Update the token in the context if necessary
        setFormData((f) => ({
          ...f,
          oldPassword: "",
          password: "",
          confirmPassword: "",
        }));
        setFormErrors([]);
        setSaveConfirmed(true);
      }
    } catch (err) {
      debugger;

      setFormErrors(err);
      return;
    }
  }

  /** Handle form data changing */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((f) => ({
      ...f,
      [name]: value,
    }));
    setFormErrors([]);
  }

  return (
    <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
      <h3>Profile</h3>
      <div className="card">
        <div className="card-body">
          <form>
            <div className="form-group">
              <label>Username :</label>
              <p className="form-control-plaintext">{formData.username}</p>
            </div>
            <div className="form-group">
              <div className="form-group">
                <label>Old Password to make changes:</label>
                <input
                  type="password"
                  name="oldPassword"
                  className="form-control"
                  value={formData.oldPassword}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>New Password :</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Re-type New Password :</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
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
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfileForm;
