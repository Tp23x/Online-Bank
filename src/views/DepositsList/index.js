import React, { useEffect, useRef, useState } from 'react'
import { TabContext } from '@mui/lab';
import { Box, Typography, Container, Button, Menu, Fade, MenuItem, Card, List, ListItem, ListItemText, Divider } from '@mui/material';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../../components/api/api';
import moment from "moment";
import { useNavigate } from 'react-router-dom';

import Navbar from '../../components/Navbar'
import { Outlet, useLocation } from 'react-router-dom';

import NotificationSound from "../../assets/sound/notification-sound.mp3"

function notificationsLabel(count) {
  if (count === 0) {
    return 'no notifications';
  }
  if (count > 99) {
    return 'more than 99 notifications';
  }
  return `${count} notifications`;
}

export default function DepositList() {
  const [value, setValue] = React.useState('1');
  let location = useLocation()

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const tabsDepositListData = [{ label: 'รายการฝากออโต้', value: '1', href: '/DepositsList/ListMoney' },
  { label: 'รายการฝากไม่ทราบที่มา', value: '2', href: '/DepositsList/ListUnknow' },
  { label: 'รายการฝากคริปโต', value: '3', href: '/DepositsList/ListCrypto' },
  { label: 'การฝากโบนัส', value: '4', href: '/DepositsList/ListBonus' }]

  useEffect(() => {
    if (location.pathname === '/DepositsList/ListMoney') {
      setValue('1');
    } else if (location.pathname === '/DepositsList/ListUnknow') {
      setValue('2');
    } else if (location.pathname === '/DepositsList/ListCrypto') {
      setValue('3');
    } else if (location.pathname === '/DepositsList/ListBonus') {
      setValue('4');
    }
  }, [location.pathname])

 

  return (
    <TabContext value={value}>
      <Box sx={{ width: '100%' }}>
        <Navbar handleChange={handleChange} tabsData={tabsDepositListData}/>
        <Box sx={{ marginTop: '50px', height: '80vh', overflowY: 'auto' }}>
          <Container maxWidth={false} sx={{ maxWidth: '1750px', marginBottom: '60px' }}>
            <Outlet />
          </Container>
        </Box>
      </Box>
    </TabContext>
  )
}
