import React from "react";
import { Link } from "react-router-dom";

import "./CompanyCard.css";

/** Show limited information about a company
 *
 * Is rendered by CompanyList to show a "card" for each company.
 *
 * CompanyList -> CompanyCard
 */

function MedHistoryCard({ name, status, start, stop }) {
  console.debug("MedHistoryCard");

  return (
    <div className="card-body">
      <h6 className="card-title">Drug: {name}</h6>
      <h6 className="card-title">Status: {status}</h6>
      <h6 className="card-title">Start Date: {start}</h6>
      <h6 className="card-title">Stop Date: {stop}</h6>
    </div>
  );
}

export default MedHistoryCard;
