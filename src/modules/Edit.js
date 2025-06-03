import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import { ref, update } from 'firebase/database';
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

export default function Edit({onOpen, onClose, data}) {
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
    severity: 'success'
  })
  const location = useLocation();
  const firebasePath = pathMap[location.pathname];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!firebasePath || !data?.id) return;
  
    const productRef = ref(db, `${firebasePath}/${data.id}`);
    await update(productRef, {
      ComputerName: computerName,
      SINum: siNum,
      PONum: poNum,
      GRNum: grNum,
      ComputerPrice: computerPrice,
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
      message: 'Successfully Updated.',
      severity: 'success'
    });
  
    setTimeout(() => {
      setAlert({ open: false, message: '', severity: 'success' });
      onClose();
      Clear();
    }, 1000);
  };

  useEffect(() => {
    if (data) {
      setComputerName(data.ComputerName || '');
      setSiNum(data.SINum || '');
      setPoNum(data.PONum || '');
      setGrNum(data.GRNum || '');
      setComputerPrice(data.ComputerPrice || '');
      setVendor(data.Vendor || '');
      setDateOfEntry(data.DateOfEntry || '');
      setDateOfPurchase(data.DateOfPurchase || '');
      setWarrantyExpiration(data.WarrantyExpiration || '');
      setEquipmentType(data.EquipmentType || '');
      setModel(data.Model || '');
      setBrand(data.Brand || '');
      setSerialNum(data.SerialNum || '');
      setAssetTag(data.AssetTag || '');
      setMacAddress(data.MACAddress || '');
      setIpAddress(data.IPAddress || '');
      setProcessor(data.Processor || '');
      setMemory(data.Memory || '');
      setHdd(data.HDD || '');
      setOs(data.OS || '');
      setAssetState(data.AssetState || '');
      setNameOfUser(data.NameOfUser || '');
      setTypeOfUser(data.TypeOfUser || '');
      setDepartment(data.Department || '');
      setTower(data.Tower || '');
      setFloorLevel(data.FloorLevel || '');
      setTicketNum(data.TicketNum || '');
      setRemarks(data.Remarks || '');
      setItemType(data.ItemType || '');
      setPath(data.Path || '');
      setStatus(data.Status || '');
      setPulledOut(data.PulledOut || '');
    }
  }, [data]);  

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
    setAlert({
      open: false,
      message: '',
      severity: 'success'
    })
  }

  return (
    <>
      <Dialog open={onOpen} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>Add New Product</DialogTitle>
        <Prompt open={alert.open} message={alert.message} severity={alert.severity} onClose={onClose} />
        <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <TextField fullWidth label="Product Name" value={computerName} onChange={(e) => setComputerName(e.target.value)} sx={{ mb: 2 }} />
          <TextField fullWidth label="SI No." value={siNum} onChange={(e) => setSiNum(e.target.value)} sx={{ mb: 2 }} />
          <TextField fullWidth label="PO No." value={poNum} onChange={(e) => setPoNum(e.target.value)} sx={{ mb: 2 }} />
          <TextField fullWidth label="GR No." value={grNum} onChange={(e) => setGrNum(e.target.value)} sx={{ mb: 2 }} />
          <TextField fullWidth label="Price" value={computerPrice} onChange={(e) => setComputerPrice(e.target.value)} sx={{ mb: 2 }} />
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
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              Update
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
