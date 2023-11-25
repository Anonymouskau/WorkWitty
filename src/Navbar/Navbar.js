import React, { useState } from 'react';
import './Navbar.css'; // Import your CSS file for styling
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemText, Menu, MenuItem } from '@mui/material';

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  var navigate =useNavigate()
  return (
    <nav className="navbar">
      <div className="avatar1">
        <img src="https://camo.githubusercontent.com/a4c584bce1c41271485d28f92aaf9f581b3c88b68ca723b6edfd58b4ba988c2b/68747470733a2f2f63646e2e6472696262626c652e636f6d2f75736572732f313138373833362f73637265656e73686f74732f363533393432392f70726f6772616d65722e676966" alt="Avatar" />
      </div>
      <div className="logo"style={{fontSize:"200%"}}>WorkWitty</div>
      
      <br/><br/>
      <br/>
      <div className="avatar" >
        {/* <img src="avatar.png" alt="Avatar" />
        {isDropdownOpen && (
          <div className="dropdown-content">
            <Link href="#">{localStorage.getItem('email')}</Link>
            
            <Link to={'/'} href="#">Logout</Link>
          </div>
        )} */}

        
<IconButton onClick={handleMenuClick}>
        <Avatar alt="User Avatar" src="avatar.png" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleMenuClose}>{localStorage.getItem('email')}</MenuItem>
        
        <MenuItem onClick={()=>{handleMenuClose()
           localStorage.removeItem('email')
           localStorage.removeItem('isAuthenticated')
           localStorage.removeItem('projectname')
           navigate('/')
        }}>Logout</MenuItem>
      </Menu>
      </div>
      
    </nav>
  );
};

export default Navbar;
