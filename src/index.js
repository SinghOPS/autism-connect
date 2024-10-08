import React from "react";
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";
import './index.css'

const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      redirectUri={window.location.origin}>
      <App />
    </Auth0Provider>
);
