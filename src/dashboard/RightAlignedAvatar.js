


import './RightAlignned.css'
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { Avatar, Menu, MenuItem, IconButton } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';

const RightAlignedAvatar = () => {
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
      {"ProjectName : "+localStorage.getItem('projectname')}
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
        <MenuItem onClick={()=>{
            navigate('/projects')
        }}>My Projects</MenuItem>
       
        <MenuItem onClick={()=>{handleMenuClose()
           localStorage.removeItem('email')
           localStorage.removeItem('isAuthenticated')
           localStorage.removeItem('projectname')
           navigate('/')
        }}>Logout</MenuItem>
      </Menu>
      </div>
  );
};

export default RightAlignedAvatar;
