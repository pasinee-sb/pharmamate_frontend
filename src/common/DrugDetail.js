import { useLocation } from "react-router-dom";
import React, { useState } from "react";
import DOMPurify from "dompurify";
import "./DrugDetail.css";

function DrugDetail() {
  const location = useLocation();
  const drugDetail = location.state?.detail;
  console.log(`This is drug detail `, drugDetail);

  // Define state for handling super long text expansion
  const [expandedSections, setExpandedSections] = useState({});
  // Toggle expanded state for a section
  const toggleExpanded = (sectionKey) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }));
  };

  function renderLongText(sectionKey, text) {
    const isExpanded = expandedSections[sectionKey];
    const shouldShowMore = text.length > 500;
    return (
      <div>
        <p>{isExpanded ? text : text.substring(0, 500) + "..."}</p>
        {shouldShowMore && (
          <button
            className="btn custom-button"
            onClick={() => toggleExpanded(sectionKey)}
          >
            {isExpanded ? (
              <>
                <i className="fa fa-chevron-up"></i> Show Less
              </>
            ) : (
              <>
                <i className="fa fa-chevron-down"></i> Show More
              </>
            )}
          </button>
        )}
      </div>
    );
  }

  function renderPatternText(sectionKey, text) {
    const isExpanded = expandedSections[sectionKey];
    const shouldShowMore = text.length > 500;

    // Define both patterns
    const bulletPointPattern = /•/g;
    const parenthesesPattern = /\(\s*\d+\.\d+\s*\)/g; // For "(2.1)"

    let lines;

    // Check which pattern is present in the text
    if (bulletPointPattern.test(text)) {
      // Splitting the text at each occurrence of bullet point pattern
      const parts = text.split(bulletPointPattern);

      // Mapping the parts to JSX
      return (
        <div>
          {parts.map((part, index) => {
            if (index === 0) {
              // For the first part, no bullet point is added
              return <p key={index}>{part}</p>;
            } else {
              // For subsequent parts, prepend the bullet point
              const line = "• " + part;
              return (
                <p key={index}>
                  {isExpanded
                    ? line
                    : line.substring(0, 500) + (line.length > 500 ? "..." : "")}
                </p>
              );
            }
          })}
          {text.length > 500 && (
            <button
              className="btn  custom-button"
              onClick={() => toggleExpanded(sectionKey)}
            >
              {isExpanded ? (
                <>
                  <i className="fa fa-chevron-up"></i> Show Less
                </>
              ) : (
                <>
                  <i className="fa fa-chevron-down"></i> Show More
                </>
              )}
            </button>
          )}
        </div>
      );
    } else if (parenthesesPattern.test(text)) {
      // Splitting the text at each occurrence of parentheses pattern
      lines = text.split(parenthesesPattern);

      // Remove empty first element if present
      if (lines.length > 0 && lines[0].trim() === "") {
        lines.shift();
      }
    } else {
      // If no pattern is detected, return the text as is
      return <p>{text}</p>;
    }

    // Map each line to JSX
    return (
      <div>
        {lines.map((line, index) => (
          <p key={index}>
            {isExpanded ? line.trim() : line.trim().substring(0, 500) + "..."}
          </p>
        ))}
        {shouldShowMore && (
          <button
            className="btn  custom-button"
            onClick={() => toggleExpanded(sectionKey)}
          >
            {isExpanded ? (
              <>
                <i className="fa fa-chevron-up"></i> Show Less
              </>
            ) : (
              <>
                <i className="fa fa-chevron-down"></i> Show More
              </>
            )}
          </button>
        )}
      </div>
    );
  }

  // Handle super long text
  function renderSuperLongText(sectionKey, text) {
    const isExpanded = expandedSections[sectionKey];
    const MAX_LENGTH = 500; // Maximum characters to show initially
    const displayedText = isExpanded
      ? text
      : text.substring(0, MAX_LENGTH) + "...";
    return (
      <div>
        <p>{displayedText}</p>
        <button
          className="btn  custom-button"
          onClick={() => toggleExpanded(sectionKey)}
        >
          {isExpanded ? (
            <>
              <i className="fa fa-chevron-up"></i> Show Less
            </>
          ) : (
            <>
              <i className="fa fa-chevron-down"></i> Show More
            </>
          )}
        </button>
      </div>
    );
  }

  // Render HTML content safely
  function renderHTML(htmlContent) {
    const cleanHTML = DOMPurify.sanitize(htmlContent);
    return <div dangerouslySetInnerHTML={{ __html: cleanHTML }}></div>;
  }

  // Main rendering logic for different data types
  function renderContent(sectionKey, value) {
    // Check if value is a string before proceeding
    if (typeof value === "string") {
      // Check for HTML content
      if (value.includes("<table")) {
        return renderHTML(value);
      }
      // Check for patterned text
      else if (/\(\s*\d+\.\d+\s*\)/g.test(value) || /•/g.test(value)) {
        return renderPatternText(sectionKey, value);
      }
      // Check for super long text
      else if (value.length > 1000) {
        return renderSuperLongText(sectionKey, value);
      }

      // Handle as normal text
      else {
        return renderLongText(sectionKey, value);
      }
    }
    // Handle arrays
    else if (Array.isArray(value)) {
      return value.map((item, index) => (
        <div key={index}>{renderContent(sectionKey, item)}</div>
      ));
    }
    // Handle objects
    else if (typeof value === "object" && value !== null) {
      return (
        <div>
          {Object.entries(value).map(([sectionKey, value], index) => (
            <div key={index}>
              <strong>{sectionKey.replace(/_/g, " ")}:</strong>{" "}
              {renderContent(sectionKey, value)}
            </div>
          ))}
        </div>
      );
    }
    // Handle other values
    else {
      return <p>{value}</p>;
    }
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-end">
        <a
          className="btn custom-button-red  mb-3"
          href={`https://dailymed.nlm.nih.gov/dailymed/downloadpdffile.cfm?setId=${drugDetail.set_id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa-sharp fa-regular fa-file-pdf fa-2xl"></i> Download
          full package insert
        </a>
      </div>

      {drugDetail.openfda.brand_name[0].toLowerCase() !==
      drugDetail.openfda.generic_name[0].toLowerCase() ? (
        <div>
          {" "}
          <h2>Brand Name</h2> <p>{drugDetail.openfda.brand_name[0]}</p>
          <h2>Generic Name</h2>
          <p> {drugDetail.openfda.generic_name[0]}</p>
        </div>
      ) : (
        <div>
          <h3>Generic Name</h3>
          <p> {drugDetail.openfda.generic_name[0]}</p>
          <h3>Manufacturer</h3>
          <p> {drugDetail.openfda.manufacturer_name[0]}</p>
        </div>
      )}
      {[
        "indications_and_usage",
        "dosage_and_administration",
        "dosage_forms_and_strengths",
        "information_for_patients",
        "storage_and_handling",

        "geriatric_use",
        "mechanism_of_action",
        "adverse_reactions_table",
        "contraindications",
        "pregnancy",
        "nursing_mothers",
        "pediatric_use",
        "overdosage",
        "how_supplied",
      ].map((sectionKey) => {
        const value = drugDetail[sectionKey];
        if (value) {
          return (
            <div key={sectionKey}>
              <h3 className="mt-3">
                {sectionKey.replace(/_/g, " ").toUpperCase()}
              </h3>
              {renderContent(sectionKey, value)}
            </div>
          );
        }
        return null; // If the key doesn't exist in drugDetail, don't render anything
      })}
    </div>
  );
}

export default DrugDetail;
