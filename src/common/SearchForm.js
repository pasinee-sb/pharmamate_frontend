import React, { useState } from "react";
import "./SearchForm.css";

/** Search widget.

 */

function SearchForm({ onSearchSubmit }) {
  console.debug("SearchForm", "searchFor=", typeof searchFor);

  const [searchTerm, setSearchTerm] = useState("");

  /** Tell parent to filter */
  function handleSubmit(evt) {
    // take care of accidentally trying to search for just spaces
    evt.preventDefault();
    onSearchSubmit(searchTerm.trim() || undefined);
    setSearchTerm("");
  }

  /** Update form fields */
  function handleChange(evt) {
    setSearchTerm(evt.target.value);
  }

  return (
    <div className="SearchForm mb-4">
      <form
        className="form-inline d-flex justify-content-center"
        onSubmit={handleSubmit}
      >
        <input
          className="form-control form-control-lg flex-grow-1 me-3 italic-placeholder "
          name="searchTerm"
          placeholder="Enter drug name to find and download drug label information"
          value={searchTerm}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-lg btn-primary">
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchForm;
