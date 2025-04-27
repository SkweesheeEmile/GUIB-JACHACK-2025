// src/components/SignIn.tsx
import React from "react";
import {Home} from "./Home";
import { useState } from "react";
import GetInfo from "./AccountInfo";
import { useAuth0 } from "@auth0/auth0-react";

export const SignIn: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async (e: React.MouseEvent) => {
    e.preventDefault();

    await loginWithRedirect({
      appState: {
        returnTo: `${window.location.origin}`,
      },
      authorizationParams: {
        redirect_uri: `${window.location.origin}/home`,
      },
    });
  };

  return (
    <div>
      <h2>Sign In</h2>
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
};
