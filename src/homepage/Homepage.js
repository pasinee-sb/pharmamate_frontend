import React from "react";
import { useHistory } from "react-router-dom";
import Articles from "./Articles";
import "./Article.css";

import SearchForm from "../drug_search/SearchForm";

function Homepage() {
  const history = useHistory();

  function handleSearchSubmit(searchTerm) {
    history.push(`/search?drug=${encodeURIComponent(searchTerm)}`);
  }

  return (
    <div className="Homepage">
      <div className="container text-center">
        <h1 className="mb-4 font-weight-bold">PharmaMate</h1>
        <p className="lead">For every med you take</p>

        <SearchForm onSearchSubmit={handleSearchSubmit} />

        <Articles />
      </div>
    </div>
  );
}

export default Homepage;
