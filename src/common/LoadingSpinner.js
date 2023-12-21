import React from "react";
import "./LoadingSpinner.css";

/** Loading message used by components that fetch API data. */

function LoadingSpinner() {
  return (
    <div className="LoadingSpinner">
      <i class="fa-solid  fa-spinner fa-spin fa-pulse"></i>
    </div>
  );
}

export default LoadingSpinner;
