import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AllPosts from "./components/AllPosts";
import NewPost from "./components/NewPost";
import UserDetails from "./components/UserDetails";
import Register from "./components/Register";
import Login from "./components/Login";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<AllPosts />} />
        <Route path="/about" element={<NewPost />} />
        <Route path="/contact" element={<UserDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
