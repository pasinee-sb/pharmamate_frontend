import React, { useEffect, useState } from "react";

import "./Drug.css";
import axios from "axios";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function Drug({ drugDetail }) {
  const [imageUrls, setImageUrls] = useState([]);

  // useEffect(() => {
  //   const fetchImage = async () => {
  //     if (!drugDetail.set_id) return;

  //     try {
  //       const response = await axios.get(
  //         `https://dailymed.nlm.nih.gov/dailymed/services/v2/spls/${drugDetail.set_id}/media.json`
  //       );
  //       console.log("Response:", response);
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok.");
  //       }
  //       const data = await response.json();
  //       console.log("Parsed data:", data.data);
  //       if (data.data.media && data.data.media.length > 0) {
  //         console.log("Set image URL:", data.data.media[0].url);
  //         setImageUrls(data.data.media.map((media) => media.url)); // Using the first image as an example
  //       }
  //     } catch (error) {
  //       console.error("Error fetching image:", error);
  //     }
  //   };

  //   fetchImage();
  // }, [drugDetail.set_id]);

  // Rest of your component render logic

  return (
    <div className="card carousel-card">
      <div className="drug-card card-body">
        {/* {imageUrls.length > 0 && (
          <div
            className="article-image"
            style={{ backgroundImage: `url(${imageUrls[0]})` }}
            alt={drugDetail.openfda.brand_name[0]}
          ></div>
        )} */}

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

        <div className="card-details">
          <p className="text-success ">
            Manufacturer: {drugDetail.openfda.manufacturer_name[0]}
          </p>
          <p>NDC: {drugDetail.openfda.product_ndc[0]}</p>

          <Link
            to={{
              pathname: `/drug/${drugDetail.set_id}`,
              state: { detail: drugDetail },
            }}
          >
            More detail
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Drug;
