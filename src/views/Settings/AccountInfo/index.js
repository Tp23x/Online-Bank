import { Box, Avatar, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import AccountList from './AccountList'
import AddIcon from '@mui/icons-material/Add';


export default function AccountInfo() {

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant='h4'>รายการข้อมูลบัญชี</Typography>
      <AccountList />
      <Avatar
        component={Link}
        to={`/Settings/AccountInfo/Add`}
        sx={{ width: '48px', height: '48px', position: 'absolute', bottom: 30, right: 30, background: '#ec4e6e', boxShadow: 'rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px' }}>
        <AddIcon />
      </Avatar>
    </Box>
  )
}
