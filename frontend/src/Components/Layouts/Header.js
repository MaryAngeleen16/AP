import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { getUser, logout } from '../../utils/helpers';
import './FH.css';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const user = getUser();
  const userAuthenticated = !!user;
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Assuming `settings` contains an array of user settings
  const settings = ['Profile', 'Settings'];

  return (
    <AppBar position="static" className="bg">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
          className="text-ye"
          style={{ textAlign: 'left' }}
          href="/"
        >
          Youth Empowerment
        </Typography>

        <Button
          color="inherit"
          onClick={handleClick}
          aria-controls="tutorials-menu"
          aria-haspopup="true"
        >
          Pregnancy
        </Button>
        <Menu
          id="tutorials-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {/* Add your dropdown menu items related to Tutorials here */}
          <MenuItem onClick={handleClose}>Tutorial 1</MenuItem>
          <MenuItem onClick={handleClose}>Tutorial 2</MenuItem>
          <MenuItem onClick={handleClose}>Tutorial 3</MenuItem>
        </Menu>
        <Button color="inherit">Sexual Education</Button>

        <IconButton
          size="large"
          edge="end"
          color="inherit"
          aria-label="profile"
          onClick={handleOpenUserMenu}
        >
          <AccountCircleIcon />
        </IconButton>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((setting, index) => (
            <MenuItem key={index} onClick={handleCloseUserMenu}>
              <Link to="/me" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography textAlign="center">{setting}</Typography>
              </Link>
            </MenuItem>
          ))}

          {user && user.role === 'admin' && (
            <MenuItem>
              <Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography textAlign="center">Dashboard</Typography>
              </Link>
            </MenuItem>
          )}

          <MenuItem onClick={handleLogout}>
            <Typography textAlign="center" color="red">Logout</Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
