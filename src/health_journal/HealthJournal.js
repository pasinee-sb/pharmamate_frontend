import React, { useState, useContext, useEffect } from "react";
import Alert from "../common/Alert";
import UserContext from "../auth/UserContext";
import { Link } from "react-router-dom";

// eslint-disable-next-line
import useTimedMessage from "../hooks/useTimedMessage";
import PharmamateAPI from "../api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import LoadingSpinner from "../common/LoadingSpinner";

function HealthJournal() {
  const { currentUser } = useContext(UserContext);
  const [journal, setJournal] = useState("");
  const [error, setError] = useState(null);
  const username = currentUser.username;

  useEffect(() => {
    async function getJournal() {
      try {
        console.log("I am here fetching MedList");
        const myJournal = await PharmamateAPI.getHealthJournal(username);

        console.log(`This is my journal `, myJournal);
        setError([]);
        setJournal(myJournal.journal);
      } catch (error) {
        setError([error.message]);
      }
    }
    getJournal();
  }, [username]);

  // if (journal === undefined) return <LoadingSpinner />;
  return (
    <div>
      {journal ? (
        <>
          <div>{journal}</div>
          <div>
            <Link
              to={`/health_journal/edit`}
              className="btn btn-sm btn-primary"
            >
              Edit journal
            </Link>
          </div>
          <div>
            <Link
              to={`/health_journal/delete`}
              className="btn btn-sm btn-danger"
            >
              Delete journal
            </Link>
          </div>
        </>
      ) : (
        <div>
          <Link to={`/health_journal/add`} className="btn btn-sm btn-info">
            Add Health Journal
          </Link>
          <p>Journal not found</p>
        </div>
      )}
    </div>
  );
}

export default HealthJournal;
