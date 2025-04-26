import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const LogOut: React.FC = () => {
  const { logout } = useAuth0();

  const handleLogOut = async (e: React.MouseEvent) => {
    e.preventDefault();

    await logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return <button onClick={handleLogOut}>Log Out</button>;
};
