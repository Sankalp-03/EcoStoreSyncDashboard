import React, { useState } from 'react';
import { LightModeOutlined, DarkModeOutlined, Menu as MenuIcon, Search, SettingsOutlined, ArrowDropDownOutlined } from '@mui/icons-material';
import FlexBetween from './FlexBetween';
import { useDispatch } from 'react-redux'; // allows you to send or dispatch an action to the redux store by giving the action as an argument to the dispatch variable.
import { setMode } from 'state';
import profileImage from 'assets/profile.jpeg';
import { AppBar, Icon, IconButton, InputBase, MenuItem, Toolbar, useTheme, Button, Box, Typography, Menu } from '@mui/material';
// The useTheme hook in Material UI is used to access the current theme object. This allows you to use the Material UI theme in your React components.
const Navbar = ({
    user,
    isSidebarOpen,
    setIsSidebarOpen,
}) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [enchorEl, setEnchorEl] = useState(null); //enchorel is used to set the position of menu
  const isOpen = Boolean(enchorEl);
  const handleClick = (event) => {
    setEnchorEl(event.currentTarget);
  }
  const handleClose = () => setEnchorEl(null);
  return (
    <AppBar
    sx={{
        position:"static",
        background: "none",
        boxShadow: "none"
    }}
    > 
        {/* 'sx' keyword is used to style the appbar component. makes the appbar static to the top, removes backgroundcolor, removes any boxShadow effect */}
        <Toolbar sx={{ justifyContent: "space-between" }}>
            {/* BUILDING THE LEFT SIDE */}
            <FlexBetween>
                <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <MenuIcon />
                </IconButton>
                <FlexBetween
                backgroundColor={theme.palette.background.alt}
                borderRadius="9px"
                gap="3rem"
                p="0.1rem 1.5rem"
                >
                    <InputBase placeholder="Search...." />
                    <IconButton>
                        <Search />
                    </IconButton>
                </FlexBetween>
            </FlexBetween>
            {/* BUILDING THE RIGHT SIDE */}
            <FlexBetween gap="1.5rem">
                {/* Below line basically dispatches the setMode function, once the button is clicked the setMode values are initialized*/}
                <IconButton onClick={() => dispatch(setMode())}> 
                    {theme.palette.mode === 'dark' ? (
                        <DarkModeOutlined sx={{ fontSize: "25px" }} />
                    ) : (
                        <LightModeOutlined sx={{ fontSize: "25px" }} />
                    )}
                </IconButton>
                <IconButton>
                    <SettingsOutlined sx={{ fontSize: "25px" }} />
                </IconButton>
                <FlexBetween>
                    <Button onClick={handleClick} sx={{ display:"flex", justifyContent:"space-between", alignItems:"center", textTransform:"none", gap:"1rem"}}>
                        <Box component="img" alt="profile" src={profileImage} height="32px" width="32px" borderRadius="50%" sx={{objectFit: "cover"}} />
                        <Box textAlign="left">
                                <Typography fontWeight="bold" fontSize="0.85rem" sx={{color:theme.palette.secondary[100]}}>{user.name}</Typography>
                                <Typography fontSize="0.75rem" sx={{color:theme.palette.secondary[200]}}>{user.occupation}</Typography>
                        </Box>
                        <ArrowDropDownOutlined sx={{ color: theme.palette.secondary[300], fontSize:"25px" }} />
                    </Button>
                    <Menu enchorEl={enchorEl} open={isOpen} onClose={handleClose} anchorOrigin={{ vertical:"bottom", horizontal:"center" }}>
                        {/* open prop tells whether menu is open or closed */}
                        <MenuItem onClick={handleClose}>Log Out</MenuItem>
                    </Menu>
                </FlexBetween>
            </FlexBetween>
        </Toolbar>
    </AppBar>
  )
}

export default Navbar;