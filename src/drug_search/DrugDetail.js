import { useLocation } from "react-router-dom";
import React, { useState } from "react";
import DOMPurify from "dompurify";
import "./DrugDetail.css";

// The API returns various types of responses, including objects, arrays, strings, and HTML content.
// The following functions are designed to appropriately render these diverse data formats
// in the UI, ensuring correct handling and display for each type of response.

function DrugDetail() {
  const location = useLocation();
  const drugDetail = location.state?.detail;

  // Define state for handling super long text expansion
  const [expandedSections, setExpandedSections] = useState({});

  // Toggle expanded state for a section
  const toggleExpanded = (sectionKey) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }));
  };

  function ShowMoreLessButton({ isExpanded, sectionKey, toggleExpanded }) {
    return (
      <button
        className="btn custom-button mb-2"
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
    );
  }

  function renderPatternText(sectionKey, text, isExpanded, toggleExpanded) {
    // Define both patterns
    const bulletPointPattern = /•/g;

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
              return <p key={index}>{isExpanded ? line : ""}</p>;
            }
          })}
          {text.length > 100 && (
            <ShowMoreLessButton
              {...{ isExpanded, sectionKey, toggleExpanded }}
            />
          )}
        </div>
      );
    }
  }

  // Handle super long text
  function renderSuperLongText(sectionKey, text, isExpanded, toggleExpanded) {
    const MAX_LENGTH = 100; // Maximum characters to show initially
    const displayedText = isExpanded
      ? /•/g.test(text)
        ? renderPatternText(sectionKey, text, isExpanded, toggleExpanded)
        : text
      : text.substring(0, MAX_LENGTH) + "...";

    return (
      <div>
        <p>{displayedText}</p>
        <ShowMoreLessButton {...{ isExpanded, sectionKey, toggleExpanded }} />
      </div>
    );
  }

  // Render HTML content safely using DOMpurity
  function renderHTML(sectionKey, htmlContent, isExpanded, toggleExpanded) {
    const cleanHTML = DOMPurify.sanitize(htmlContent);
    const displayedText = isExpanded ? (
      <div dangerouslySetInnerHTML={{ __html: cleanHTML }}></div>
    ) : (
      ""
    );

    return (
      <div>
        <div>{displayedText}</div>
        <div>
          <ShowMoreLessButton {...{ isExpanded, sectionKey, toggleExpanded }} />
        </div>
      </div>
    );
  }

  // Main rendering logic for different data types
  function renderContent(sectionKey, value) {
    // Correctly use isExpanded from expandedSections
    const isExpanded = expandedSections[sectionKey];
    // Check if value is a string before proceeding
    if (typeof value === "string") {
      // Check for HTML content
      if (value.includes("<table")) {
        return renderHTML(sectionKey, value, isExpanded, toggleExpanded);
      }

      // Check for super long text
      else if (value.length > 100) {
        return renderSuperLongText(
          sectionKey,
          value,
          isExpanded,
          toggleExpanded
        );
      }

      // Handle as normal text
      else {
        return <p>{value}</p>;
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
          <i class="fa-solid fa-download fa-xl"></i> Download full package
          insert
        </a>
      </div>

      {drugDetail.openfda.brand_name[0].toLowerCase() !==
      drugDetail.openfda.generic_name[0].toLowerCase() ? (
        <div>
          {" "}
          <h2 className="sectionKey">BRAND NAME</h2>{" "}
          <p>{drugDetail.openfda.brand_name[0].toUpperCase()}</p>
          <h2 className="sectionKey">GENERIC NAME</h2>
          <p> {drugDetail.openfda.generic_name[0].toUpperCase()}</p>
          <h3 className="sectionKey">MANUFACTURER</h3>
          <p> {drugDetail.openfda.manufacturer_name[0].toUpperCase()}</p>
        </div>
      ) : (
        <div>
          <h2 className="sectionKey">GENERIC NAME</h2>
          <p> {drugDetail.openfda.generic_name[0].toUpperCase()}</p>
          <h3 className="sectionKey">MANUFACTURER</h3>
          <p> {drugDetail.openfda.manufacturer_name[0].toUpperCase()}</p>
        </div>
      )}
      {[
        "indications_and_usage",
        "dosage_and_administration",
        "dosage_forms_and_strengths",
        "information_for_patients",
        "storage_and_handling",
        "mechanism_of_action",
        "adverse_reactions_table",
        "contraindications",
        "geriatric_use",
        "pregnancy",
        "nursing_mothers",
        "pediatric_use",
        "warnings_and_cautions_table",
        "use_in_specific_populations_table",
        "overdosage",
        "how_supplied",
      ].map((sectionKey) => {
        const value = drugDetail[sectionKey];
        if (value) {
          return (
            <div key={sectionKey}>
              <h3 className="sectionKey">
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
