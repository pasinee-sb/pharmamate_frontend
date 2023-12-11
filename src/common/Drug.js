import React from "react";
import { Link } from "react-router-dom";

// import "./CompanyCard.css";

/** Show limited information about a company
 *
 * Is rendered by CompanyList to show a "card" for each company.
 *
 * CompanyList -> CompanyCard
 */

function Drug({ drugDetail }) {
  //   console.debug("Drug", logoUrl);

  return (
    // <Link className="CompanyCard card" to={`/companies/${handle}`}>
    <div className="card-body">
      {drugDetail.openfda.brand_name[0].toLowerCase() !==
      drugDetail.openfda.generic_name[0].toLowerCase() ? (
        <div>
          {" "}
          <h3>Brand Name</h3>
          <p>{drugDetail.openfda.brand_name[0]}</p>{" "}
        </div>
      ) : (
        ""
      )}
      <h3>Generic Name</h3> <p>{drugDetail.openfda.generic_name[0]}</p>
      <h3>Description</h3> <p>{drugDetail.description[0]}</p>
      <h3>Contraindication</h3> <p>{drugDetail.contraindications[0]}</p>
      <h3>Adverse Reactions</h3> <p>{drugDetail.adverse_reactions[0]}</p>
    </div>
  );

  // </Link>
}

export default Drug;
