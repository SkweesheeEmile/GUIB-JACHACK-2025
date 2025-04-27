import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/reportButton.css"; // Adjust the path as necessary

export function ReportCenter() {
  const navigate = useNavigate();

  const newReport = () => {
    navigate("/form");
  };

  return (
    <div id="reportButtonContainer">
      <button id="addButton" onClick={newReport}>
        +
      </button>
      <p>New Report</p>
    </div>
  );
}
