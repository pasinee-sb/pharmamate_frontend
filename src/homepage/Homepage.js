import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import Articles from "./Articles";
import "./Article.css";
import UserContext from "../auth/UserContext";
import SearchForm from "../common/SearchForm";
import Drug from "../common/Drug";
import LoadingSpinner from "../common/LoadingSpinner";
import PharmamateAPI from "../api/api";

function Homepage() {
  const { currentUser } = useContext(UserContext);
  const [drugDetail, setDrugDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();

  async function search(drug) {
    setIsLoading(true);
    setError(null);
    try {
      let response = await PharmamateAPI.getDrug(drug);
      if (response.response) {
        setDrugDetail(response.response);
      } else {
        setError("Drug details not found.");
        setDrugDetail(null);
      }
    } catch (err) {
      setError(err.toString());
      setDrugDetail(null);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSearchSubmit(searchTerm) {
    search(searchTerm);
    history.push(`/search?drug=${encodeURIComponent(searchTerm)}`);
  }

  return (
    <div className="Homepage">
      <div className="container text-center">
        <h1 className="mb-4 font-weight-bold">PharmaMate</h1>
        <p className="lead">For every med you take</p>

        <SearchForm onSearchSubmit={handleSearchSubmit} />
        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : (
          drugDetail &&
          drugDetail.length > 0 && (
            <div>
              <h1>Drug Details</h1>
              {drugDetail.map((detail, index) => (
                <Drug key={index} drugDetail={detail} />
              ))}
            </div>
          )
        )}
        <Articles />
      </div>
    </div>
  );
}

export default Homepage;
