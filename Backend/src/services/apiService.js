const axios = require('axios');
require('dotenv').config();

const API_BASE_URL = process.env.API_BASE_URL;

const fetchUsers = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users`);
        return response.data;
    } catch (error) {
        throw new Error("Error fetching users");
    }
};

const fetchPosts = async (type) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/posts?type=${type}`);
        return response.data;
    } catch (error) {
        throw new Error("Error fetching posts");
    }
};

module.exports = { fetchUsers, fetchPosts };
