import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@mui/material';
import { ref, set, remove } from 'firebase/database';
import { db } from '../utils/firebase';
import { useLocation } from 'react-router-dom';

const pathMap = {
  '/laptop-desktop': 'add-laptop-desktop',
  '/software': 'add-software',
  '/service-unit': 'add-service-unit',
  '/erx-tablets': 'add-erx-tablets',
  '/printers': 'add-printers',
  '/it-peripherals': 'add-it-peripherals',
  '/cabs': 'add-cabs',
  '/archive/laptop-desktop': 'archive/add-laptop-desktop',
  '/archive/software': 'archive/add-software',
  '/archive/service-unit': 'archive/add-service-unit',
  '/archive/erx-tablets': 'archive/add-erx-tablets',
  '/archive/printers': 'archive/add-printers',
  '/archive/it-peripherals': 'archive/add-it-peripherals',
  '/archive/cabs': 'archive/add-cabs',
};

export default function Restore({ open, onClose, data }) {
  const location = useLocation();
  const currentPath = location.pathname;
  const originalPath = data?.TableSource;
  const activePath = pathMap[originalPath];

  const handleRestore = async () => {
    try {
      console.log("currentPath:", currentPath);
      console.log("originalPath:", originalPath);
      console.log("activePath:", activePath);
      console.log("data.id:", data?.id);

      if (!data?.id || !activePath ) {
        console.error("Missing required info for restore");
        return;
      }

      // Move to active path
      await set(ref(db, `${originalPath}/${data.id}`), data);
      // Delete from archive
      await remove(ref(db, `${currentPath}/${data.id}`));
      onClose();
    } catch (error) {
      console.log('Error restoring item:', error);
    }
  };


  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Restore</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to restore <strong>{data?.ComputerName || 'this item'}</strong> back to the active table?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleRestore} variant="contained" color="primary">Restore</Button>
      </DialogActions>
    </Dialog>
  );
}
