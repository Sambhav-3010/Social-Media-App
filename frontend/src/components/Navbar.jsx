import React from "react";
import { BrowserRouter, Link } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
  return (
    <nav>
      <BrowserRouter>
        <Link to="/">Home</Link>
        <Link to="/post">New Post</Link>
        <Link to="/user">My Profile</Link>
      </BrowserRouter>
    </nav>
  );
};

export default Navbar;