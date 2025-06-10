import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography, Button } from '@mui/material';
import Prompt from '../components/prompt';
import Background from '../assets/Background.png';
import { confirmPasswordReset } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useSearchParams, useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const oobCode = searchParams.get('oobCode');

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      return setAlert({ open: true, message: 'Please fill in all fields.', severity: 'warning' });
    }

    if (newPassword !== confirmPassword) {
      return setAlert({ open: true, message: 'Passwords do not match.', severity: 'error' });
    }

    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      setAlert({ open: true, message: 'Password reset successful. Redirecting to login...', severity: 'success' });
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      setAlert({ open: true, message: error.message, severity: 'error' });
    }
  };

  useEffect(() => {
    if (!oobCode) {
      setAlert({ open: true, message: 'Invalid or missing password reset code.', severity: 'error' });
    }
  }, [oobCode]);

  return (
    <Box sx={{ display: 'flex', height: '100vh', backgroundImage: `url(${Background})`, backgroundSize: 'cover', backgroundPosition: 'center', justifyContent: 'center', alignItems: 'center', padding: 4 }}>
      <Prompt open={alert.open} message={alert.message} severity={alert.severity} />

      <Box sx={{ flex: 1, backgroundColor: '#477AD8', borderRadius: '40px', padding: 6, maxWidth: 400, display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: 3 }}>
        <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold', mb: 4 }}>
          Reset Password
        </Typography>
        <TextField
          fullWidth
          variant="filled"
          label="New Password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          sx={{ mb: 3, backgroundColor: '#6484ED' }}
          InputLabelProps={{ style: { color: 'white' } }}
          InputProps={{ style: { color: 'white' } }}
        />
        <TextField
          fullWidth
          variant="filled"
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={{ mb: 3, backgroundColor: '#6484ED' }}
          InputLabelProps={{ style: { color: 'white' } }}
          InputProps={{ style: { color: 'white' } }}
        />
        <Button
          fullWidth
          variant="contained"
          onClick={handleResetPassword}
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
          Confirm
        </Button>
      </Box>
    </Box>
  );
}
