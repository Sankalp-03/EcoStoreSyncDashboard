import React, { useState, useEffect } from 'react'
import {
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme
} 
from "@mui/material";
import { SettingsOutlined, 
    ChevronLeft, 
    ChevronRightOutlined, 
    HomeOutlined, 
    ShoppingCartOutlined, 
    Groups2Outlined, 
    ReceiptLongOutlined, 
    PublicOutlined, 
    PointOfSaleOutlined, 
    TodayOutlined, 
    CalendarMonthOutlined,
    AdminPanelSettingsOutlined,
    TrendingUpOutlined,
    PieChartOutlined 
} 
from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom'; 
// The useNavigate hook in React Router DOM is used to programmatically navigate to a different page in your application.
import FlexBetween from './FlexBetween';
import profileImage from 'assets/profile.jpeg';
const navItems = [
    {
        text: "Dashboard",
        icon: <HomeOutlined />
    },
    {
        text: "Client Facing",
        icon: null
    },
    {
        text: "Products",
        icon: <ShoppingCartOutlined />
    },
    {
        text: "Customers",
        icon: <Groups2Outlined />
    },
    {
        text: "Transactions",
        icon: <ReceiptLongOutlined />
    },
    {
        text: "Geography",
        icon: <PublicOutlined />
    },
    {
        text: "Sales",
        icon: null
    },
    {
        text: "Overview",
        icon: <PointOfSaleOutlined />
    },
    {
        text: "Daily",
        icon: <TodayOutlined />
    },
    {
        text: "Monthly",
        icon: <CalendarMonthOutlined />
    },
    {
        text: "BreakDown",
        icon: <PieChartOutlined />
    },
    {
        text: "Management",
        icon: null
    },
    {
        text: "Admin",
        icon: <AdminPanelSettingsOutlined />
    },
    {
        text: "Performance",
        icon: <TrendingUpOutlined />
    }
]
const Sidebar = ({
    user,   drawerWidth, isSidebarOpen, setIsSidebarOpen, isNonMobile
}) => {
  const { pathname } = useLocation(); //grabs the pathname we are exactly on at the moment.
  const [active, setActive] = useState(""); //determines webpage we are currently at
  const navigate = useNavigate();
  const theme = useTheme();
  useEffect(() => {
    setActive(pathname.substring(1)); // whenever the pathname changes we gonna keep the active value to the current page
  },[pathname])
  return (
    <Box component="nav">
        {isSidebarOpen && (
            <Drawer 
                open = { isSidebarOpen }
                onClose={() => setIsSidebarOpen(false)}
                variant = "persistent" // the drawer stays throughout the current window is open, but can be closed.
                anchor="left"
                sx={{
                    width: drawerWidth,
                    "&.MuiDrawer-paper": {//modifying the custom css they already have, drawer is done 'and' with MuiDrawer-paper(the class we are targeting)
                        color:theme.palette.secondary[200],
                        backgroundColor: theme.palette.background.alt,
                        boxSizing: "border-box",
                        borderWidth: isNonMobile ? 0 : '2px',
                        width: drawerWidth
                    }
                }}
            >
                <Box width="100%">
                    <Box m="1.5rem 2rem 2rem 3rem">
                        <FlexBetween color={theme.palette.secondary.main}>
                            <Box display="flex" alignItems="center" gap="0.5rem">
                                <Typography variant='h4' fontWeight="bold">
                                    EcoStoreSync
                                </Typography>
                            </Box>
                            {
                                !isNonMobile && (
                                    <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                        <ChevronLeft />
                                        {/* Icon for going back to prev page/ in this case for closing the sidebar menu */}
                                    </IconButton>
                                )
                            }
                        </FlexBetween>
                    </Box>
                    <List>
                        {navItems.map(({ text, icon }) => {
                            if(!icon){// if icon value is null
                                return(
                                    <Typography key={text} sx={{ m : "2.25rem 0 1rem 3rem" }}>
                                        { text }
                                    </Typography>
                                )
                            }
                            const lowercaseText = text.toLowerCase();
                            return (
                                <ListItem key={text} disablePadding>
                                    <ListItemButton
                                        onClick={() => {
                                            navigate(`/${lowercaseText}`) 
                                            //onClick of the ListItemButton we gonna navigate to the route with that lowercaseText
                                            setActive(lowercaseText)// setting that page as the activeVersion
                                            }}
                                            sx={{
                                                backgroundColor: active === lowercaseText ? theme.palette.secondary[300] : "transparent",
                                                color:active===lowercaseText?theme.palette.primary[600]:theme.palette.secondary[100]
                                            }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                ml:"2rem",
                                                color:active===lowercaseText
                                                ?theme.palette.primary[600]
                                                :theme.palette.secondary[200]
                                            }}
                                        >
                                            {icon}
                                        </ListItemIcon>
                                        <ListItemText primary={text} />
                                        {
                                            active === lowercaseText && (
                                                <ChevronRightOutlined sx={{ ml: "auto"}} />
                                            )
                                        }
                                    </ListItemButton>
                                </ListItem>
                            )
                        })}
                    </List>
                </Box>
                <Box marginBottom="1.3rem">
                    <Divider />
                    <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2.5rem 0 3rem">
                        <Box component="img" alt="profile" src={profileImage} height="40px" width="40px" borderRadius="50%" sx={{objectFit: "cover"}} />
                            {/* above features of an box makes the profile picture at the bottom of the left pane */}
                            <Box textAlign="left">
                                <Typography fontWeight="bold" fontSize="0.9rem" sx={{color:theme.palette.secondary[100]}}>{user.name}</Typography>
                                <Typography fontSize="0.8rem" sx={{color:theme.palette.secondary[200]}}>{user.occupation}</Typography>
                            </Box>
                            <SettingsOutlined sx={{color:theme.palette.secondary[300],fontSize:"25px"}} />
                    </FlexBetween>
                </Box>
            </Drawer>
        )}
    </Box>
  )
}

export default Sidebar