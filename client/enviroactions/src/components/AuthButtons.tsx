// src/components/AuthButtons.tsx
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { SignUp } from "./SignUp";
import { SignIn } from "./SignIn";
import "../styles/landingPage.css"; // Adjust the path as necessary

const AuthButtons: React.FC = () => {
  const { isLoading } = useAuth0();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div id="authButtons">
      <div>
        <SignIn />
      </div>
      <div>
        <SignUp />
      </div>
    </div>
  );
};

export default AuthButtons;
