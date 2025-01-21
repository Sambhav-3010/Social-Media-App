import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AllPosts from "./AllPosts";
import NewPost from "./NewPost";
import UserDetails from "./UserDetails";
const Navbar = () => {
  return (
    <BrowserRouter>
      <nav className="w-[35vw] h-[8vh] bg-[#123524] mx-auto text-center shadow-[8px_11px_10px_rgba(0,0,0,0.1)] flex justify-evenly items-center gap-[20px] md:w-[60vw] mb-10">
        <Link to="/" className="text-white hover:underline">Home</Link>
        <Link to="/about" className="text-white hover:underline">New Post</Link>
        <Link to="/contact" className="text-white hover:underline">User Details</Link>
      </nav>
      <Routes>
        <Route path="/" element={<AllPosts />} />
        <Route path="/about" element={<NewPost />} />
        <Route path="/contact" element={<UserDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Navbar;
