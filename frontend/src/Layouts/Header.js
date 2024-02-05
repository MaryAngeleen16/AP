// Header.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './FH.css';
const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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

        <Typography variant="h6" component="div" 
        sx={{ flexGrow: 1 }}
        className= "text-ye"
        style={{textAlign: 'left'}}>
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
        
        {/* <Button color="inherit">Menu Item 3</Button> */}
        <IconButton
          size="large"
          edge="end"
          color="inherit"
          aria-label="profile"
        >
          <AccountCircleIcon/>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;