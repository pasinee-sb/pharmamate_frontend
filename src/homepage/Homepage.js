import React, { useContext, useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import Articles from "./Articles";
import "./Article.css";
import UserContext from "../auth/UserContext";
import SearchForm from "../common/SearchForm";

import LoadingSpinner from "../common/LoadingSpinner";
import PharmamateAPI from "../api/api";

function Homepage() {
  const { currentUser } = useContext(UserContext);
  const [drugDetail, setDrugDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const isMountedRef = useRef(null);
  const history = useHistory();

  useEffect(() => {
    // When the component mounts, set isMountedRef to true
    isMountedRef.current = true;
    // Cleanup function that sets isMountedRef to false when the component unmounts
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  async function search(drug) {
    setIsLoading(true);
    setError(null);

    try {
      let response = await PharmamateAPI.getDrug(drug);
      if (isMountedRef.current) {
        if (response.response) {
          setDrugDetail(response.response);
        } else {
          setError("Drug details not found.");
          setDrugDetail(null);
        }
      }
    } catch (err) {
      setError(err.toString());
      setDrugDetail(null);
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
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
        ) : (
          <p className="text-danger">{error}</p>
        )}

        <Articles />
      </div>
    </div>
  );
}

export default Homepage;
