import React from 'react'
import { Box } from '@mui/material'
import SideBar from '../SideNav/SideBar';
import Header from '../Header/Header';
import Table from '../components/Table';

export default function Printers() {
  return (
    <Box sx={{display: 'flex', height: '100vh'}}>
    <Box sx={{display: 'flex', height: '100vh'}}>
      <SideBar />
    </Box>
    <Box sx={{flexGrow: 1, display: 'flex', flexDirection: 'column'}}>
      <Header title='Printers' />
        <Box sx={{flexGrow: 1, p: 2, mt: 10, width: '1160px'}}>
          <Table />
        </Box>
    </Box>
  </Box>
  )
}
