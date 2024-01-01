import React from "react";

import "./DrugCard.css";

import { Link } from "react-router-dom/cjs/react-router-dom.min";

function DrugCard({ drugDetail }) {
  return (
    <div className="col-md-3 mb-4 d-flex">
      <div className="card flex-fill d-flex flex-column">
        <div className="card-body flex-grow-1">
          <div className="card-title">
            {drugDetail.openfda.brand_name[0].toLowerCase() ===
            drugDetail.openfda.generic_name[0].toLowerCase() ? (
              <>
                <h3>{drugDetail.openfda.generic_name[0]}</h3>
              </>
            ) : (
              <>
                <h3>{drugDetail.openfda.brand_name[0]}</h3>
                <p>{drugDetail.openfda.generic_name[0]}</p>
              </>
            )}
          </div>

          <div className="card-details flex-grow-1">
            <p className="custom-text">
              Manufacturer: {drugDetail.openfda.manufacturer_name[0]}
            </p>
            <p>NDC: {drugDetail.openfda.product_ndc[0]}</p>
          </div>
        </div>
        <div className="card-footer flex justify-content-end">
          <Link
            to={{
              pathname: `/drug/${drugDetail.set_id}`,
              state: { detail: drugDetail },
            }}
          >
            <button className="btn btn-primary">
              <i className="custom-tag-drug-search fa-solid fa-up-right-from-square"></i>{" "}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DrugCard;
