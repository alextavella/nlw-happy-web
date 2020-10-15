import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Routes from "./routes";
import GlobalStyle from "./styles/global";

import "leaflet/dist/leaflet.css";

function App() {
  return (
    <Router>
      <Routes />
      <GlobalStyle />
    </Router>
  );
}

export default App;
