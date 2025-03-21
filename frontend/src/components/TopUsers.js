import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TopUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/top-users`)
            .then(response => setUsers(response.data))
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    return (
        <div className="container">
            <h2>Top Users</h2>
            <ul className="list-group">
                {users.map((user, index) => (
                    <li key={index} className="list-group-item">
                        {user._id} - {user.postCount} Posts
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TopUsers;
