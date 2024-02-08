const Post = require('../models/post');
const cloudinary = require('cloudinary');

// Function to handle errors
const handleErrors = (error, res) => {
  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  } else {
    console.error(error);
    return res.status(500).json({ error: 'Unable to perform operation' });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { title, description, images } = req.body;
    const post = new Post({ title, description, images });
    
    // Logic for image upload using cloudinary
    let imagesLinks = [];
    if (req.files.length > 0) {
      for (const image of req.files) {
        try {
          const result = await cloudinary.v2.uploader.upload(image.path, {
            folder: 'posts',
            width: 1000,
            crop: "auto",
          });
          imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url
          });
        } catch (error) {
          console.log(error);
        }
      }
    }

    post.images = imagesLinks;

    await post.save();
    res.status(201).json(post);
  } catch (error) {
    handleErrors(error, res);
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json({ posts });
  } catch (error) {
    handleErrors(error, res);
  }
};

exports.getPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    handleErrors(error, res);
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { title, description, images } = req.body;
    const post = await Post.findByIdAndUpdate(req.params.id, { title, description, images }, { new: true });
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    handleErrors(error, res);
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    handleErrors(error, res);
  }
};
