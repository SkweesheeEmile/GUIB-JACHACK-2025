import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function ReportCenter(){
    const navigate = useNavigate();

    const newReport = () =>{
        navigate("/infoForm")
    };

    return (

        <div>
            <button onClick={newReport}>+</button>
            <p>New Report</p>
        </div>
    );

}
