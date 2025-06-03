import React from 'react';
import {
  TableContainer, Table, TableHead, TableRow, TableCell,
  TableBody, Paper, Box, TextField, Tooltip, IconButton
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default function MmcAppTable({ data, setData }) {
  const addRow = () => {
    setData(prev => [...prev, { software: '', installed: '', dateInstalled: '' }]);
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
              <TableCell>Mmc App/s</TableCell>
              <TableCell>Installed/Configured</TableCell>
              <TableCell>Date Installed</TableCell>
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
                <TableCell><TextField fullWidth value={row.software} onChange={handleChange(index, 'software')} /></TableCell>
                <TableCell><TextField fullWidth value={row.installed} onChange={handleChange(index, 'installed')} /></TableCell>
                <TableCell colSpan={2}><TextField type="date" fullWidth value={row.dateInstalled} onChange={handleChange(index, 'dateInstalled')} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
