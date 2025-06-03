import React, { useState } from 'react';
import {
  Box,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography
} from '@mui/material';
import { ref, remove } from 'firebase/database';
import { db } from '../utils/firebase';
import Prompt from '../components/prompt';

export default function Delete({ productId, firebasePath, open, onClose }) {
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleDelete = async () => {
    const productRef = ref(db, `${firebasePath}/${productId}`);
    await remove(productRef);

    setAlert({
      open: true,
      message: 'Product successfully deleted.',
      severity: 'success'
    });

    setTimeout(() => {
      setAlert({ open: false, message: '', severity: 'success' });
      onClose();
    }, 1000);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogContent sx={{ padding: 5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
            <Typography variant='h6' color='black'>
              Are you sure you want to delete this product?
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">No</Button>
          <Button onClick={handleDelete} color="error" variant="contained">Yes, Delete</Button>
        </DialogActions>
      </Dialog>

      <Prompt open={alert.open} message={alert.message} severity={alert.severity} onClose={() => setAlert({ ...alert, open: false })} />
    </>
  );
}
