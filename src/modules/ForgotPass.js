import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Background from '../assets/Background.png';
import { Box, Typography, TextField, Button } from '@mui/material';
import Prompt from '../components/prompt';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../utils/firebase';

export default function ForgotPass() {
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const [email, setEmail] = useState('');
  const Navigate = useNavigate();

  const HandlePasswordReset = async () => {
    if (!email) {
      setAlert({
        open: true,
        message: 'Please enter your email.',
        severity: 'warning',
      });
      return;
    }
    let fullEmail = email.includes('@') ? email : `${email}@gmail.com`;
    try {
      await sendPasswordResetEmail(auth, fullEmail);
      setAlert({
        open: true,
        message: 'Verification code has been sent.',
        severity: 'success',
      });
      setTimeout(() => {
        Navigate('/');
      }, 2000);
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        severity: 'error',
      });
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
      }}
    >
      <Prompt
        open={alert.open}
        message={alert.message}
        severity={alert.severity}
      />

      {/* Forgot Password Form */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: '#477AD8',
          borderRadius: '40px',
          padding: 6,
          maxWidth: 400,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h4"
          sx={{ color: 'white', fontWeight: 'bold', mb: 4 }}
        >
          Forgot Password
        </Typography>
        <TextField
          fullWidth
          variant="filled"
          onChange={(e) => setEmail(e.target.value)}
          label="Username"
          sx={{ mb: 3, backgroundColor: '#6484ED' }}
          InputLabelProps={{ style: { color: 'white' } }}
          InputProps={{ style: { color: 'white' } }}
        />

        <Button
          fullWidth
          variant="contained"
          onClick={HandlePasswordReset}
          sx={{
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: '#1E40AF',
            borderRadius: 5,
            py: 1.5,
            fontWeight: 'bold',
            color: 'white',
            zIndex: 1,
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '200%',
              height: '200%',
              background: `linear-gradient(
                120deg,
                rgba(6, 2, 112, 0.3) 25%,
                rgba(255, 255, 255, 0.1) 50%,
                rgba(6, 2, 112, 0.3) 75%
              )`,
              animation: 'flowingWater 2s linear infinite',
              zIndex: -1,
            },
            '@keyframes flowingWater': {
              from: { transform: 'translateX(-50%) translateY(-50%)' },
              to: { transform: 'translateX(0%) translateY(0%)' },
            },
            '&:hover': {
              color: 'white',
            },
          }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}
