import React, { useState, useEffect, useRef, useContext } from "react";
import "./SearchForm.css";
import axios from "axios";

import debounce from "lodash.debounce"; // Make sure to install lodash.debounce

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

/** Search widget.

 */
function SearchForm({ onSearchSubmit }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    // Debounce the search function
    const debouncedSearch = debounce(async (searchValue) => {
      if (searchValue.length > 2) {
        try {
          const response = await axios.get(
            `https://dailymed.nlm.nih.gov/dailymed/services/v2/drugnames.json?drug_name=${searchValue}`
          );
          setSuggestions(response.data.data.map((d) => d.drug_name));
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        setSuggestions([]);
      }
    }, 500); // 500ms debounce time

    if (searchTerm) {
      debouncedSearch(searchTerm);
    }

    return () => debouncedSearch.cancel(); // Cancel the debounce on component unmount
  }, [searchTerm]);

  const handleChange = (event, newInputValue) => {
    setSearchTerm(newInputValue);
  };

  function handleSubmit(evt) {
    console.log(evt);
    evt.preventDefault();
    onSearchSubmit(searchTerm.trim() || undefined);
    setSearchTerm("");
  }

  return (
    <div className="SearchForm mb-4 custom-autocomplete">
      <Autocomplete
        inputValue={searchTerm}
        onInputChange={handleChange}
        onChange={(event, newValue) => {
          onSearchSubmit(
            newValue ? encodeURIComponent(newValue.replace(/\s/g, "+")) : ""
          );
        }}
        options={suggestions}
        isOptionEqualToValue={(option, value) => option === value}
        renderInput={(params) => (
          <TextField
            {...params}
            className="form-control form-control-lg flex-grow-1 me-3 italic-placeholder "
            name="searchTerm"
            placeholder="Enter drug name for label info"
          />
        )}
      />
      <button className="btn btn-lg btn-dark search-button">
        <i className="fa-solid fa-magnifying-glass magnifying"></i>
      </button>
    </div>
  );
}

export default SearchForm;
