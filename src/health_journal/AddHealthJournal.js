import React, { useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import UserContext from "../auth/UserContext";
import PharmamateAPI from "../api/api";
import Alert from "../common/Alert";

function AddHealthJournal() {
  const history = useHistory();
  const { currentUser } = useContext(UserContext);
  const [error, setError] = useState(null);
  const [saveConfirmed, setSaveConfirmed] = useState(false);
  const [formData, setFormData] = useState({
    journal: "",
  });
  const [formErrors, setFormErrors] = useState([]);
  console.debug(
    "AddHealthJournal",
    "formData=",
    formData,
    "formErrors=",
    formErrors
  );

  async function handleSubmit(evt) {
    evt.preventDefault();
    if (formData.journal === "") {
      setFormErrors(["Do not leave the journal field empty"]);
      return;
    }

    try {
      let result = await PharmamateAPI.addHealthJournal(
        currentUser.username,
        formData
      );
      setSaveConfirmed(true);
      setError([]);
      history.push("/health_journal");
    } catch (error) {
      setError([error.message]);
    }
  }
  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({ ...data, [name]: value }));
  }
  return (
    <div className="SignupForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h2 className="display-4 mb-3">Add Journal</h2>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label className="mb-3 text-primary">Health Journal : </label>
                <textarea
                  rows="10"
                  cols="50"
                  name="journal"
                  className="form-control"
                  value={formData.journal}
                  onChange={handleChange}
                />
              </div>

              {formErrors.length ? (
                <Alert type="danger" messages={formErrors} />
              ) : null}
              {saveConfirmed ? (
                <Alert
                  type="success"
                  messages={["Health Journal added successfully."]}
                />
              ) : null}
              <button
                type="submit"
                className="btn btn-primary float-right"
                onSubmit={handleSubmit}
              >
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddHealthJournal;
