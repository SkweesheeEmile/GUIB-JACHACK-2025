import React, { useState } from "react";
import Select from "react-select";
import { LogOut } from "./LogOut.tsx";
import { useAuth0 } from "@auth0/auth0-react";

import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");
  const [isOpenN, setIsOpenN] = useState(false);
  const [isOpenP, setIsOpenP] = useState(false);

  const returnhome = () => {
    navigate("/");
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
      const { logout } = useAuth0();

      logout({
        logoutParams: {
          returnTo: window.location.origin,
        },
      });
    }
  };

  const openchangeN = () => {
    setIsOpenN(true);
  };
  const closechangrN = () => {
    //save new value

    setIsOpenN(false);
  };
  const openchangeP = () => {
    setIsOpenP(true);
  };
  const closechangeP = () => {
    // save password
    setIsOpenP(false);
  };

  return (
    <div>
      <button onClick={returnhome}>
        <img></img>
      </button>
      <select onChange={inputshandler} value={selectedOption}>
        <option value="">Account Name</option>
        <option value="nomC">Change Name</option>
        <option value="passwordC">Change Password</option>
        <option value="logout">Log Out</option>
      </select>
      {isOpenN && (
        <div>
          <h4>Choose your name</h4>
          <input></input>
          <button onClick={closechangrN}></button>
        </div>
      )}
      {isOpenP && (
        <div>
          <h4>Choose your password</h4>
          <input></input>
          <button onClick={closechangeP}></button>
        </div>
      )}
      <LogOut />
    </div>
  );
}
export default Home;
