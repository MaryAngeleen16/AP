const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');
const Post = require('../models/post');
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost
} = require('../controllers/postController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

// Create a new post
router.post('/posts/new', isAuthenticatedUser, authorizeRoles("admin"), upload.array('images'), createPost);

// Get all posts
router.get('/posts', getAllPosts);

// Get a post by ID
router.get('/posts/:id', getPostById);

// Update a post by ID
router.put('/posts/:id', isAuthenticatedUser, authorizeRoles("admin"), upload.array('images'), updatePost);

// Delete a post by ID
router.delete('/posts/:id', isAuthenticatedUser, authorizeRoles("admin"), deletePost);

module.exports = router;
