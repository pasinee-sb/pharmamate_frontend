import React, { useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import UserContext from "../auth/UserContext";
import PharmamateAPI from "../api/api";
import Alert from "../common/Alert";

function DeleteMed() {
  const { medId } = useParams();
  const { currentUser } = useContext(UserContext);
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleDelete = async () => {
    try {
      const medIdNum = parseInt(medId, 10);
      await PharmamateAPI.deleteMedHistory(currentUser.username, medIdNum);

      history.push("/med_history");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center ">
      <div className="card text-center">
        <div className="card-body">
          <h3>Delete Medication</h3>
          {error && <Alert type="danger" messages={[error]} />}
          <p>Are you sure you want to delete this medication?</p>
        </div>
        <div>
          <button
            className="btn btn-danger btn-block mb-3"
            onClick={handleDelete}
          >
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteMed;
