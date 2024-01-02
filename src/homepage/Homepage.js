import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import Articles from "./Articles";
import "./Article.css";
import Alert from "../common/Alert";
import { Link } from "@mui/material";
import UserContext from "../auth/UserContext";

import SearchForm from "../drug_search/SearchForm";

function Homepage() {
  const history = useHistory();
  const { currentUser } = useContext(UserContext);

  function handleSearchSubmit(searchTerm) {
    history.push(`/search?drug=${encodeURIComponent(searchTerm)}`);
  }

  return (
    <div className="Homepage">
      <div className="container text-center">
        <h1 className="mb-4 font-weight-bold">PharmaMate</h1>
        <p className="lead">For every med you take</p>
        {currentUser ? (
          ""
        ) : (
          <p className="fst-italic fs-text fs-5 text">
            <a
              className="link-offset-2 link-underline link-underline-opacity-0"
              href="/signup"
            >
              <span>Sign Up here </span>
            </a>
            to create your personalized medication profile and make life easier
            today!
          </p>
        )}

        <SearchForm onSearchSubmit={handleSearchSubmit} />
        <Articles />
      </div>
    </div>
  );
}

export default Homepage;
