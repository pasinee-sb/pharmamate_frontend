import React, { useState, useEffect } from "react";
import "./SearchForm.css";
import axios from "axios";

import debounce from "lodash.debounce";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import PharmamateAPI from "../api/api";

/** Search widget.

 */
function SearchForm({ onSearchSubmit }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const debouncedSearch = debounce(async (searchValue) => {
      if (searchValue.length > 2) {
        try {
          const response = await PharmamateAPI.getDrugAutocomplete(searchValue);
          let autocompleteArray = response.response.map((d) => d.drug_name);
          setSuggestions(autocompleteArray);
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

  const handleChange = (newInputValue) => {
    setSearchTerm(newInputValue);
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    onSearchSubmit(searchTerm.trim() || undefined);
    setSearchTerm("");
  }

  return (
    <div>
      <form
        className="SearchForm custom-autocomplete mt-5 mb-5 "
        onSubmit={handleSubmit}
      >
        <Autocomplete
          freeSolo
          inputValue={searchTerm}
          onInputChange={(event, newInputValue) => {
            handleChange(newInputValue); // Update searchTerm state on every input change
          }}
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
              placeholder="Enter drug name for label information"
            />
          )}
        />

        <button type="submit" className="btn btn-lg btn-dark search-button">
          <i className="fa-solid fa-magnifying-glass magnifying"></i>
        </button>
      </form>
    </div>
  );
}

export default SearchForm;
