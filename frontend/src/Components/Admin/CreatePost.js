import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreatePost = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: '',
    description: '',
    images: [],
  });
  const [categories, setCategories] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:4001/api/categories');
      setCategories(response.data.categories);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === 'images') {
      const files = Array.from(e.target.files);
      setImagesPreview(files.map(file => URL.createObjectURL(file)));
      setPost({ ...post, images: files });
    } else {
      setPost({ ...post, [e.target.name]: e.target.value });
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    let isValid = true;

    if (!post.title) {
      validationErrors.title = 'Please enter a title.';
      isValid = false;
    }

    if (!post.description) {
      validationErrors.description = 'Please enter a description.';
      isValid = false;
    }

    if (post.images.length === 0) {
      validationErrors.images = 'Please select at least one image.';
      isValid = false;
    }

    if (!isValid) {
      setErrors(validationErrors);
      toast.error('Please fill out all fields');
      return;
    }

    const formData = new FormData();
    formData.append('title', post.title);
    formData.append('description', post.description);
    post.images.forEach(image => {
      formData.append('images', image);
    });

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      await axios.post('http://localhost:4001/api/posts/new', formData, config);
      toast.success('Post created successfully');
      navigate('/post/list');
      setPost({
        title: '',
        description: '',
        images: [],
      });
      setImagesPreview([]);
    } catch (error) {
      console.error('Failed to create post:', error);
      toast.error('Failed to create post');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-3">
          {/* <Sidebar /> */}
        </div>
        <div className="col-md-9 text-crud" style={{ paddingBottom: '50px' }}>
          <h2 className='title-crud'>Create Post</h2>
          <form onSubmit={submitForm}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                required
                value={post.title}
                onChange={handleChange}
              />
              {errors.title && <div className="text-danger">{errors.title}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={post.description}
                onChange={handleChange}
              ></textarea>
              {errors.description && <div className="text-danger">{errors.description}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Image
              </label>
              <input
                type="file"
                className="form-control"
                id="image"
                name="images"
                accept="image/*"
                required
                onChange={handleChange}
                multiple
              />
              {errors.images && <div className="text-danger">{errors.images}</div>}
              <div>
                {imagesPreview.map((img, index) => (
                  <img key={index} src={img} alt={`Image ${index}`} className="mt-3 mr-2" width="55" height="52" />
                ))}
              </div>
            </div>
            <button type="submit" className="btn btn-crud">
              Create Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
