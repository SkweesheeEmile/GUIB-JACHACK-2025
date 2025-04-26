// src/components/SignIn.tsx
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const SignIn: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/home",
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
