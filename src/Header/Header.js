import React, { useState } from 'react'
import { AppBar, Avatar, Toolbar, Typography, Menu, MenuItem, IconButton } from '@mui/material'
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Prompt from '../components/prompt';

export default function Header({title}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [alert, setAlert] = useState({
        open: false,
        message: '',
        severity: 'success',
    })
    const open = Boolean(anchorEl);
    const { logout } = useAuth();
    const Navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const close = () => {
        setAnchorEl(null);
    }

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
        setAlert(prev => ({ ...prev, open: false }));
      };

  return (
    <AppBar position='fixed' sx={{width: '80%', backgroundColor: '#00008b'}}>
        <Toolbar>
            <Prompt open={alert.open} message={alert.message} severity={alert.severity} onClose={handleCloseAlert} />
            <Typography variant='h6' noWrap sx={{flexGrow: 1, display: { sx: 'none', sm: 'block'} }}>{title}</Typography>
            <IconButton onClick={handleClick}>
                <Avatar sx={{cursor: 'pointer'}} />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={close} onClick={close} transformOrigin={{ horizontal: 'right', vertical: 'top'}} anchorOrigin={{ horizontal: 'right', vertical: 'bottom'}}>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </Toolbar>
    </AppBar>
  )
}
