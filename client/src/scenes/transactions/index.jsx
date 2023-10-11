import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useGetTransactionsQuery } from 'state/api';
import Header from 'components/Header'; 
import { Box, useTheme } from '@mui/material';
// import { useTheme } from '@emotion/react';
import DataGridCustomToolbar from "components/DataGridCustomToolbar";

const Transactions = () => {
  const theme = useTheme();
  const [ page, setPage ] = useState(0);
  const [ pageSize, setPageSize ] = useState(20);
  const [ sort, setSort ] = useState({});
  const [ search, setSearch ] = useState("");
  const [ searchInput, setSearchInput] = useState(""); // this is a type of temporary search field
  const { data, isLoading } = useGetTransactionsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });
  console.log(data);
  const columns = [
    {
        field: "_id",
        headerName: "ID",
        flex: 1, // how we want each column to grow, shrink or how much speed it will take up
    },
    {
        field: "userId",
        headerName: "User ID",
        flex: 1, // how we want each column to grow, shrink or how much speed it will take up
    },
    {
        field: "createdAt",
        headerName: "Created At",
        flex: 1, // how we want each column to grow, shrink or how much speed it will take up
    },
    {
        field: "products",
        headerName: "# of Products",
        flex: 0.5, // how we want each column to grow, shrink or how much speed it will take up
        sortable: false, // this columns should not be sorted 
        // renderCell component renders the contents of a cell of a table --> can return any react element, used to render react complex components
        renderCell: (params) => params.value.length // grabbing the no. of products
    },
    {
        field: "cost",
        headerName: "Cost",
        flex: 1, // how we want each column to grow, shrink or how much speed it will take up
        renderCell: (params) => `$${Number(params.value).toFixed(2)}` // making the params value to Number format, with upto 2 decimal places.
    }
]
  return (
    <Box m="1.5rem 2.5rem">
        <Header title="TRANSACTIONS" subtitle="Entire list of transactions" />
        <Box height="80vh"
            sx={{
                //Remove the border from the root element and all cells.
                "& .MuiDataGrid-root": {
                    border: "none"
                },
                "& .MuiDataGrid-cell": {
                    borderBottom: "none"
                },
                // Change the background color and text color of the column headers and footer container.
                "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: theme.palette.background.alt,
                    color: theme.palette.secondary[100],
                    borderBottom: "none"
                },
                // Change the background color of the virtual scroller.
                "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: theme.palette.primary.light,
                },
                "& .MuiDataGrid-footerContainer": {
                    backgroundColor: theme.palette.background.alt,
                    color: theme.palette.secondary[100],
                    borderTop: "none"
                },
                // Change the text color of the buttons in the toolbar.
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                    color: `${theme.palette.secondary[200]} !important`,
                }
            }}
        >
            <DataGrid 
                loading= { isLoading || !data } // for the loading spinner, whether the data grid is loading data
                getRowId={ (row) => row._id } // used to generate a unique ID for each row in the data grid
                rows = { ( data && data.transactions) || [] } // involves both data and the Transactions as well
                columns = { columns }
                rowCount = {( data & data?.total ) || 0} // data + data.Total forms total amount of data that we have sent
                rowsPerPageOptions = {[20,50,100]}
                pagination // a boolean value that indicates whether the data grid should enable pagination
                page={ page }
                pageSize = { pageSize }
                paginationMode = "server"
                //The pagination mode.This can be either server or client.If the pagination mode is server, the data grid will fetch the data for the current page from the server. 
                // If the pagination mode is client, the data grid will display the data that is already in memory.
                sortingMode = "server" // dataGrid will sort the data on the server 
                onPageChange = {(newPage) => setPage(newPage)} // function that is called when the user changes the current page.
                onPageSizeChange = {(newPageSize) => setPageSize(newPageSize)} // function that is called when the user changes the page size.
                onSortModelChange={(newSortModel) => setSort(...newSortModel)} // function that is called when the user changes the sort model.
                components = {{ Toolbar: DataGridCustomToolbar }}
                componenetsProps = {{
                    toolbar: { searchInput, setSearchInput, setSearch }
                }}
            />
        </Box>
    </Box>
  )
}

export default Transactions;