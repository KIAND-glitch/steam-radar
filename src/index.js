import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from "react-oidc-context";

const oidcConfig = {
  authority: "https://cognito-idp.ap-southeast-2.amazonaws.com/ap-southeast-2_Uxhrcakks",
  client_id: "42pg35gdbfjmc3vuqqf8n29t3t",
  redirect_uri: "http://localhost:3000/callback",
  response_type: "code",
  scope: "openid email phone",
  post_logout_redirect_uri: "http://localhost:3000/",

    // 🔐 Silent renew settings
    automaticSilentRenew: true,
    loadUserInfo: true,
  
    // ⬇️ Add this for silent renew
    silent_redirect_uri: "http://localhost:3000/silent-renew.html",
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider {...oidcConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
