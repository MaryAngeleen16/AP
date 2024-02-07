import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Metadata from '../Layouts/Metadata';
import Loader from '../Layouts/Loader';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authenticate, getUser } from '../../utils/helpers';
import { ToastContainer } from 'react-toastify';

import '../Layouts/FH.css';
import '../Layouts/RLForms.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  let location = useLocation();
  const redirect = location.search ? new URLSearchParams(location.search).get('redirect') : '';
  const notify = (error) =>
    toast.error(error, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });

  const login = async (email, password) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post(`http://localhost:4001/api/login`, { email, password }, config);
      console.log(data);
      authenticate(data, () => navigate('/'));
      window.location.reload();
    } catch (error) {
      toast.error('Invalid user or password', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    login(email, password);
  };

  useEffect(() => {
    if (getUser() && redirect === 'shipping') {
      navigate(`/${redirect}`);
    }
  }, []);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          {/* <Metadata title={'Login'} /> */}
          <div className="container-login">
            <div className="content">
              <h2 class="logo"><span class="bx--bxl-firebase"> Youth Empowerment Hub</span></h2>

              <div class="text-sci">
                <h2>Welcome!<br /><span>To our Website.</span></h2>

                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum, velit eget fermentum consectetur, erat ex sodales sapien, vel rutrum odio dui at velit. Nulla facilisi. Integer consectetur lorem nec libero bibendum, sit amet dapibus turpis hendrerit.</p>

                <div className="social-icons">
                  <a href="#"><i className='bx bxl-linkedin'></i></a>
                  <a href="#"><i className='bx bxl-facebook'></i></a>
                  <a href="#"><i className='bx bxl-instagram'></i></a>
                  <a href="#"><i className='bx bxl-twitter'></i></a>
                </div>
              </div>
            </div>
            <div className="logreg-box"></div>
          </div>
          <ToastContainer />
        </Fragment>
      )}
    </Fragment>
  );
};

export default Login;