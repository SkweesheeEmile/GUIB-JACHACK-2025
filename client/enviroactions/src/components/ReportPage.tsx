import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ReportPage() {

    const navigate = useNavigate();
    const returnhome = () => {
        navigate("/")
    };

    return (

        <div>
            <button onClick={returnhome}>
                <img></img>
            </button>
            <h1>Report Name</h1>
            <p>Account information</p>
            

        </div>

    );

}
export default ReportPage;
