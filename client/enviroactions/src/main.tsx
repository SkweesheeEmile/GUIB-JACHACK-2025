import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import Auth0ProviderWithNavigate from "./auth0-provider-with-navigate.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Auth0ProviderWithNavigate>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Auth0ProviderWithNavigate>
  </StrictMode>
);
