import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import { ref, push, set } from 'firebase/database';
import { db } from '../utils/firebase';
import { useLocation } from 'react-router-dom';
import Prompt from '../components/prompt';

const pathMap = {
  '/laptop-desktop': 'add-laptop-desktop',
  '/software': 'add-software',
  '/service-unit': 'add-service-unit',
  '/erx-tablets': 'add-erx-tablets',
  '/printers': 'add-printers',
  '/it-peripherals': 'add-it-peripherals',
  '/cabs': 'add-cabs',
};

export default function AddProductLD({onOpen, onClose, data}) {
  const [computerName, setComputerName] = useState('');
  const [siNum, setSiNum] = useState('');
  const [poNum, setPoNum] = useState('');
  const [grNum, setGrNum] = useState('');
  const [computerPrice, setComputerPrice] = useState('');
  const [vendor, setVendor] = useState('');
  const [dateofentry, setDateOfEntry] = useState('');
  const [dateofpurchase, setDateOfPurchase] = useState('');
  const [warrantyexpiration, setWarrantyExpiration] = useState('');
  const [equipmenttype, setEquipmentType] = useState('');
  const [model, setModel] = useState('');
  const [brand, setBrand] = useState('');
  const [serialnum, setSerialNum] = useState('');
  const [assettag, setAssetTag] = useState('');
  const [macaddress, setMacAddress] = useState('');
  const [ipaddress, setIpAddress] = useState('');
  const [processor, setProcessor] = useState('');
  const [memory, setMemory] = useState('');
  const [hdd, setHdd] = useState('');
  const [os, setOs] = useState('');
  const [assetstate, setAssetState] = useState('');
  const [nameofuser, setNameOfUser] = useState('');
  const [typeofuser, setTypeOfUser] = useState('');
  const [department, setDepartment] = useState('');
  const [tower, setTower] = useState('');
  const [floorlevel, setFloorLevel] = useState('');
  const [ticketnum, setTicketNum] = useState('');
  const [remarks, setRemarks] = useState('');
  const [itemtype, setItemType] = useState('');
  const [path, setPath] = useState('');
  const [status, setStatus] = useState('');
  const [pulledout, setPulledOut] = useState('');
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'success',
  })
  const location = useLocation();
  const firebasePath = pathMap[location.pathname];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!firebasePath) {
      setAlert({
        open: false, // Close any existing alert
        message: 'Invalid Path. Cannot save data.',
        severity: 'error'
      });
      setAlert({
        open: true,
        message: 'Invalid Path. Cannot save data.',
        severity: 'error'
      });
      return;
    }

    const requiredFields = [
      { field: computerName, name: 'Product Name' },
      { field: siNum, name: 'SI No.' },
      { field: poNum, name: 'PO No.' },
      { field: grNum, name: 'GR No.' },
      { field: computerPrice, name: 'Price' },
      { field: vendor, name: 'Vendor' },
      { field: dateofentry, name: 'Date of Entry' },
      { field: dateofpurchase, name: 'Date of Purchase' },
      { field: warrantyexpiration, name: 'Warranty Expiration' },
      { field: equipmenttype, name: 'Equipment Type' },
      { field: model, name: 'Model' },
      { field: brand, name: 'Brand' },
      { field: serialnum, name: 'Serial No.' },
      { field: assettag, name: 'Asset Tag' },
      { field: macaddress, name: 'MAC Address' },
      { field: ipaddress, name: 'IP Address' },
      { field: processor, name: 'Processor' },
      { field: memory, name: 'Memory' },
      { field: hdd, name: 'HDD' },
      { field: os, name: 'Operating System' },
      { field: assetstate, name: 'Asset State' },
      { field: nameofuser, name: 'Issued To' },
      { field: typeofuser, name: 'Type of User' },
      { field: department, name: 'Department' },
      { field: tower, name: 'Tower' },
      { field: floorlevel, name: 'Floor Level' },
      { field: ticketnum, name: 'Ticket No.' },
      { field: remarks, name: 'Remarks' },
      { field: itemtype, name: 'Item Type' },
      { field: path, name: 'Path' },
      { field: status, name: 'Status' },
      { field: pulledout, name: 'Pulled Out' }
    ];

    for (let i = 0; i < requiredFields.length; i++) {
      const { field, name } = requiredFields[i];
      if (!field) {
        setAlert({
          open: true,
          message: `${name} is required.`,
          severity: 'error'
        });
        return;
      }
    }

    const newProductRef = push(ref(db, firebasePath));
    const id = newProductRef.key;
    await set(newProductRef, {
      TableSource: location.pathname,
      id,
      ComputerName: computerName,
      SINum: siNum,
      PONum: poNum,
      GRNum: grNum,
      ComputerPrice: parseFloat(computerPrice),
      Vendor: vendor,
      DateOfEntry: dateofentry,
      DateOfPurchase: dateofpurchase,
      WarrantyExpiration: warrantyexpiration,
      EquipmentType: equipmenttype,
      Model: model,
      Brand: brand,
      SerialNum: serialnum,
      AssetTag: assettag,
      MACAddress: macaddress,
      IPAddress: ipaddress,
      Processor: processor,
      Memory: memory,
      HDD: hdd,
      OS: os,
      AssetState: assetstate,
      NameOfUser: nameofuser,
      TypeOfUser: typeofuser,
      Department: department,
      Tower: tower,
      FloorLevel: floorlevel,
      TicketNum: ticketnum,
      Remarks: remarks,
      ItemType: itemtype,
      Path: path,
      Status: status,
      PulledOut: pulledout
    });
    setAlert({
      open: true,
      message: 'Successfully Added.',
      severity: 'success'
    })
    setTimeout(() => {
      setAlert({
        open: false,
        message: alert.message,
        severity: alert.severity
      })
      Clear();
      onClose();
    }, 1000)
  };

  const Clear = () => {
    setComputerName('');
    setSiNum('');
    setPoNum('');
    setGrNum('');
    setComputerPrice('');
    setVendor('');
    setDateOfEntry('');
    setDateOfPurchase('');
    setWarrantyExpiration('');
    setEquipmentType('');
    setModel('');
    setBrand('');
    setSerialNum('');
    setAssetTag('');
    setMacAddress('');
    setIpAddress('');
    setProcessor('');
    setHdd('');
    setMemory('');
    setOs('');
    setAssetState('');
    setNameOfUser('');
    setTypeOfUser('');
    setDepartment('');
    setTower('');
    setFloorLevel('');
    setTicketNum('');
    setRemarks('');
    setItemType('');
    setPath('');
    setStatus('');
    setPulledOut('');
  }
   
  const handleCloseAlert = () => {
    setAlert({
      open: false,
      message: alert.message,
      severity: alert.severity
    });
  };

  const handleClose = () => {
    setAlert({
      open: true,
      message: 'Canceling Current Work',
      severity: 'info',
    });
    Clear();
    setTimeout(() => {
      setAlert({
        open: false,
        message: '',
        severity: 'info',
      });
      onClose();
    }, 2000);
  };  
  

  return (
    <>
      <Dialog
        open={onOpen}
        onClose={(event, reason) => {
          if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
            onClose();
          }
        }}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Add New Product</DialogTitle>
        <Prompt open={alert.open} message={alert.message} severity={alert.severity} onClose={handleCloseAlert}  />
        <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <TextField fullWidth label="Product Name" value={computerName} onChange={(e) => setComputerName(e.target.value)} sx={{ mb: 2 }} />
          <TextField fullWidth label="SI No." value={siNum} onChange={(e) => setSiNum(e.target.value)} sx={{ mb: 2 }} />
          <TextField fullWidth label="PO No." value={poNum} onChange={(e) => setPoNum(e.target.value)} sx={{ mb: 2 }} />
          <TextField fullWidth label="GR No." value={grNum} onChange={(e) => setGrNum(e.target.value)} sx={{ mb: 2 }} />
          <TextField fullWidth label="Price" type="number" value={computerPrice} onChange={(e) => setComputerPrice(e.target.value)} sx={{ mb: 2 }} />
          <TextField fullWidth label="Vendor" value={vendor} onChange={(e) => setVendor(e.target.value)} sx={{ mb: 2 }} />
          <TextField fullWidth label="Date Entry" type="date" value={dateofentry} onChange={(e) => setDateOfEntry(e.target.value)} sx={{ mb: 2 }} InputLabelProps={{ shrink: true }} />
          <TextField fullWidth label="Date of Purchase" type="date" value={dateofpurchase} onChange={(e) => setDateOfPurchase(e.target.value)} sx={{ mb: 2 }} InputLabelProps={{ shrink: true }} />
          <TextField fullWidth label="Warranty Expiration" type="date" value={warrantyexpiration} onChange={(e) => setWarrantyExpiration(e.target.value)} sx={{ mb: 2 }} InputLabelProps={{ shrink: true }} />
          <TextField fullWidth label="Equipment Type" value={equipmenttype} onChange={(e) => setEquipmentType(e.target.value)} sx={{ mb: 2 }} />
          <TextField fullWidth label="Model" value={model} onChange={(e) => setModel(e.target.value)} sx={{ mb: 2 }} />
          <TextField fullWidth label="Brand" value={brand} onChange={(e) => setBrand(e.target.value)} sx={{ mb: 2 }} />
          <TextField fullWidth label="Serial No." value={serialnum} onChange={(e) => setSerialNum(e.target.value)} sx={{ mb: 2 }} />
          <TextField fullWidth label="Asset Tag" value={assettag} onChange={(e) => setAssetTag(e.target.value)} sx={{ mb: 2 }} />
          <TextField fullWidth label="MAC Address" value={macaddress} onChange={(e) => setMacAddress(e.target.value)} sx={{ mb: 2 }} />
          <TextField fullWidth label="IP Address" value={ipaddress} onChange={(e) => setIpAddress(e.target.value)} sx={{ mb: 2 }} />
          <TextField fullWidth label="Processor" value={processor} onChange={(e) => setProcessor(e.target.value)} sx={{ mb: 2 }} />
          <TextField fullWidth label="Memory" value={memory} onChange={(e) => setMemory(e.target.value)} sx={{ mb: 2 }} />
          <TextField fullWidth label="HDD" value={hdd} onChange={(e) => setHdd(e.target.value)} sx={{ mb: 2 }} />
          <TextField fullWidth label="Operating System" value={os} onChange={(e) => setOs(e.target.value)} sx={{ mb: 2 }} />
          <TextField fullWidth label="Asset State" value={assetstate} onChange={(e) => setAssetState(e.target.value)} sx={{ mb: 2 }} />
          <TextField fullWidth label="Issued To" value={nameofuser} onChange={(e) => setNameOfUser(e.target.value)} sx={{ mb: 2 }} />
          <TextField fullWidth label="Type of User" value={typeofuser} onChange={(e) => setTypeOfUser(e.target.value)} sx={{ mb: 2 }} />
          <TextField fullWidth label="Department" value={department} onChange={(e) => setDepartment(e.target.value)} sx={{ mb: 2 }} />
          <TextField fullWidth label="Tower" value={tower} onChange={(e) => setTower(e.target.value)} sx={{ mb: 2 }} />
          <TextField fullWidth label="Floor Level" value={floorlevel} onChange={(e) => setFloorLevel(e.target.value)} sx={{ mb: 2 }} />
          <TextField fullWidth label="Ticket No." value={ticketnum} onChange={(e) => setTicketNum(e.target.value)} sx={{ mb: 2 }} />
          <TextField fullWidth label="Remarks" value={remarks} onChange={(e) => setRemarks(e.target.value)} sx={{ mb: 2 }} />
          <TextField fullWidth label="Item Type" value={itemtype} onChange={(e) => setItemType(e.target.value)} sx={{ mb: 2 }} />
          <TextField fullWidth label="Path" value={path} onChange={(e) => setPath(e.target.value)} sx={{ mb: 2 }} />
          <TextField fullWidth label="Status" value={status} onChange={(e) => setStatus(e.target.value)} sx={{ mb: 2 }} />
          <TextField fullWidth label="Pulled Out" value={pulledout} onChange={(e) => setPulledOut(e.target.value)} sx={{ mb: 2 }} />
        </DialogContent>
          <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
