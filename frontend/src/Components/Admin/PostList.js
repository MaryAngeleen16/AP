import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MDBDataTable } from 'mdbreact';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:4001/api/posts')
      .then((res) => {
        setPosts(res.data.posts);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleDelete = (postId) => {
    axios
      .delete(`http://localhost:4001/api/posts/${postId}`)
      .then(() => {
        setPosts(posts.filter((post) => post._id !== postId));
        toast.success('Post deleted successfully');
      })
      .catch((err) => {
        console.error(err);
        toast.error('Failed to delete post');
      });
  };

  const setDataTable = () => {
    const data = {
      columns: [
        {
          label: 'ID',
          field: '_id',
          sort: 'asc',
        },
        {
          label: 'Title',
          field: 'title',
          sort: 'asc',
        },
        {
          label: 'Description',
          field: 'description',
          sort: 'asc',
        },
        {
          label: 'Actions',
          field: 'actions',
          sort: 'asc',
        },
      ],
      rows: [],
    };

    posts.forEach((post) => {
      data.rows.push({
        _id: post._id,
        title: post.title,
        description: post.description,
        actions: (
          <div>
            <Link to={`/post/update/${post._id}`} className="btn btn-primary">
              Edit
            </Link>
            <button
              className="btn btn-danger ml-2"
              onClick={() => handleDelete(post._id)}
            >
              Delete
            </button>
          </div>
        ),
      });
    });

    return data;
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-9">
          <h2>List of Posts</h2>
          <Link to="/post/create" className="btn btn-primary mb-3">
            Create Post
          </Link>
          <MDBDataTable
            data={setDataTable()}
            className="px-3"
            bordered
            striped
            hover
          />
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default PostList;
