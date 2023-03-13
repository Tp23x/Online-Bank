
import React, { useContext, useEffect, useState } from 'react'
import { TabContext, TabPanel } from '@mui/lab';
import { Box, Container, FormControl, Grid, MenuItem, Select, Typography } from '@mui/material';


import Navbar from '../components/Navbar'


export default function UnAction() {
  const [value, setValue] = useState('1');


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <TabContext value={value}>
      <Box sx={{ width: '100%' }}>
        <Container maxWidth={false} sx={{ maxWidth: '1800px', }}>
          <TabPanel value='1' sx={{ height: 'auto', overflow: 'auto' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <Typography variant='h4'>ไม่มีสิทธิ์เข้าใช้งาน</Typography>
            </Box>
          </TabPanel>
        </Container>

      </Box>
    </TabContext>
  )
}
