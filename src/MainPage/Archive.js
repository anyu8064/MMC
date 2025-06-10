import React from 'react'
import { Box } from '@mui/material'
import SideBar from '../SideNav/SideBar';
import Header from '../Header/Header';
import TableData from '../components/Table';

export default function Archive() {
  return (
    <Box sx={{display: 'flex', height: '100vh', width: '100%'}}>
      <SideBar />
      <Box sx={{flexGrow: 1, display: 'flex', flexDirection: 'column'}}>
        <Header title='Archive' />
        <Box sx={{flexGrow: 1, p: 2, mt: 16, width: '1160px'}}>
            <TableData basePath="archive/add-laptop-desktop" />
        </Box>
      </Box>
    </Box>
  )
}
