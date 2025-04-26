// src/components/SignUp.tsx
//Hello team :)
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const SignUp: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  const handleSignUp = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/report",
      },
      authorizationParams: {
        screen_hint: "signup",
      },
    });
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
};
