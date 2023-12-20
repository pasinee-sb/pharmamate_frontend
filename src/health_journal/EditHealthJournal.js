import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserContext from "../auth/UserContext";
import PharmamateAPI from "../api/api";
import Alert from "../common/Alert";

function EditHealthJournal() {
  const { currentUser } = useContext(UserContext);
  // const { medId } = useParams();
  // const medIdNum = parseInt(medId, 10);
  const username = currentUser.username;

  const [formData, setFormData] = useState({
    journal: "",
  });

  const [formErrors, setFormErrors] = useState([]);
  const [saveConfirmed, setSaveConfirmed] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const journalToEdit = await PharmamateAPI.getHealthJournal(username);
      setFormData({
        journal: journalToEdit.journal,
      });
    }
    fetchData();
  }, [currentUser]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      // console.log("This is stopDate");
      // console.log(formData.stopDate);
      // Assuming your API method is named editMedHistory and it takes these parameters
      await PharmamateAPI.editHealthJournal(username, formData);
      setSaveConfirmed(true);
      setFormErrors([]);
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

  return (
    <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
      <h3 className="display-4">Edit Journal</h3>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="input-group">
                <label className="mb-3 text-primary">Journal : </label>
                <div className="input-group mb-3">
                  <textarea
                    rows="10"
                    cols="50"
                    name="journal"
                    id="journal"
                    value={formData.journal}
                    onChange={handleChange}
                  />
                </div>
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

export default EditHealthJournal;
