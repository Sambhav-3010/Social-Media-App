import React, { useState, useEffect } from 'react';

const UserDetails = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch('/api/user')
            .then(response => response.json())
            .then(data => setUser(data))
            .catch(error => console.error('Error fetching user details:', error));
    }, []);

    if (!user) {
        return <div>Loading...</div>;
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
}

export default UserDetails;
