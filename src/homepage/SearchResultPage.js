import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PharmamateAPI from "../api/api";
import Drug from "../common/Drug";
import LoadingSpinner from "../common/LoadingSpinner";
import SearchForm from "../common/SearchForm";
import UserContext from "../auth/UserContext";
import { useHistory } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
// ... other imports ...

function SearchResultsPage() {
  const [drugDetail, setDrugDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const displayLimit = 3;
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
  const drugChunks = [];
  for (let i = 0; i < drugDetail.length; i += displayLimit) {
    drugChunks.push(drugDetail.slice(i, i + displayLimit));
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
            <Carousel showThumbs={false}>
              <div className="card-container">
                {drugChunks.map((drugDetail, index) => (
                  <div className="d-flex " key={index}>
                    {drugDetail.map((detail, index) => (
                      <Drug key={index} drugDetail={detail} />
                    ))}
                  </div>
                ))}
              </div>
            </Carousel>
          )
        )}
      </div>
    </div>
  );
}

export default SearchResultsPage;
