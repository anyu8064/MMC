import React, { useState } from 'react';
import { AppBar, Avatar, Toolbar, Typography, Menu, MenuItem, IconButton } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Prompt from '../components/prompt';

export default function Header({ title }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const open = Boolean(anchorEl);
  const { logout } = useAuth();
  const Navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const close = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await logout();
    setAlert({
      open: true,
      message: 'Logout Successfully.',
      severity: 'success',
    });
    close();
    setTimeout(() => {
      Navigate('/');
    }, 1000);
  };

  const handleCloseAlert = () => {
    setAlert((prev) => ({ ...prev, open: false }));
  };

  return (
    <AppBar position="fixed" sx={{ minWidth: '10%', backgroundColor: '#00008b' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Prompt open={alert.open} message={alert.message} severity={alert.severity} onClose={handleCloseAlert} />
        
        {/* Title stays on the left */}
        <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
          {title}
        </Typography>

        {/* Avatar stays on the right */}
        <IconButton onClick={handleClick}>
          <Avatar
            sx={{
              cursor: 'pointer',
              '&:hover': {
                transform: 'scale(1.1)',  // Scale the avatar on hover
                transition: 'transform 0.3s ease',  // Smooth transition for the scale
              },
              width: { xs: 30, sm: 40 },
              height: { xs: 30, sm: 40 },
            }}
          />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={close}
          onClick={close}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
