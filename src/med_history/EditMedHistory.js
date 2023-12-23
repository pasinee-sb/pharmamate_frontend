import React, { useState, useContext, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import UserContext from "../auth/UserContext";
import PharmamateAPI from "../api/api";
import Alert from "../common/Alert";

function EditMedHistory() {
  const { currentUser } = useContext(UserContext);
  const { medId } = useParams();
  const history = useHistory();
  const medIdNum = parseInt(medId, 10);
  const username = currentUser.username;

  const [formData, setFormData] = useState({
    drug: "",
    status: "",
    startDate: "",
    stopDate: "",
  });

  const [formErrors, setFormErrors] = useState([]);
  const [saveConfirmed, setSaveConfirmed] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const medToEdit = await PharmamateAPI.getMedById(username, medIdNum);
      if (medToEdit) {
        setFormData({
          drug: medToEdit.drug_name,
          status: medToEdit.status,
          startDate: medToEdit.start_date.split("T")[0], // Extracts date part in 'YYYY-MM-DD' format
          stopDate: medToEdit.stop_date
            ? medToEdit.stop_date.split("T")[0]
            : "", // Checks for null before splitting
        });
      }
    }
    fetchData();
  }, [currentUser, medId]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const formToSubmit = {
      status: formData.status,
      startDate: formData.startDate,
      stopDate: formData.stopDate,
    };

    try {
      // Validate Status and Stop Date according to DB constraints
      if (formData.status === "active" && formData.stopDate) {
        setFormErrors(["Please clear stop date for an active drug."]);
        return;
      }
      if (formData.status === "inactive" && !formData.stopDate) {
        setFormErrors(["Please provide stop date for an inactive drug."]);
        return;
      }
      // Convert string dates to Date objects
      const start = new Date(formData.startDate);
      const stop = new Date(formData.stopDate);

      // Check if stopDate is earlier than startDate
      if (formData.status === "inactive" && stop < start) {
        setFormErrors(["Stop date cannot be earlier than start date."]);
        return;
      }

      await PharmamateAPI.editMedHistory(username, formToSubmit, medIdNum);
      setSaveConfirmed(true);
      setFormErrors([]);
      history.push("/med_history");
    } catch (err) {
      setFormErrors([err.message]);
    }
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((f) => ({
      ...f,
      [name]: value,
    }));
  };

  const today = new Date().toISOString().split("T")[0];
  return (
    <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
      <h2 className="display-5">Edit Medication </h2>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="text-primary">Drug : </label>
              <p className="form-control-plaintext">{formData.drug}</p>
            </div>

            <div className="form-group ">
              <div className="input-group">
                <label className=" mb-3  text-primary ">Status : </label>
                <div className="input-group mb-3 ">
                  <select
                    name="status"
                    id="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="active"> Active </option>
                    <option value="inactive"> Inactive </option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className=" mb-3  text-primary">Start Date :</label>
              <div className="input-group  mb-3">
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

            {formErrors.length ? (
              <Alert type="danger" messages={formErrors} />
            ) : null}

            {saveConfirmed ? (
              <Alert type="success" messages={["Updated successfully."]} />
            ) : null}

            <button className="btn btn-primary btn-block mt-4">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditMedHistory;
