import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MDBDataTable } from 'mdbreact';
import 'mdbreact/dist/css/mdb.css';

const CategoryDataTable = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:4001/api/categories')
      .then((res) => {
        setCategories(res.data.categories);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleDelete = (categoryId) => {
    axios
      .delete(`http://localhost:4001/api/categories/${categoryId}`)
      .then(() => {
        setCategories(categories.filter((category) => category._id !== categoryId));
        toast.success('Category deleted successfully');
      })
      .catch((err) => {
        console.error(err);
        toast.error('Failed to delete category');
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
          label: 'Actions',
          field: 'actions',
          sort: 'asc',
        },
      ],
      rows: [],
    };

    categories.forEach((category) => {
      data.rows.push({
        _id: category._id,
        name: category.name,
        description: category.description,
        actions: (
          <div>
            <Link to={`/category/update/${category._id}`} className="btn btn-primary">
              Edit
            </Link>
            <button
              className="btn btn-danger"
              style={{maxWidth: "100px", marginTop: "5px"}}              
              onClick={() => handleDelete(category._id)}
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
    <div className="container mt-6">
      <div className="row justify-content-center"> {/* Center the content horizontally */}
        <div className="col-md-8"> {/* Adjust the column width as per your requirement */}
          <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 style={{ fontWeight: "bold", padding: "10px" }}>List of Categories</h2>
            <Link to="/category/create" className="btn btn-primary"
            style={{ fontWeight: "bold", padding: "10px" }}>
              Create Category
            </Link>
          </div>
          <div className="text-center"> {/* Center the table */}
            <MDBDataTable
              data={setDataTable()}
              bordered
              striped
              hover
            />
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default CategoryDataTable;
