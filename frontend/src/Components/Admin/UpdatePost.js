import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdatePost = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [post, setPost] = useState({
    title: '',
    description: '',
    category: '',
    image: null,
  });

  useEffect(() => {
    axios
      .get(`http://localhost:4001/api/posts/${id}`)
      .then((res) => {
        const { title, description, category, image } = res.data;
        setPost({ title, description, category, image });
      })
      .catch((err) => {
        console.error(err);
        toast.error('Failed to fetch post data');
      });
  }, [id]);

  const onChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setPost({ ...post, image: e.target.files[0] });
  };

  const { title, description, category, image } = post;

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('image', image);

    try {
      await axios.put(`http://localhost:4001/api/posts/${id}`, formData);
      toast.success('Post updated successfully');
      navigate('/post/list');
    } catch (error) {
      console.error(error);
      toast.error('Failed to update post');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-9">
          <h2>Update Post</h2>
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
                value={title}
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={description}
                onChange={onChange}
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <input
                type="text"
                className="form-control"
                id="category"
                name="category"
                value={category}
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Image
              </label>
              <input
                type="file"
                className="form-control"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Update Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePost;
