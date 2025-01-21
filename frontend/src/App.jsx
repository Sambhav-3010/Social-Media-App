import React from "react";
import { StrictMode } from "react";
import Navbar from "./components/Navbar";
import AllPosts from "./components/AllPosts";

const App = () => {
  return (
    <StrictMode>
      <Navbar />
    </StrictMode>
  );
};

export default App;
