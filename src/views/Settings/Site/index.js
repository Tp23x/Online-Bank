import React from 'react'
import { Box, Typography, Avatar } from '@mui/material';
import { Link } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add';

import SiteList from './SiteList'
import { useSelector } from 'react-redux';

export default function Site() {
//   const { profile } = useSelector(state => state.profile)
//   console.log(profile);
    return (
        <Box sx={{ width: '100%' }}>
                <Box sx={{ display: 'flex', gridAutoRows: "auto" }}>
                    <Typography variant='h4'>รายการข้อมูลไซต์</Typography>
                </Box>
                <SiteList />
                <Avatar
                    component={Link}
                    to={`/Settings/SiteList/Add`}
                    sx={{ width: '48px', height: '48px', position: 'absolute', bottom: 30, right: 30, background: '#ec4e6e', boxShadow: 'rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px' }}>
                    <AddIcon />
                </Avatar>
        </Box>
    )
}
