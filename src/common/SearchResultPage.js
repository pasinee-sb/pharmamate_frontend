import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import PharmamateAPI from "../api/api";
import DrugSearchResult from "./DrugSearchResult";
import LoadingSpinner from "./LoadingSpinner";
import SearchForm from "./SearchForm";

import "react-responsive-carousel/lib/styles/carousel.min.css";

function SearchResultsPage() {
  const [drugDetail, setDrugDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(null);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const searchTerm = query.get("drug");

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
                  <DrugSearchResult key={index} drugDetail={detail} />
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
