const express = require('express');
const { getTrendingPosts, getLatestPosts } = require('../controllers/postController');

const router = express.Router();

router.get('/trending', getTrendingPosts);
router.get('/latest', getLatestPosts);

module.exports = router;
