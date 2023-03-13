import { Box } from '@mui/material';
import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';


export default function Layout() {
    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Outlet />
        </Box>
    )
}
