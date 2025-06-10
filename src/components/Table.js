import React, { useEffect, useState } from 'react'
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Button, Box, IconButton, Tooltip, CircularProgress, Menu, MenuItem, Select, FormControl, InputLabel } from '@mui/material'
import AddProductLD from '../Modals/AddProductLD';
import { db } from '../utils/firebase';
import { ref, onValue } from 'firebase/database';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RestoreIcon from '@mui/icons-material/Restore';
import ArchiveIcon from '@mui/icons-material/Archive';
import { useLocation } from 'react-router-dom';
import Edit from '../modules/Edit';
import Delete from '../modules/Delete';
import Search from './Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import Restore from '../modules/Restore';

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

export default function TableData({ basePath = null}) {
  const location = useLocation();
  const [open,setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productList, setProductList] = useState([]);
  const currentPath = location.pathname;
  const firebasePath =  basePath || pathMap[currentPath];
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');  
  const [anchorEl, setAnchorEl] = useState(null);
  const [openRestore, setOpenRestore] = useState(false);
  const [selectedRestoreData, setSelectedRestoreData] = useState(null);
  const openFilterMenu = Boolean(anchorEl);
  const isArchive = currentPath.includes('/archive');

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const handleRestore = (row) => {
    setSelectedRestoreData(row);
    setOpenRestore(true);
  };

  const sortableFields = [
    { value: 'ComputerName', label: 'Computer Name' },
    { value: 'DateOfEntry', label: 'Date of Entry' },
    { value: 'DateOfPurchase', label: 'Date of Purchase' },
    { value: 'WarrantyExpiration', label: 'Warranty Expiration' },
  ];      

  const OpenAddProductModal = () => {
    setOpen(true);
  }

  const CloseAddProductModal = () => {
    setOpen(false);
  }

  const openEditModal = (row) => {
    setSelectedRow(row);
    setEditOpen(true);
  };

  const closeEditModal = () => {
    setEditOpen(false);
    setSelectedRow(null);
  };

  const closeRestore = () => {
    setOpenRestore(false);
  }

  const handleDeleteClick = (productId) => {
    setSelectedProduct(productId);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setSelectedProduct(null);
  };

  const sortedList = React.useMemo(() => {
    let items = [...productList];

    if (sortField) {
      items.sort((a, b) => {
        const aVal = a[sortField];
        const bVal = b[sortField];

        if (typeof aVal === 'string' && typeof bVal === 'string') {
          return sortOrder === 'asc'
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal);
        } else {
          const aDate = new Date(aVal).toString() !== 'Invalid Date' ? new Date(aVal) : aVal;
          const bDate = new Date(bVal).toString() !== 'Invalid Date' ? new Date(bVal) : bVal;

          if (aDate < bDate) return sortOrder === 'asc' ? -1 : 1;
          if (aDate > bDate) return sortOrder === 'asc' ? 1 : -1;
          return 0;
        }
      });
    }

    return items;
  }, [productList, sortField, sortOrder]);

  useEffect(() => {
    if (!firebasePath) return;

    const productRef = ref(db, firebasePath);
    const unsubscribe = onValue(productRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedData = Object.entries(data).map(([id, value], index) => ({
          id,
          index: index + 1,
          ...value,
        }));
        setProductList(formattedData);
      } else {
        setProductList([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [firebasePath]);

  return (
    <Box sx={{ width: '100%'}}>
      <Box sx={{display: 'flex', justifyContent: 'flex-end', position: 'sticky'}}>
        {!isArchive && <Button variant='outlined' sx={{width: '150px', mb: 2, mr: -4}} onClick={OpenAddProductModal}>Add Product</Button>}
      </Box>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Tooltip title='Filter'>
        <IconButton
          sx={{ ml: 2, mt: -7, position: 'absolute', backgroundColor: openFilterMenu ? 'rgba(0, 0, 0, 0.08)' : 'transparent' }}
          onClick={handleFilterClick}
        >
          <FilterListIcon />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={openFilterMenu}
        onClose={handleFilterClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <MenuItem disableRipple>
          <FormControl fullWidth size="small">
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortField}
              label="Sort By"
              onChange={(e) => setSortField(e.target.value)}
            >
              {sortableFields.map((field) => (
                <MenuItem key={field.value} value={field.value}>
                  {field.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </MenuItem>
        <MenuItem disableRipple>
          <FormControl fullWidth size="small">
            <InputLabel>Order</InputLabel>
            <Select
              value={sortOrder}
              label="Order"
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </FormControl>
        </MenuItem>
      </Menu>
      <TableContainer sx={{p: 2, position: 'relative', maxHeight: 550}}> 
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Table sx={{ width: '6000px', border: '2px solid rgb(216, 217, 221)', '& .MuiTableCell-root': { border: '2px solid rgb(216, 217, 221)', textAlign: 'center' } }}>
            <TableHead>
              <TableRow>
                {isArchive && <TableCell>Source Table</TableCell>}
                <TableCell>Id</TableCell>
                <TableCell>Computer Name</TableCell>
                <TableCell>SI No.</TableCell>
                <TableCell>PO No.</TableCell>
                <TableCell>GR No.</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Vendor</TableCell>
                <TableCell>Date Entry</TableCell>
                <TableCell>Date of Purchase</TableCell>
                <TableCell>Warranty Expiration</TableCell>
                <TableCell>Equipment Type</TableCell>
                <TableCell>Model</TableCell>
                <TableCell>Brand</TableCell>
                <TableCell>Serial No.</TableCell>
                <TableCell>Asset Tag</TableCell>
                <TableCell>MAC Address</TableCell>
                <TableCell>IP Address</TableCell>
                <TableCell>Processor</TableCell>
                <TableCell>Memory</TableCell>
                <TableCell>HDD</TableCell>
                <TableCell>OS</TableCell>
                <TableCell>Asset State</TableCell>
                <TableCell>Issued To (First and Last Names)</TableCell>
                <TableCell>Type of Users</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Tower</TableCell>
                <TableCell>Floor Level</TableCell>
                <TableCell>Ticket No.</TableCell>
                <TableCell>Remarks</TableCell>
                <TableCell>Item Type</TableCell>
                <TableCell>Path</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Pulled Out</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productList.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No data available
                  </TableCell>
                  <TableCell colSpan={7} align="center">
                    No data available
                  </TableCell>
                  <TableCell colSpan={7} align="center">
                    No data available
                  </TableCell>
                  <TableCell colSpan={7} align="center">
                    No data available
                  </TableCell>
                  <TableCell colSpan={7} align="center">
                    No data available
                  </TableCell>
                </TableRow>
              ) : (
                sortedList
                   .filter(row => {const values = Object.values(row).join(' ').toLowerCase();
                  return values.includes(searchTerm.toLowerCase());
                  })
                  .map((row, index) => (
                    <TableRow key={row.id}>
                        {isArchive && <TableCell>{row.TableSource}</TableCell>}
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{row.ComputerName}</TableCell>
                        <TableCell>{row.SINum}</TableCell>
                        <TableCell>{row.PONum}</TableCell>
                        <TableCell>{row.GRNum}</TableCell>
                        <TableCell>{row.ComputerPrice}</TableCell>
                        <TableCell>{row.Vendor}</TableCell>
                        <TableCell>{row.DateOfEntry}</TableCell>
                        <TableCell>{row.DateOfPurchase}</TableCell>
                        <TableCell>{row.WarrantyExpiration}</TableCell>
                        <TableCell>{row.EquipmentType}</TableCell>
                        <TableCell>{row.Model}</TableCell>
                        <TableCell>{row.Brand}</TableCell>
                        <TableCell>{row.SerialNum}</TableCell>
                        <TableCell>{row.AssetTag}</TableCell>
                        <TableCell>{row.MACAddress}</TableCell>
                        <TableCell>{row.IPAddress}</TableCell>
                        <TableCell>{row.Processor}</TableCell>
                        <TableCell>{row.Memory}</TableCell>
                        <TableCell>{row.HDD}</TableCell>
                        <TableCell>{row.OS}</TableCell>
                        <TableCell>{row.AssetState}</TableCell>
                        <TableCell>{row.NameOfUser}</TableCell>
                        <TableCell>{row.TypeOfUser}</TableCell>
                        <TableCell>{row.Department}</TableCell>
                        <TableCell>{row.Tower}</TableCell>
                        <TableCell>{row.FloorLevel}</TableCell>
                        <TableCell>{row.TicketNum}</TableCell>
                        <TableCell>{row.Remarks}</TableCell>
                        <TableCell>{row.ItemType}</TableCell>
                        <TableCell>{row.Path}</TableCell>
                        <TableCell>{row.Status}</TableCell>
                        <TableCell>{row.PulledOut}</TableCell>
                        <TableCell>
                            {isArchive ? (
                            <Tooltip title='Restore'>
                                <IconButton color='primary' onClick={() => handleRestore(row)}>
                                <RestoreIcon />
                                </IconButton>
                            </Tooltip>
                            ) : (
                            <>
                                <Tooltip title='Edit'>
                                <IconButton onClick={() => openEditModal(row)}>
                                    <EditIcon />
                                </IconButton>
                                </Tooltip>
                                <Tooltip title='Delete'>
                                <IconButton color='error' onClick={() => handleDeleteClick(row.id)}>
                                    <ArchiveIcon />
                                </IconButton>
                                </Tooltip>
                            </>
                            )}
                        </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      <AddProductLD onOpen={open} onClose={CloseAddProductModal} />
      <Edit onOpen={editOpen} onClose={closeEditModal} data={selectedRow} />
      <Delete open={openDelete} onClose={handleCloseDelete} productId={selectedProduct} firebasePath={firebasePath} />
      <Restore open={openRestore} onClose={closeRestore} data={selectedRestoreData} />
    </Box>
  )
}
