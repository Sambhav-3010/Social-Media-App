import React from "react";
import { StrictMode } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";

const App = () => {
  return (
    <StrictMode>
      <Navbar />
      <Home />
    </StrictMode>
  );
};

export default App;
