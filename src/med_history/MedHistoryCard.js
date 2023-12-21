import React from "react";
import { Link } from "react-router-dom";

import "./MedHistoryCard.css";

/** Show information about a medication
 *
 * Is rendered by MedHistoryList to show a "card" for each med.
 *
 * MedHistoryList -> MedHistoryCard
 */

function MedHistoryCard({ id, name, status, start, stop }) {
  console.debug("MedHistoryCard");
  start = start.split("T")[0];
  stop = stop ? stop.split("T")[0] : stop;

  return (
    <div className="col-md-3 mb-4 d-flex">
      <div className="card flex-fill custom-card-med">
        <div className="card-icon-container ">
          <i
            className={`fa-solid fa-circle ${
              status === "active" ? "custom-blue-fa" : "custom-red-fa"
            }`}
          ></i>
        </div>
        <div className="card-body flex-grow-1">
          <div className="card-details flex-grow-1">
            <h5 className="card-title">{name} </h5>

            <p
              className={`class="card-text" ${
                status === "active" ? "text-info" : "text-danger"
              }`}
            >
              Status: {status}
            </p>
            <p class="card-text">Start Date: {start}</p>
            <p className="card-text">Stop Date: {stop}</p>
          </div>
        </div>

        <div className="card-footer">
          <Link
            to={`/med_history/edit/${id}`}
            className="btn btn-sm custom-edit-med "
          >
            <i class="fa-regular fa-pen-to-square"></i>
          </Link>

          <Link
            to={`/med_history/delete/${id}`}
            className="btn btn-sm custom-delete-med"
          >
            <i class="fa-solid fa-trash-can"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MedHistoryCard;
