import React, { useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import UserContext from "../auth/UserContext";
import PharmamateAPI from "../api/api";
import Alert from "../common/Alert";

function AddMedHistory() {
  const history = useHistory();
  const { currentUser } = useContext(UserContext);
  const [error, setError] = useState([]);
  const [saveConfirmed, setSaveConfirmed] = useState(false);
  const [formData, setFormData] = useState({
    username: currentUser.username,
    drugName: "",
    status: "active",
    startDate: "",
    stopDate: "",
  });

  console.debug("AddMedHistory", "formData=", formData, "formErrors=", error);
  // Convert drugName to lowercase
  const formDataWithLowercaseDrugName = {
    ...formData,
    drugName: formData.drugName.toLowerCase(),
  };

  async function handleSubmit(evt) {
    evt.preventDefault();

    try {
      //Validate input before adding
      if (!formData.drugName) {
        setError(["Please enter drug name"]);
        return;
      }
      if (!formData.startDate) {
        setError(["Please enter start date"]);
        return;
      }

      // Validate Status and Stop Date according to DB constraints
      if (formData.status === "active" && formData.stopDate) {
        setError(["Please clear stop date for an active drug."]);
        return;
      }
      if (formData.status === "inactive" && !formData.stopDate) {
        setError(["Please provide stop date for an inactive drug."]);
        return;
      }
      // Convert string dates to Date objects
      const start = new Date(formData.startDate);
      const stop = new Date(formData.stopDate);

      // Check if stopDate is earlier than startDate
      if (formData.status === "inactive" && stop < start) {
        setError(["Stop date cannot be earlier than start date."]);
        return;
      }
      let result = await PharmamateAPI.addMedHistory(
        currentUser.username,
        formDataWithLowercaseDrugName
      );
      setSaveConfirmed(true);
      setError([]);
      history.push("/med_history");
    } catch (err) {
      setError([err.message]);
    }
  }

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];
  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({ ...data, [name]: value }));
  }
  return (
    <div className="SignupForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h2 className="display-4">Add Drug</h2>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="mb-3 text-primary">Drug Name : </label>
                <input
                  name="drugName"
                  className="form-control mb-3"
                  value={formData.drugName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label className="mb-3 text-primary">Status : </label>
                <div className="input-group mb-3">
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
                <label className="mb-3 text-primary">Start Date :</label>
                <div className="input-group mb-3">
                  <input
                    type="date"
                    name="startDate"
                    id="start_date"
                    value={formData.startDate}
                    onChange={handleChange}
                  />
                </div>
              </div>
              {formData.status === "active" ? (
                ""
              ) : (
                <div className="form-group">
                  <label className="mb-3 text-primary">Stop Date :</label>
                  <div className="input-group mb-3">
                    <input
                      type="date"
                      name="stopDate"
                      id="start_date"
                      value={formData.stopDate}
                      onChange={handleChange}
                      max={today}
                    />
                  </div>
                </div>
              )}

              {error.length ? <Alert type="danger" messages={error} /> : null}
              {saveConfirmed ? (
                <Alert type="success" messages={["Drug added successfully."]} />
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

export default AddMedHistory;
