import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import AllPosts from "./components/AllPosts";
import NewPost from "./components/NewPost";
import UserDetails from "./components/UserDetails";
import GlassCard from "./components/ui/Glass";
import NotFound from "./components/NotFound";
import AuthPage from "./components/AuthPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: [<Navbar/>,<AllPosts />],
  },
  {
    path: "/newpost",
    element: <NewPost />,
  },
  {
    path: "/contact",
    element: <UserDetails />,
  },
  {
    path: '/auth',
    element: <AuthPage />,
  },
  {
    path: '*',
    element: <NotFound />,
  }
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
