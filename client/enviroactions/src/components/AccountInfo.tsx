import React from "react";
export function AccountInfo() {
    return (
        <div>
            <h1>Account Info</h1>
            <p>Here you can view and edit your account information.</p>
        </div>
    );
}

export default function GetInfo() {
  return (
    <div>
      <h1>Account</h1>
      <p>This is the account page.</p>
      <input type="text" placeholder="Enter your name" />
      <input type="password" placeholder="Password" />
      <input type="password" placeholder="Confirm Password" />
      <button>Create Account</button>
    </div>
  );
}
