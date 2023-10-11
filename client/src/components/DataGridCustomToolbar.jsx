import React from 'react';
import { Search } from '@mui/icons-material';
import { IconButton, TextField, InputAdornment } from '@mui/material';
// InputAdornment is a React component from Material-UI that allows you to add a prefix, suffix, or action to an input field. 
// It is typically used to add icons, buttons, or other elements to an input field to provide additional context or functionality.
import { GridToolbarDensitySelector, GridToolbarContainer, GridToolbarExport, GridToolbarColumnsButton } from '@mui/x-data-grid';
import FlexBetween from './FlexBetween';
const DataGridCustomToolbar = ({ searchInput, setSearchInput, setSearch }) => {
  return (
    <GridToolbarContainer>
        <FlexBetween width="100%">
            <FlexBetween>
                <GridToolbarColumnsButton />
                <GridToolbarDensitySelector />
                <GridToolbarExport />
            </FlexBetween>
        <TextField 
            label="Search..."
            sx={{ mb:"0.5rem", width:"15rem"}}
            onChange={ (e) => setSearchInput(e.target.value) }
            value= {searchInput}
            variant="standard"
            InputProps={{
                endAdornment: ( // for customizing the text Field we are creating
                    <InputAdornment position="end">
                        <IconButton onClick={() => {
                            setSearch(searchInput);
                            setSearchInput("");
                        }}>
                            <Search /> 
                            {/* Search keyword works only on Cost and UserId field, other fields may require frontend or may not be in proper format */}
                        </IconButton>
                    </InputAdornment>
                ) 
            }}
        />
        </FlexBetween>
    </GridToolbarContainer>
  )
}

export default DataGridCustomToolbar