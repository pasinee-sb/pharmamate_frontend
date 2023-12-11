import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Articles from "../Articles";
// import "./Homepage.css";
import UserContext from "../auth/UserContext";
import SearchForm from "../common/SearchForm";
import PharmamateAPI from "../api/api";
import Drug from "../common/Drug";
import LoadingSpinner from "../common/LoadingSpinner";

/** Homepage of site.
 *
 * Shows welcome message or login/register buttons.
 *
 * Routed at /
 *
 * Routes -> Homepage
 */

function Homepage() {
  console.debug("Homepage");

  const { currentUser } = useContext(UserContext);
  console.debug("Homepage", "currentUser=", currentUser);
  const [drugDetail, setDrugDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to parse query parameters
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const query = useQuery();
  const searchQuery = query.get("drug");

  useEffect(() => {
    if (searchQuery) {
      search(searchQuery);
    }
  }, [searchQuery]);

  async function search(drug) {
    setIsLoading(true);
    setError(null);
    try {
      let response = await PharmamateAPI.getDrug(drug);
      console.log("Search results:", response.response);

      if (response.response) {
        setDrugDetail(response.response);
      } else {
        setError("Drug details not found.");
        setDrugDetail(null);
      }
    } catch (err) {
      setError(err.toString());
      setDrugDetail(null);
    }
    setIsLoading(false);
  }

  console.log(`This is drug Detail:`, drugDetail);

  return (
    <div className="Homepage">
      <div className="container text-center">
        <h1 className="mb-4 font-weight-bold">PharmaMate</h1>
        <p className="lead">For every med you take</p>

        {currentUser ? (
          <h2>Welcome Back, {currentUser.username}!</h2>
        ) : (
          <p>
            <Link className="btn btn-primary font-weight-bold mr-3" to="/login">
              Log in
            </Link>
            <Link className="btn btn-primary font-weight-bold" to="/signup">
              Sign up
            </Link>
          </p>
        )}
        <SearchForm searchFor={search} />
        {drugDetail ? (
          <div>
            <h1>Drug Details</h1>
            <Drug key={drugDetail.id} drugDetail={drugDetail} />
          </div>
        ) : isLoading ? ( // Show loading spinner while data is loading
          <LoadingSpinner />
        ) : (
          // Render search results or default content
          <Articles />
        )}
      </div>
    </div>
  );
}

export default Homepage;
