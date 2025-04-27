import React, { useState } from "react";
import { LogOut } from "./LogOut.tsx";
import { useAuth0 } from "@auth0/auth0-react";
import "../styles/home.css"; // Adjust the path as necessary

import { useNavigate } from "react-router-dom";
import { ReportCenter } from "./reportcenter.tsx";

function Home() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");
  const [isOpenN, setIsOpenN] = useState(false);
  const [isOpenP, setIsOpenP] = useState(false);
  const [reports, setreports] = useState([]);

  const { logout } = useAuth0();
  const returnLandingPage = () => {
    navigate("/");
  };

  const loggingOut = () => {
    console.log("logout");

    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  const inputshandler = (e: { target: { value: any } }) => {
    const value = e.target.value;
    setSelectedOption(value);

    if (value == "nomC") {
      openchangeN();
    }
    if (value == "passwordC") {
      openchangeP();
    }
    if (value == "logout") {
      loggingOut();
    }
  };

  const openchangeN = () => {
    setIsOpenN(true);
  };
  const closechangrN = () => {
    //save new value

    setIsOpenN(false);
    setSelectedOption("");
  };
  const openchangeP = () => {
    setIsOpenP(true);
  };
  const closechangeP = () => {
    // save password
    setIsOpenP(false);
    setSelectedOption("");
  };

  return (
    <>
      <div id="homeBar">
        <img
          src="src/assets/EnviroActions.png"
          alt="EnviroAction Logo"
          id="logo"
          onClick={returnLandingPage}
        ></img>
        <select
          onChange={inputshandler}
          value={selectedOption}
          id="dropDownMenu"
        >
          <option value="">Account Name</option>
          <option value="nomC">Change Name</option>
          <option value="passwordC">Change Password</option>
          <option value="logout">Log Out</option>
        </select>
        {isOpenN && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                backgroundColor: "red",
                padding: "30px",
                borderRadius: "10px",
                boxShadow: "0px 5px 15px rgba(0,0,0,0.3)",
                textAlign: "center",
              }}
            >
              <h4>Choose your name</h4>
              <input></input>
              <button onClick={closechangrN}></button>
            </div>
          </div>
        )}
        {isOpenP && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                backgroundColor: "red",
                padding: "30px",
                borderRadius: "10px",
                boxShadow: "0px 5px 15px rgba(0,0,0,0.3)",
                textAlign: "center",
              }}
            >
              <h4>Choose your password</h4>
              <input></input>
              <button onClick={closechangeP}>Save</button>
            </div>
          </div>
        )}
      </div>

      <div className="scrollable-div">
        <ul>
          {reports.map((report) => (
            <li key={report}>{report}</li>
          ))}
        </ul>
        <ReportCenter />
      </div>
    </>
  );
}
export default Home;
