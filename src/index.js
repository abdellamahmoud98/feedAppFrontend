import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./appRoutes/AppRoutes";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

root.render(
  <Router>
    <AppRoutes />
  </Router>
);
