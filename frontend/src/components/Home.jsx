import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllPosts from "./AllPosts";
import NewPost from "./NewPost";
import UserLogin from "./UserLogin";

const Home = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AllPosts />} />
        <Route path="/user" element={<UserLogin />} />
        <Route path="/post" element={<NewPost />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Home;
