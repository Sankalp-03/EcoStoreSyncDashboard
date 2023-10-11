import React from 'react';
import { Box, useTheme } from "@mui/material";
import { useGetCustomersQuery } from 'state/api';
import Header from 'components/Header'; 
import { DataGrid } from '@mui/x-data-grid';
const Customers = () => {
    const theme = useTheme();
    const { data, isLoading } = useGetCustomersQuery();
    console.log(data);
    const columns = [
        {
            field: "_id",
            headerName: "ID",
            flex: 1, // how we want each column to grow, shrink or how much speed it will take up
        },
        {
            field: "name",
            headerName: "Name",
            flex: 0.5, // how we want each column to grow, shrink or how much speed it will take up
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1, // how we want each column to grow, shrink or how much speed it will take up
        },
        {
            field: "phoneNumber",
            headerName: "Phone NUmber",
            flex: 0.5, // how we want each column to grow, shrink or how much speed it will take up
            // if we ever want to customize that particular column thenwe can create an callback func. for it.
            renderCell: (params) => {
                return params.value.replace(/^(\d{3})(\d{3})(\d{4})/,"($1)$2-$3") // the regex takes each of the value and puts it into the form of ($1)$2-$3
            }
        },
        {
            field: "country",
            headerName: "Country",
            flex: 0.4, // how we want each column to grow, shrink or how much speed it will take up
        },
        {
            field: "occupation",
            headerName: "Occupation",
            flex: 1, // how we want each column to grow, shrink or how much speed it will take up
        },
        {
            field: "role",
            headerName: "Role",
            flex: 0.5, // how we want each column to grow, shrink or how much speed it will take up
        }
    ]
  return (
    <Box m="1.5rem 2.5rem">
        <Header title="CUSTOMERS" subTitle="List of Customers" />
        <Box
            mt="30px"
            height="79vh"
            sx={{
                //Remove the border from the root element and all cells.
                "&.MuiDataGrid-root": {
                    border: "none"
                },
                "&.MuiDataGrid-cell": {
                    borderBottom: "none"
                },
                // Change the background color and text color of the column headers and footer container.
                "&.MuiDataGrid-columnHeaders": {
                    backgroundColor: theme.palette.background.alt,
                    color: theme.palette.secondary[100],
                    borderBottom: "none"
                },
                // Change the background color of the virtual scroller.
                "&.MuiDataGrid-virtualScroller": {
                    backgroundColor: theme.palette.primary.light,
                },
                "&.MuiDataGrid-footerContainer": {
                    backgroundColor: theme.palette.background.alt,
                    color: theme.palette.secondary[100],
                    borderTop: "none"
                },
                // Change the text color of the buttons in the toolbar.
                "&.MuiDataGrid-toolbarContainer .MuiButton-text": {
                    color: `${theme.palette.secondary[200]} !important`,
                }
            }}
        >
            <DataGrid 
                Loading = { isLoading || !data } // allows to make an spinning circle when the data is being loaded.
                getRowId={ (row) => row._id }
                rows={ data || [] }
                columns = { columns }
            />
        </Box>
    </Box>
  )
}

export default Customers;