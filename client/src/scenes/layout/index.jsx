import React, { useState } from 'react'
import { Box, useMediaQuery } from "@mui/material"; 
//useMediaQuery hook detects the current media query state, allows u to conditionally render different components 
import { Outlet } from "react-router-dom"; //used to render the child routes of an parent route, tells where to render the child routes
import { useSelector } from "react-redux";
import Navbar from "components/Navbar";
import SideBar from "components/Sidebar";
import { useGetUserQuery } from "state/api";
const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)"); //returns a boolean if the min-width condition is achieved or not.
  // returns true for desktop screens and false for mobile screens.
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const userId = useSelector((state) => state.global.userId); //grabbing the userId from the redux toolkit (from state/index.js)
  // making an api call using useGetUserQuery
  const { data } = useGetUserQuery(userId);
  // console.log("data", data);
  // console.log(process.env.BASE_URL);  
  return (
    <Box display = { isNonMobile ? "flex" : "block" } width="100%" height="100%">
        <SideBar
            user = {data || {}} // if value is there then data will be taken else an empty array, removing the undefined error.
            isNonMobile = { isNonMobile }
            drawerWidth = "250px"
            isSidebarOpen={ isSidebarOpen }
            setIsSidebarOpen = { setIsSidebarOpen }
        />
        <Box flexGrow={1}>
            <Navbar 
                user = { data || {}}
                isSidebarOpen = { isSidebarOpen }
                setIsSidebarOpen = { setIsSidebarOpen }
            />
            <Outlet />
            {/* So Layout has child as the dashboard page, hence dashboard is rendered at the place of Outlet */}
        </Box>
    </Box>
  )
}

export default Layout