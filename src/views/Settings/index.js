import React, { useEffect } from 'react'
import { TabContext, } from '@mui/lab';
import { Box, Container } from '@mui/material';

import Navbar from '../../components/Navbar'
import { Outlet, useLocation, useParams } from 'react-router-dom';


export default function Settings() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  let location = useLocation()
  const tabsSettingsData = [{ label: 'ผู้ใช้ทั้งหมด', value: '1', href: '/Settings/User' },
  { label: 'ตั้งค่าการเข้าถึง', value: '2', href: '/Settings/Permissions' },
  { label: 'ตั้งค่าเเอคชั่น', value: '3', href: '/Settings/ManagePermissions' },
  { label: 'ตั้งค่าบทบาท', value: '4', href: '/Settings/ManageRole' },
  { label: 'ตั้งค่าข้อมูลบัญชี', value: '5', href: '/Settings/AccountInfo' },
  { label: 'ไซต์', value: '6', href: '/Settings/Site' },
  { label: 'ยอดเงินอนุมัติ', value: '7', href: '/Settings/Approved' }]

  const {mba_bankAccID, siteID} = useParams()
  // console.log(useParams())
  useEffect(() => {
    if (location.pathname === '/Settings/User') {
      setValue('1');
    } else if (location.pathname === '/Settings/Permissions') {
      setValue('2');
    } else if (location.pathname === '/Settings/ManagePermissions') {
      setValue('3');
    } else if (location.pathname === '/Settings/ManageRole') {
      setValue('4');
    } else if (location.pathname === '/Settings/AccountInfo/') {
      setValue('5');
    } else if (location.pathname === `/Settings/AccountInfo/Detail/${mba_bankAccID}`) {
      setValue('5');
    } else if (location.pathname === `/Settings/AccountInfo/Add`) {
      setValue('5');
    } else if (location.pathname === '/Settings/Site') {
      setValue('6');
    } else if (location.pathname === `/Settings/SiteList/Update/${siteID}`) {
      setValue('6');
    } else if (location.pathname === '/Settings/SiteList/Add') {
      setValue('6');
    } else if (location.pathname === '/Settings/Approved') {
      setValue('7');
    }
  }, [location.pathname])

  return (
    <TabContext value={value} >
      <Box sx={{ width: '100%' }}>
        <Navbar handleChange={handleChange} tabsData={tabsSettingsData}>
        </Navbar>
        <Box sx={{ marginTop: '50px', height: '80vh', overflowY: 'auto' }}>
          <Container maxWidth={false} sx={{ maxWidth: '1800px' , marginBottom:'60px' }}>
            <Outlet />
          </Container>
        </Box>
      </Box>
    </TabContext>
  )
}
