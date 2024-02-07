import React from 'react';
import Header from './Layouts/Header';
import Footer from './Layouts/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/User/Login';
import Register from './Components/User/Register';
import Profile from './Components/User/Profile';
import UpdateProfile from './Components/User/UpdateProfile';
import ForgotPassword from './Components/User/ForgotPassword';
import NewPassword from './Components/User/NewPassword';
import UpdatePassword from './Components/User/UpdatePassword';
// import Dashboard from './Admin/Dashboard';
// import Home from './Components/Home';
import CreateCategory from './Components/Admin/CreateCategory';

import ProtectedRoute from './Components/Route/ProtectedRoute';

function App() {
  return (
    <div>
      <Router>
        <Header />

        <Routes>
          {/* <Route path="/" element={<Home />} exact="true" /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/me" element={<Profile />} />
          <Route path="/me/update" element={<UpdateProfile />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<NewPassword />} />
          <Route path="/password/update" element={<UpdatePassword />} />
          <Route path="/category/create" element={<CreateCategory />} />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute isAdmin={true}>
                {/* <Dashboard /> */}
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;