import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, Link } from '@mui/material';
import Logo from '../assets/Logo.png';
import Background from '../assets/Background.png';
import { useAuth } from '../context/AuthContext';
import Prompt from '../components/prompt';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, currentUser } = useAuth();
  const Navigate = useNavigate();
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'success',
  })

  const HandleLogin = async(e) => {
    e.preventDefault();
    if (!email || !password) {
      setAlert({
        open: true,
        message: 'Please filled the required fields.',
        severity: 'warning',
      })
      return;
    }
    let fullEmail = email.includes('@') ? email : `${email}@gmail.com`;
    try {
      await login(fullEmail, password);
      console.log("User logged in Successfully.")
    } catch (error) {
      setAlert({
        open: true,
        message: 'Login Failed. Wrong password or username',
        severity: 'error',
      })
    }
  }

  const handleCloseAlert = () => {
    setAlert(prev => ({ ...prev, open: false }));
  };

  useEffect(() => {
    if (currentUser) {
      setAlert({
        open: true,
        message: 'Login Successfully.',
        severity: 'success'
      });
      setTimeout(() => {
        Navigate('/dashboard');
      }, 1000)
    }
  }, [currentUser, Navigate]);

  return (
    <Box sx={{ display: 'flex', height: '100vh', backgroundImage: `url(${Background})`, backgroundSize: 'cover', backgroundPosition: 'center', justifyContent: 'center', alignItems: 'center', padding: 4 }}>
      <Prompt open={alert.open} message={alert.message} severity={alert.severity} onClose={handleCloseAlert} />
      {/* Logo */}
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <img src={Logo} alt="Logo" style={{ width: 550, height: 'auto' }} />
        <Typography variant='h4' sx={{ color: '#2053B7', fontWeight: 'bold', textShadow: '1px 1px 0 white, -1px 1px 0 white, 1px -1px 0 white, -1px -1px 0 white'}}>Inventory System</Typography>
      </Box>

      {/* Login Form */}
      <Box sx={{ flex: 1, backgroundColor: '#477AD8', borderRadius: '40px', padding: 6, maxWidth: 400, height: '500px', marginRight: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: 3 }}>
        <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold', mb: 4 }}>
          Login
        </Typography>
        <TextField fullWidth variant="filled" onChange={(e) => setEmail(e.target.value)} label="Username" sx={{ mb: 3, backgroundColor: '#6484ED' }} InputLabelProps={{ style: { color: 'white' } }} InputProps={{ style: { color: 'white' } }} />
        <TextField fullWidth variant="filled" onChange={(e) => setPassword(e.target.value)} type="password" label="Password" sx={{ mb: 2, backgroundColor: '#6484ED' }} InputLabelProps={{ style: { color: 'white' } }} InputProps={{ style: { color: 'white' } }} />
        <Link href="/forgot-password" underline="hover" sx={{ alignSelf: 'flex-start', color: 'white', mb: 4 }}>
          Forgot Password
        </Link>
        <Button variant="contained" onClick={HandleLogin} sx={{ backgroundColor: '#1E40AF', borderRadius: 5, paddingX: 5, paddingY: 1.5, fontWeight: 'bold' }}>
          Login
        </Button>
      </Box>
    </Box>
  );
}