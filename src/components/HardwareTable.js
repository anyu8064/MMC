import React from 'react';
import {
  TableContainer, Table, TableHead, TableRow, TableCell,
  TableBody, Paper, Box, TextField, Tooltip, IconButton
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default function HardwareTable({ data, setData }) {
  const addRow = () => {
    setData(prev => [...prev, { serial: '', item: '', quantity: '', status: '', dateIssued: '' }]);
  };

  const handleChange = (index, field) => (e) => {
    const updated = [...data];
    updated[index][field] = e.target.value;
    setData(updated);
  };

  return (
    <Box>
      <TableContainer component={Paper} sx={{ maxHeight: '300px', overflow: 'auto' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Serial/Asset Tag Number</TableCell>
              <TableCell>Items (Hardware/s)</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Received/Not Received</TableCell>
              <TableCell>Date Issued</TableCell>
              <TableCell align="right">
                <Tooltip title="Add Row">
                  <IconButton onClick={addRow} size="small">
                    <AddCircleOutlineIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell><TextField fullWidth value={row.serial} onChange={handleChange(index, 'serial')} /></TableCell>
                <TableCell><TextField fullWidth value={row.item} onChange={handleChange(index, 'item')} /></TableCell>
                <TableCell><TextField fullWidth type="number" value={row.quantity} onChange={handleChange(index, 'quantity')} /></TableCell>
                <TableCell><TextField fullWidth value={row.status} onChange={handleChange(index, 'status')} /></TableCell>
                <TableCell colSpan={2}><TextField fullWidth type="date" value={row.dateIssued} onChange={handleChange(index, 'dateIssued')} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
