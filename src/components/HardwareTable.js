import React from 'react';
import {
  TableContainer, Table, TableHead, TableRow, TableCell,
  TableBody, Paper, Box, TextField, Tooltip, IconButton
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';

export default function HardwareTable({ data, setData }) {
  const addRow = () => {
    setData(prev => [...prev, { serial: '', item: '', quantity: '', status: '', dateIssued: '' }]);
  };

  const deleteRow = (index) => {
    setData(prev => prev.filter((_, i) => i !== index));
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
              <TableCell sx={{ width: '40px', padding: 0 }}>
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
                <TableCell>
                  <TextField fullWidth value={row.serial} onChange={handleChange(index, 'serial')} />
                </TableCell>
                <TableCell>
                  <TextField fullWidth value={row.item} onChange={handleChange(index, 'item')} />
                </TableCell>
                <TableCell>
                  <TextField fullWidth type="number" value={row.quantity} onChange={handleChange(index, 'quantity')} />
                </TableCell>
                <TableCell>
                  <TextField fullWidth value={row.status} onChange={handleChange(index, 'status')} />
                </TableCell>
                <TableCell>
                  <TextField fullWidth type="date" value={row.dateIssued} onChange={handleChange(index, 'dateIssued')} />
                </TableCell>
                <TableCell sx={{ width: '40px', padding: 0 }}>
                  <Tooltip title="Delete Row">
                    <IconButton onClick={() => deleteRow(index)} size="small" color="error">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
