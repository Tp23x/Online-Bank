import { Box, Typography, Avatar } from '@mui/material'
import React from 'react'
import UserList from './UserList'
import { Link } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add';

export default function User() {
    return (
        <Box sx={{ width: '100%' }}>
                <Typography variant='h4'>ผู้ใช้ทั้งหมด</Typography>
                <UserList/>
                <Avatar
                    component={Link}
                    to={`/Settings/User/CreateUser`}
                    sx={{ width: '48px', height: '48px', position: 'absolute', bottom: 30, right: 30, background: '#ec4e6e', boxShadow: 'rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px' }}>
                    <AddIcon />
                </Avatar>
        </Box>
    )
}
