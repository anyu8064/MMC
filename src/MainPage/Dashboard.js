import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import SideBar from '../SideNav/SideBar';
import { useAuth } from '../context/AuthContext';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import InventoryIcon from '@mui/icons-material/Inventory';
import TerminalIcon from '@mui/icons-material/Terminal';
import ComputerIcon from '@mui/icons-material/Computer';
import TabletAndroidIcon from '@mui/icons-material/TabletAndroid';
import PrintIcon from '@mui/icons-material/Print';
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined';
import Header from '../Header/Header';
import { db } from '../utils/firebase';
import { ref, onValue } from 'firebase/database';
import CircularProgress from '@mui/material/CircularProgress';


const pathMap = {
  '/laptop-desktop': 'add-laptop-desktop',
  '/software': 'add-software',
  '/service-unit': 'add-service-unit',
  '/erx-tablets': 'add-erx-tablets',
  '/printers': 'add-printers',
  '/it-peripherals': 'add-it-peripherals',
  '/cabs': 'add-cabs',
};

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCounts = () => {
      const newCounts = {};
      const unsubscribes = [];
  
      Object.values(pathMap).forEach((path) => {
        const dataRef = ref(db, path);
        const unsubscribe = onValue(dataRef, (snapshot) => {
          newCounts[path] = snapshot.exists() ? snapshot.size : 0;
          // Only update state once all values are loaded
          if (Object.keys(newCounts).length === Object.values(pathMap).length) {
            setCounts({ ...newCounts });
            setLoading(false);
          }
        });
        unsubscribes.push(unsubscribe);
      });
  
      return () => unsubscribes.forEach(unsub => unsub());
    };
  
    return fetchCounts();
  }, []);  

  console.log(currentUser);

  const cardConfig = {
    'add-laptop-desktop': { label: 'Laptop & Desktop Count', icon: <DevicesOtherIcon /> },
    'add-it-peripherals': { label: 'IT Peripherals Count', icon: <InventoryIcon /> },
    'add-software': { label: 'Software Count', icon: <TerminalIcon /> },
    'add-service-unit': { label: 'Service Unit Count', icon: <ComputerIcon /> },
    'add-erx-tablets': { label: 'eRx Tablet Count', icon: <TabletAndroidIcon /> },
    'add-printers': { label: 'Printer Count', icon: <PrintIcon /> },
    'add-cabs': { label: 'CABs Count', icon: <WarehouseOutlinedIcon /> },
  };
  
  
  return (
    <Box sx={{display: 'flex'}}>
      <Box sx={{display: 'flex', minHeight: '100vh'}}>
        <SideBar />
      </Box>
      <Box sx={{flexGrow: 1, display: 'flex', flexDirection: 'column', ml: '300px', mt: '90px'}}>
        <Header title='Dashboard' />
        <Box sx={{p: 2, flexGrow: 1, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2, minHeight: 0}}>
        {Object.entries(cardConfig).map(([path, { label, icon }]) => (
          <Paper key={path} elevation={3} sx={{ backgroundColor: '#689BE2', height: 250, width: 250, padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', borderRadius: 5 }}>
            {React.cloneElement(icon, { sx: { width: 180, height: 180, mb: 1 } })}
            {loading ? (
              <CircularProgress sx={{ color: 'white', mb: 1 }} />
            ) : (
              <Typography variant='h6' color='white'>{counts[path]}</Typography>
            )}
            <Typography variant='h6' color='white'>{label}</Typography>
          </Paper>
        ))}
          <Paper elevation={3} sx={{ backgroundColor: '#689BE2', height: 250, width: 250, padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', borderRadius: 5 }}>
            <WarehouseOutlinedIcon sx={{ width: 180, height: 180, mb: 1 }} />
            {loading ? (
              <CircularProgress sx={{ color: 'white', mb: 1 }} />
            ) : (
              <Typography variant='h6' color='white'>
                {Object.values(counts).reduce((acc, val) => acc + val, 0)}
              </Typography>
            )}
            <Typography variant='h6' color='white'>OverAll Count</Typography>
          </Paper>
        </Box>
      </Box>
    </Box>
  )
}
