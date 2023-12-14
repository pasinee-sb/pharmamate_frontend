import React, { useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import UserContext from "../auth/UserContext";
import PharmamateAPI from "../api/api";
import Alert from "../common/Alert";

function DeleteHealthJournal() {
  const { currentUser } = useContext(UserContext);
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleDelete = async () => {
    try {
      await PharmamateAPI.deleteHealthJournal(currentUser.username);
      // Redirect after successful deletion
      history.push("/health_journal");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h3>Delete Health Journal</h3>
      {error && <Alert type="danger" messages={[error]} />}
      <p>Are you sure you want to delete this journal?</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default DeleteHealthJournal;
