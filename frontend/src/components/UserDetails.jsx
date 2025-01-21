import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const UserDetails = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/user/login")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <h1 className="text-2xl font-bold mb-4">No User Found</h1>
        <p className="mb-4">Please sign up or log in.</p>
        <Link to="/register" className="text-blue-500 underline mb-2">
          Register
        </Link>
        <Link to="/login" className="text-blue-500 underline">
          Login
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1>User Details</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Username: {user.username}</p>
      {/* Add more user details as needed */}
    </div>
  );
};

export default UserDetails;
