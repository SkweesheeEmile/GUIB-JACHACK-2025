// src/components/SignIn.tsx
import React from "react";
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
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
};
