import React, { useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import UserContext from "../auth/UserContext";
import PharmamateAPI from "../api/api";
import Alert from "../common/Alert";

function AddMedHistory() {
  const history = useHistory();
  const { currentUser } = useContext(UserContext);
  const [error, setError] = useState(null);
  const [saveConfirmed, setSaveConfirmed] = useState(false);
  const [formData, setFormData] = useState({
    username: currentUser.username,
    drugName: "",
    status: "active",
    startDate: "",
    stopDate: "",
  });
  const [formErrors, setFormErrors] = useState([]);
  console.debug(
    "AddMedHistory",
    "formData=",
    formData,
    "formErrors=",
    formErrors
  );

  async function handleSubmit(evt) {
    evt.preventDefault();

    try {
      let result = await PharmamateAPI.addMedHistory(
        currentUser.username,
        formData
      );
      setSaveConfirmed(true);
      setError([]);
      history.push("/med_history");
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
        <h2 className="mb-3">Add Drug</h2>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Drug Name</label>
                <input
                  name="drugName"
                  className="form-control"
                  value={formData.drugName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Status </label>
                <div className="input-group">
                  <select
                    name="status"
                    id="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="active"> Active</option>
                    <option value="inactive"> Inactive</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Start Date :</label>
                <div className="input-group">
                  <input
                    type="date"
                    name="startDate"
                    id="start_date"
                    value={formData.startDate}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Stop Date :</label>
                <div className="input-group">
                  <input
                    type="date"
                    name="stopDate"
                    id="start_date"
                    value={formData.stopDate}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {formErrors.length ? (
                <Alert type="danger" messages={formErrors} />
              ) : null}
              {saveConfirmed ? (
                <Alert type="success" messages={["Drug added successfully."]} />
              ) : null}
              <button
                type="submit"
                className="btn btn-primary float-right"
                onSubmit={handleSubmit}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddMedHistory;