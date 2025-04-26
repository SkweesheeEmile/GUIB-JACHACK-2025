<<<<<<< HEAD
export function SignIn() {
    return (
        <div>
            <h1>Sign In</h1>
        </div>
    );
}
=======
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
>>>>>>> f9536026e9f8a8ebfc6b29342d03ad762aeaa440
