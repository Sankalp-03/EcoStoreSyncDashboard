import React from 'react';
import { Box, useTheme } from '@mui/material';
import { useGetUserPerformanceQuery } from 'state/api';
import { useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import Header from 'components/Header';
import CustomColumnMenu from 'components/DataGridCustomColumnMenu';
const Performance = () => {
  const theme = useTheme();
  // grabbing the userId
  const userId = useSelector((state) => state.global.userId)
  const { data, isLoading } = useGetUserPerformanceQuery(userId);
//   console.log(data);
  const columns = [
        {
            field: "_id",
            headerName: "ID",
            flex: 1, // how we want each column to grow, shrink or how much speed it will take up
        },
        {
            field: "userId",
            headerName: "User Id",
            flex: 1, // how we want each column to grow, shrink or how much speed it will take up
        },
        {
            field: "createdAt",
            headerName: "CreatedAt",
            flex: 1, // how we want each column to grow, shrink or how much speed it will take up
        },
        {
            field: "products",
            headerName: "# of Products",
            flex: 0.5, // how we want each column to grow, shrink or how much speed it will take up
            sortable: false,
            renderCell : (params) => params.value.length
        },
        {
            field: "cost",
            headerName: "Cost",
            flex: 1, // how we want each column to grow, shrink or how much speed it will take up
            renderCell: (params) => `${Number(params.value).toFixed(2)}`
        },
    ]
  return (
    <Box m="1.5rem 2.5rem">
        <Header title="PERFORMANCE" subTitle="Track your affilitate Sales performance here" />
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
                rows={ (data && data.sales) || [] }
                columns = { columns }
                components={{
                    ColumnMenu: CustomColumnMenu,
                }}
            />
        </Box>
    </Box>
  )
}

export default Performance;