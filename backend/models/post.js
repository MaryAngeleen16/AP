const mongoose = require('mongoose');
const cloudinary = require('cloudinary');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
});

// Middleware to handle image upload before saving post
postSchema.pre('save', async function (next) {
  const images = this.images.map(async (image) => {
    try {
      const result = await cloudinary.v2.uploader.upload(image.url, {
        folder: 'posts',
      });
      return {
        public_id: result.public_id,
        url: result.secure_url,
      };
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error('Error uploading image');
    }
  });
  this.images = await Promise.all(images);
  next();
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
