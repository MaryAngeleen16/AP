import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Register = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    avatar: null,
  });

  const { name, email, password, avatar } = user;

  const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  let navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
    if (error) {
      console.log(error);
      setError('');
    }
  }, [error, isAuthenticated, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('avatar', avatar);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post(`http://localhost:4001/api/register`, formData, config);
      console.log(data.user);
      setIsAuthenticated(true);
      setLoading(false);
      setUser(data.user);
      navigate('/');
    } catch (error) {
      setIsAuthenticated(false);
      setLoading(false);
      setUser(null);
      setError(error.response.data.message);
      console.log(error.response.data.message);
    }
  };

  const onChange = (e) => {
    if (e.target.name === 'avatar') {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setUser({ ...user, avatar: e.target.files[0] });
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  return (
    <Fragment>
      <div className="container-register">
        <div className="content">
          <h2 className="logo"><span className="healthicons--pregnant-outline"> Youth Hub</span></h2>
          <div className="text-sci">
            <h2>Welcome!<br /><span>To our Website.</span></h2>
            <p>Lorem ipsum dolor sit amhiet, consectetur adipiscing elit.<br></br> Sed vestibulum, velit eget fermentum consectetur, erat ex sodales sapien, vel rutrum odio dui at velit.<br></br> Nulla facilisi. Integer consectetur lorem nec libero bibendum, sit amet dapibus turpis hendrerit.
            </p>
          </div>
        </div>
        <div className="logreg-box">
          <div className="form-box">
            <form onSubmit={submitHandler}>
              <h2>Register</h2>

              <div className="input-box">
                <span className="icon"><box-icon type='solid' name='user'></box-icon></span>
                <input type="text" name="name" value={name} onChange={onChange} required />
                <label>Name</label>
              </div>

              <div className="input-box">
                <span className="icon"><box-icon type='solid' name='envelope'></box-icon></span>
                <input type="email" name="email" value={email} onChange={onChange} required />
                <label>Email</label>
              </div>

              <div className="input-box">
                <span className="icon"><box-icon type='solid' name='lock-alt'></box-icon></span>
                <input type="password" name="password" value={password} onChange={onChange} required />
                <label>Password</label>
              </div>

              <div className="input-box">
                <span className="icon"><box-icon type='solid' name='image-alt'></box-icon></span>
                <input type="file" name="avatar" onChange={onChange} required />
                <label>Avatar</label>
              </div>

              <button type="submit" className="btn">Register</button>

              <div className="login-register">
                <p>Already have an account? <a href="/login" className="register-link">Login</a></p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </Fragment>
  );
};

export default Register;
