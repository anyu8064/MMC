import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { ref, remove, set, get } from 'firebase/database';
import { db } from '../utils/firebase';

export default function Delete({ open, onClose, productId, firebasePath }) {
  const handleDelete = async () => {
    if (!firebasePath || !productId) return;

    try {
      const itemRef = ref(db, `${firebasePath}/${productId}`);
      const snapshot = await get(itemRef);

      if (snapshot.exists()) {
        const itemData = snapshot.val();

        const archivePath = `archive/${firebasePath}/${productId}`;

        await set(ref(db, archivePath), {
          ...itemData,
          Path: firebasePath
        });

        await remove(itemRef);
      }

      onClose();
    } catch (error) {
      console.error("Error archiving/deleting item:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>Are you sure you want to archive this item?</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="primary" onClick={handleDelete}>Archive</Button>
      </DialogActions>
    </Dialog>
  );
}
