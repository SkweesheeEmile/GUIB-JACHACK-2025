// src/components/SignUp.tsx
//Hello team :)
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const SignUp: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  const handleSignUp = async (e: React.MouseEvent) => {
    e.preventDefault();

    await loginWithRedirect({
      appState: {
        returnTo: `${window.location.origin}`,
      },
      authorizationParams: {
        redirect_uri: `${window.location.origin}/infoForm`,
      },
    });
  };

  return <button onClick={handleSignUp}>Sign Up</button>;
};
