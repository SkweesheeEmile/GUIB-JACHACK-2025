import React from "react";
import Home from "./Home";
import { useState } from "react";
import GetInfo from "./AccountInfo";

export function Account(Request: string) {
  const [userInfo, setUserInfo] = useState({
    name: "",
    password: "",
  });

  const VerifyUser = () => {};

  return (
    <div>
      <h1>Account</h1>
      <p>This is the account page.</p>
      <input type="text" placeholder="Enter your name" />
      <input type="text" placeholder="Password" />
      <input type="text" placeholder="Confirm Password" />
      <button onClick={VerifyUser}>Next</button>
    </div>
  );
}
