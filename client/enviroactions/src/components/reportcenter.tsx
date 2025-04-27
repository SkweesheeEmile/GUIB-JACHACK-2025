import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//hi

export function ReportCenter(props: any) {
  const navigate = useNavigate();

  const newReport = () => {
    navigate("/infoForm");
  };

  return (
    <div>
      <button onClick={newReport}>+</button>
      <p>New Report</p>
    </div>
  );
}
