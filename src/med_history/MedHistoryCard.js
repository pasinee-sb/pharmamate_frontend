import React from "react";
import { Link } from "react-router-dom";

import "./CompanyCard.css";

/** Show limited information about a company
 *
 * Is rendered by CompanyList to show a "card" for each company.
 *
 * CompanyList -> CompanyCard
 */

function EditMedHistory({ id, name, status, start, stop }) {
  console.debug("MedHistoryCard");

  return (
    <div className="card-body">
      <h6 className="card-title">Drug: {name}</h6>
      <h6
        className={`card-title ${
          status === "active" ? "text-info" : "text-warning"
        }`}
      >
        Status: {status}
      </h6>
      <h6 className="card-title">Start Date: {start}</h6>
      <h6 className="card-title">Stop Date: {stop}</h6>
      <h6 className="card-title">Id: {id}</h6>

      <div className="link-container">
        <Link to={`/med_history/edit/${id}`} className="btn btn-sm btn-primary">
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
  );
}

export default EditMedHistory;
