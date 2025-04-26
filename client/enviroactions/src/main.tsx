import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from '@auth0/auth0-react';

createRoot(document.getElementById("root")!).render(
        <BrowserRouter>
  <StrictMode>
    <Auth0Provider
      domain=""
      clientId=""
      authorizationParams={{ redirect_uri: window.location.origin }}
    >
      <App />
    </Auth0Provider>
  </StrictMode>
  </BrowserRouter>
);
