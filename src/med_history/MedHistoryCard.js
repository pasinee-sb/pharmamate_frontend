import React from "react";
import { Link } from "react-router-dom";

import "./CompanyCard.css";

/** Show limited information about a company
 *
 * Is rendered by CompanyList to show a "card" for each company.
 *
 * CompanyList -> CompanyCard
 */

function MedHistoryCard({ id, name, status, start, stop }) {
  console.debug("MedHistoryCard");
  start = start.split("T")[0];
  stop = stop ? stop.split("T")[0] : stop;

  return (
    <div>
      <div class="card">
        <div className="card-body">
          <h5 className="card-title">Drug: {name}</h5>
          <p
            className={`class="card-text" ${
              status === "active" ? "text-info" : "text-warning"
            }`}
          >
            Status: {status}
          </p>
          <p class="card-text">Start Date: {start}</p>
          <p className="card-text">Stop Date: {stop}</p>

          <div className="link-container">
            <Link
              to={`/med_history/edit/${id}`}
              className="btn btn-sm btn-primary"
            >
              Edit drug
            </Link>
            {""}
            <Link
              to={`/med_history/delete/${id}`}
              className="btn btn-sm btn-danger "
            >
              Delete drug
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MedHistoryCard;
