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
      const medIdNum = parseInt(medId, 10); // Assuming medId should be a number
      await PharmamateAPI.deleteMedHistory(currentUser.username, medIdNum);
      // Redirect after successful deletion
      history.push("/med_history");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h3>Delete Medication History</h3>
      {error && <Alert type="danger" messages={[error]} />}
      <p>Are you sure you want to delete this medication history?</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default DeleteMed;
