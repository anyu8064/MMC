import React from 'react';
import { TextField, InputAdornment, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function Search({searchTerm, setSearchTerm}) {
  return (
    <Box>
        <TextField
            variant="outlined"
            size = 'small'
            fullWidth
            placeholder='Search'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ maxWidth: 400, ml: 8, mt: -7, position: 'absolute' }}
            InputProps={{
                startAdornment: (
                <InputAdornment position="start">
                    <SearchIcon />
                </InputAdornment>
                ),
            }}
        />
    </Box>
  );
}