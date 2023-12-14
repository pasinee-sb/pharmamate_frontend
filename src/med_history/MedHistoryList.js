import React, { useState, useContext, useEffect } from "react";
import Alert from "../common/Alert";
import UserContext from "../auth/UserContext";

// eslint-disable-next-line
import useTimedMessage from "../hooks/useTimedMessage";
import PharmamateAPI from "../api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import LoadingSpinner from "../common/LoadingSpinner";
import MedHistoryCard from "./MedHistoryCard";

function MedHistoryList() {
  const { currentUser } = useContext(UserContext);
  const [meds, setMedList] = useState([]);
  const user = currentUser.username;

  useEffect(function getMedListOnMount() {
    console.debug("MedList useEffect getMedListOnMount");
    getMeds();
  }, []);
  async function getMeds() {
    console.log("I am here fetching MedList");
    const myMeds = await PharmamateAPI.getMedHistory(user);
    setMedList(myMeds);
  }
  if (!meds) return <LoadingSpinner />;
  return (
    <div>
      {meds.length > 0 ? (
        meds.map((med) => (
          <MedHistoryCard
            key={med.id}
            id={med.id}
            name={med.drug_name}
            status={med.status}
            start={med.start_date}
            stop={med.stop_date}
          />
        ))
      ) : (
        <p>No medication history available.</p>
      )}
      {/* Other div elements */}
    </div>
  );
}

export default MedHistoryList;
