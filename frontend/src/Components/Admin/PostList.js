import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { getToken } from '../../utils/helpers';

const PostDataTable = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsResponse, categoriesResponse] = await Promise.all([
          axios.get('http://localhost:4001/api/posts'),
          axios.get('http://localhost:4001/api/categories'),
        ]);

        setPosts(postsResponse.data.posts || []);
        setCategories(categoriesResponse.data.categories || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to fetch posts and categories');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const setDataTable = () => {
    const data = {
      columns: [
        {
          label: 'ID',
          field: '_id',
          sort: 'asc',
        },
        {
          label: 'Name',
          field: 'name',
          sort: 'asc',
        },
        {
          label: 'Description',
          field: 'description',
          sort: 'asc',
        },
        {
          label: 'Category',
          field: 'category',
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
        name: post.name,
        description: post.description,
        category: categories.find((category) => category._id === post.category)?.name || '',
        actions: (
          <div>
            <Link
              to={{
                pathname: `/post/update/${post._id}`,
                state: { post },
              }}
              className="btn btn-primary"
            >
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

  const handleDelete = (postId) => {
    axios
      .delete(`http://localhost:4001/api/admin/delete/post/${postId}`)
      .then(() => {
        setPosts(posts.filter((post) => post._id !== postId));
        toast.success('Post is deleted successfully');
      })
      .catch((err) => {
        console.error(err);
        toast.error('Failed to delete post');
      });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          <h2 className="title-crud">List of Posts</h2>
          <Link to="/post/create" className="btn btn-primary mb-3">
            Create Post
          </Link>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <MDBDataTable
              data={setDataTable()}
              className="px-3"
              bordered
              striped
              hover
            />
          )}
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default PostDataTable;
