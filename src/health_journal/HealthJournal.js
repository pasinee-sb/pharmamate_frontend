import React, { useState, useContext, useEffect } from "react";

import UserContext from "../auth/UserContext";
import { Link } from "react-router-dom";
import "./HealthJournal.css";

import PharmamateAPI from "../api/api";

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
        <div className="container">
          <div className="d-flex justify-content-center align-items-center">
            <div className="card custom-card-width ">
              <div className="card-body">
                <h5 className="card-text">{journal}</h5>
              </div>

              <div className="card-footer">
                <Link
                  to={`/health_journal/edit`}
                  className="btn btn-sm custom-edit-journal"
                >
                  <i className="fa-regular fa-pen-to-square "></i>
                </Link>

                <Link
                  to={`/health_journal/delete`}
                  className="btn btn-sm btn-danger custom-delete-journal"
                >
                  <i class="fa-solid fa-trash-can "></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container">
          <hr></hr>
          <div className="card-container flex justify-content-start mt-5 mb-5">
            <Link to="/health_journal/add" style={{ textDecoration: "none" }}>
              <i
                className="fa-solid fa-circle-plus fa-2xl "
                style={{ color: "#27be84" }}
              >
                {" "}
                Add{" "}
              </i>
            </Link>
          </div>
          <div className="card-container flex">
            <p>No health journal available.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default HealthJournal;
