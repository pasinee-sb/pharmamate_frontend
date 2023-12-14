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
  const [myjournal, setJournal] = useState([]);
  const user = currentUser.username;

  useEffect(function getJournalOnMount() {
    getJournal();
  }, []);
  async function getJournal() {
    console.log("I am here fetching MedList");
    const myJournal = await PharmamateAPI.getHealthJournal(user);
    setJournal(myJournal);
  }
  if (!myjournal) return <LoadingSpinner />;
  return (
    <div>
      {myjournal ? (
        <div>{myjournal.journal} </div>
      ) : (
        <div>
          <h1>"No health Journal found"</h1>
        </div>
      )}
      <div className="link-container">
        <Link to={`/health_journal/edit`} className="btn btn-sm btn-primary">
          Edit journal
        </Link>
        {""}
        <Link to={`/health_journal/delete`} className="btn btn-sm btn-danger ">
          Delete journal
        </Link>
      </div>
    </div>
  );
}

export default HealthJournal;
