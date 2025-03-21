const { fetchPosts } = require('../services/apiService');

const getTrendingPosts = async (req, res) => {
    try {
        const posts = await fetchPosts('popular');
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch trending posts" });
    }
};

const getLatestPosts = async (req, res) => {
    try {
        const posts = await fetchPosts('latest');
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch latest posts" });
    }
};

module.exports = { getTrendingPosts, getLatestPosts };
