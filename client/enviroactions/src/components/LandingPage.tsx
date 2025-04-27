// import { useNavigate } from 'react-router-dom';
import AuthButtons from "./AuthButtons";
import Footer from "./footer";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const { isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      // If user is authenticated and the app is done loading, redirect

      navigate("/home"); // <-- your destination page
    }
  }, [isAuthenticated, isLoading, navigate]);

  return (
    <>
      <div className="full-width" id="navBar">
        <img
          src="src/assets/EnviroActions.png"
          alt="EnviroAction Logo"
          id="logo"
        ></img>
        <AuthButtons />
      </div>
      <div className="content">
        <h1>Welcome to EnviroAction! Report green!</h1>
        <h3 id="description">
          We help you create a personalized plan to support the environment in
          your own way. We show you the best places to buy things like trees or
          solar panels, and we help you build a financial plan to reach your
          goals.
        </h3>
      </div>
    </>
  );
}
export default LandingPage;
