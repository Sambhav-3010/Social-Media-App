import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-[35vw] h-[8vh] bg-[#123524] mx-auto text-center shadow-[8px_11px_10px_rgba(0,0,0,0.1)] flex justify-evenly items-center gap-[20px] md:w-[60vw] mb-5">
      <Link to="/" className="text-white hover:underline">Home</Link>
      <Link to="/about" className="text-white hover:underline">New Post</Link>
      <Link to="http://localhost:3000/api/user/login" className="text-white hover:underline">User Details</Link>
    </nav>
  );
};

export default Navbar;
