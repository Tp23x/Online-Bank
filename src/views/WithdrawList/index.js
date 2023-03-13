import React, { useEffect } from 'react'
import { TabContext } from '@mui/lab';
import { Box, Typography, Container } from '@mui/material';

import Navbar from '../../components/Navbar'
import { Outlet, useLocation } from 'react-router-dom';

export default function WithdawList() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  let location = useLocation()
  
  const tabsWithdawListData = [{ label: 'รายการถอน', value: '1', href: '/WithdawList/ListMoney' },
  { label: 'รายการถอนคริปโต', value: '2', href: '/WithdawList/ListCrypto' },]

  useEffect(() => {
    if (location.pathname === '/WithdawList/ListMoney') {
      setValue('1');
    } else if (location.pathname === '/WithdawList/ListCrypto') {
      setValue('2');
    } 
  }, [location.pathname])

  return (
    <TabContext value={value}>
      <Box sx={{ width: '100%' }}>
        <Navbar handleChange={handleChange} tabsData={tabsWithdawListData}/>
        <Box sx={{ marginTop: '50px', height: '80vh', overflowY: 'auto' }}>
          <Container maxWidth={false} sx={{ maxWidth: '1750px', marginBottom:'60px'  }}>
            <Outlet />
          </Container>
        </Box>
      </Box>
    </TabContext>
  )
}

