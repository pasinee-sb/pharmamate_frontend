import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import PharmamateAPI from "../api/api";
import DrugCard from "./DrugCard";
import LoadingSpinner from "../common/LoadingSpinner";
import SearchForm from "./SearchForm";

import "react-responsive-carousel/lib/styles/carousel.min.css";

function SearchResultsPage() {
  const [drugDetail, setDrugDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(null);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const fetchDrugs = async () => {
      setIsLoading(true);
      setError(null);
      try {
        let response = await PharmamateAPI.getDrug(searchTerm);
        if (response.response) {
          setDrugDetail(response.response || []);
        } else {
          setError("Drug details not found.");
        }
      } catch (err) {
        setError(err.toString());
      } finally {
        setIsLoading(false);
      }
    };
    const searchTerm = new URLSearchParams(location.search).get("drug");

    if (searchTerm) {
      fetchDrugs();
    }
  }, [location]);

  function handleSearchSubmit(searchTerm) {
    history.push(`/search?drug=${encodeURIComponent(searchTerm)}`);
  }

  return (
    <div className="Homepage">
      <div className="container text-center">
        <SearchForm onSearchSubmit={handleSearchSubmit} />
        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : (
          drugDetail &&
          drugDetail.length > 0 && (
            <div className="container ">
              <div className="row">
                {drugDetail.map((detail, index) => (
                  <DrugCard key={index} drugDetail={detail} />
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default SearchResultsPage;
