import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Logo from '../assets/Logo.png';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import InventoryIcon from '@mui/icons-material/Inventory';
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined';
import TerminalIcon from '@mui/icons-material/Terminal';
import ComputerIcon from '@mui/icons-material/Computer';
import TabletAndroidIcon from '@mui/icons-material/TabletAndroid';
import PrintIcon from '@mui/icons-material/Print';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';

export default function SideBar() {
  return (
    <Box sx={{display: 'flex'}}>
        <Box sx={{position: 'fixed', flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#fffff', padding: 1.5, border: '1px solid rgb(216, 217, 221)', width: 280, maxHeight: 730}}>
            <img src={Logo} alt="Logo" style={{ width: 270, height: 'auto', objectFit: 'contain', marginBottom: 10 }} />
            <Box sx={{flex: 1, overflowY: 'auto'}}>
                <List>
                    {/*Dashboard */}
                    <ListItem sx={{marginBottom: 2}}>
                        <ListItemButton href='/dashboard'>
                            <ListItemIcon>
                                <DashboardOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" sx={{color: 'black'}} />
                        </ListItemButton>
                    </ListItem>
                    {/*Laptop & Desktops */}
                    <ListItem sx={{marginBottom: 2}}>
                        <ListItemButton href='/laptop-desktop'>
                            <ListItemIcon>
                                <DevicesOtherIcon />
                            </ListItemIcon>
                            <ListItemText primary="Laptop & Desktops" sx={{color: 'black'}} />
                        </ListItemButton>
                    </ListItem>
                    {/*IT Peripherals */}
                    <ListItem sx={{marginBottom: 2}}>
                        <ListItemButton href='/it-peripherals'>
                            <ListItemIcon>
                                <InventoryIcon />
                            </ListItemIcon>
                            <ListItemText primary="IT Peripherals" sx={{color: 'black'}} />
                        </ListItemButton>
                    </ListItem>
                    {/*Software */}
                    <ListItem sx={{marginBottom: 2}}>
                        <ListItemButton href='/software'>
                            <ListItemIcon>
                                <TerminalIcon />
                            </ListItemIcon>
                            <ListItemText primary="Software" sx={{color: 'black'}} />
                        </ListItemButton>
                    </ListItem>
                    {/*Service Unit */}
                    <ListItem sx={{marginBottom: 2}}>
                        <ListItemButton href='/service-unit'>
                            <ListItemIcon>
                                <ComputerIcon />
                            </ListItemIcon>
                            <ListItemText primary="Service Unit" sx={{color: 'black'}} />
                        </ListItemButton>
                    </ListItem>
                    {/*eRx Tablets */}
                    <ListItem sx={{marginBottom: 2}}>
                        <ListItemButton href='/erx-tablets'>
                            <ListItemIcon>
                                <TabletAndroidIcon />
                            </ListItemIcon>
                            <ListItemText primary="eRx Tablets" sx={{color: 'black'}} />
                        </ListItemButton>
                    </ListItem>
                    {/*Printers (Vendor's Owned) */}
                    <ListItem sx={{marginBottom: 2}}>
                        <ListItemButton href='/printers'>
                            <ListItemIcon>
                                <PrintIcon />
                            </ListItemIcon>
                            <ListItemText primary="Printers (Vendor's Owned)" sx={{color: 'black'}} />
                        </ListItemButton>
                    </ListItem>
                    {/*CABs */}
                    <ListItem sx={{marginBottom: 2}}>
                        <ListItemButton href='/cabs'>
                            <ListItemIcon>
                                <WarehouseOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="CABs" sx={{color: 'black'}} />
                        </ListItemButton>
                    </ListItem>
                    {/*Accountability */}
                    <ListItem sx={{marginBottom: 2}}>
                        <ListItemButton href='/accountability'>
                            <ListItemIcon>
                                <TextSnippetIcon />
                            </ListItemIcon>
                            <ListItemText primary="Accountability" sx={{color: 'black'}} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Box>
    </Box>
  )
  
}
