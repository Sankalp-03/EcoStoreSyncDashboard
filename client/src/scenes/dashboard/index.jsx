import React from 'react';
import FlexBetween from 'components/FlexBetween';
import Header from 'components/Header';
import { DownloadOutlined, Email, PointOfSale, PersonAdd, Traffic } from '@mui/icons-material';
import { Box, Typography, Button, useTheme, useMediaQuery } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import BreakdownChart from 'components/BreakdownChart';
import OverviewChart from 'components/OverviewChart';
import { useGetDashboardQuery } from 'state/api';
import StatBox from 'components/StatBox';
const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("( min-width: 1200px )");
  const { data, isLoading } = useGetDashboardQuery();
  // console.log(data);
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
  return <Box m="1.5rem 2.5rem">
    <FlexBetween>
      <Header title="Dashboard" subtitle="Welcome to The Dashboard" />
      <Box>
        <Button sx={{
          backgroundColor: theme.palette.secondary.light,
          color: theme.palette.background.alt,
          fontSize: "14px",
          fontWeight: "bold",
          padding: "10px 20px"
        }}
        >
        <DownloadOutlined sx={{ mr: "10px" }} />
        Download Reports
        </Button>
      </Box>
    </FlexBetween>
    <Box
      mt= "20px"
      display= "grid"
      gridTemplateColumns="repeat(12,1fr)" // 12 parts of one fractional unit
      gridAutoRows="160px"
      gap="20px"
      sx={{
        " & > div ": { gridColumn: isNonMediumScreens ? undefined : "span 12" } // if non-medium screens then no need of columns, else take the whole width
      }}
    >
      {/* Row 1 begins */}
      <StatBox
        title="Total Customers"
        value={data && data.totalCutomers}
        increase="+14%"
        description="Since last month"
        icon={
          <Email sx={{ color: theme.palette.secondary[300], fontSize:"26px"}} />
        }
        />
        <StatBox
        title="Sales Today"
        value={ data && data.todayStats?.totalSales }
        increase="+21%"
        description="Since last month"
        icon={
          <PointOfSale sx={{ color: theme.palette.secondary[300], fontSize:"26px"}} />
        }
        />
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={ theme.palette.background.alt }
          p="1rem"
          borderRadius="0.55rem"
        >
          <OverviewChart view="Sales" isDashboard={true} />
        </Box>
        <StatBox
        title="Monthly Sales"
        value={ data && data.thisMonthStats.totalSales }
        increase="+5%"
        description="Since last month"
        icon={
          <PersonAdd sx={{ color: theme.palette.secondary[300], fontSize:"26px"}} />
        }
        />
        <StatBox
        title="Yearly Sales"
        value={ data && data.yearlySalesTotal }
        increase="+43%"
        description="Since last month"
        icon={
          <Traffic sx={{ color: theme.palette.secondary[300], fontSize:"26px"}} />
        }
        />
        {/* ROW 2 BEGINS */}
        <Box
          gridColumn="span 8"
          gridRow="span 3"
          sx={{
                //Remove the border from the root element and all cells.
                "& .MuiDataGrid-root": {
                    border: "none",
                    borderRadius: "5rem"
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
                    backgroundColor: theme.palette.background.alt,
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
            />
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{color: theme.palette.secondary[100]}}>
            Sales by Category
          </Typography>
          <BreakdownChart isDashboard={true} />
          <Typography p="0 0.6rem" fontSize="0.8rem" sx={{color: theme.palette.secondary[200]}}>
            Breakdown of real states and info via category for revenue made for this year and total Sales
          </Typography>
        </Box>
    </Box>
  </Box>
}

export default Dashboard;