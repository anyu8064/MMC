import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Backdrop } from '@mui/material';

export default function Loading({open}) {

  return (
    <Box>
      <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
}
