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
    <Box sx={{ display: 'flex', mt: 7 }}>
      <Box
        sx={{
          top: 0,
          left: 0,
          height: '100vh',
          width: 280,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#ffffff',
          border: '1px solid rgb(216, 217, 221)',
          padding: 1.5,
          boxSizing: 'border-box',
        }}
      >
        {/* Logo */}
        <Box sx={{ mb: 2, textAlign: 'center' }}>
          <img
            src={Logo}
            alt="Logo"
            style={{
              width: '100%',
              maxWidth: 270,
              height: 'auto',
              objectFit: 'contain',
            }}
          />
        </Box>

        {/* Navigation List */}
        <Box sx={{ flex: 1, overflowY: 'auto' }}>
          <List>
            <SidebarItem href="/dashboard" icon={<DashboardOutlinedIcon />} label="Dashboard" />
            <SidebarItem href="/laptop-desktop" icon={<DevicesOtherIcon />} label="Laptop & Desktops" />
            <SidebarItem href="/it-peripherals" icon={<InventoryIcon />} label="IT Peripherals" />
            <SidebarItem href="/software" icon={<TerminalIcon />} label="Software" />
            <SidebarItem href="/service-unit" icon={<ComputerIcon />} label="Service Unit" />
            <SidebarItem href="/erx-tablets" icon={<TabletAndroidIcon />} label="eRx Tablets" />
            <SidebarItem href="/printers" icon={<PrintIcon />} label="Printers (Vendor's Owned)" />
            <SidebarItem href="/cabs" icon={<WarehouseOutlinedIcon />} label="CABs" />
            <SidebarItem href="/accountability" icon={<TextSnippetIcon />} label="Accountability" />
            <SidebarItem href="/archive" icon={<TextSnippetIcon />} label="Archive" />
          </List>
        </Box>
      </Box>
    </Box>
  );
}

// Reusable Sidebar Item component
function SidebarItem({ href, icon, label }) {
  return (
    <ListItem sx={{ mb: 5 }} disablePadding>
      <ListItemButton href={href}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={label} sx={{ color: 'black' }} />
      </ListItemButton>
    </ListItem>
  );
}
