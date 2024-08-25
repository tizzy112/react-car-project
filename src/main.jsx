import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import React from "react";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ProductProvider } from "./ContextAPI.jsx"; // Ensure this is correctly imported
import * as serviceWorker from "./ServiceWorker.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

// Create a root and render the app
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <ProductProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </ProductProvider>
);

// Unregister the service worker
serviceWorker.unregister();
