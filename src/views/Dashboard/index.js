
import React, { useContext, useEffect, useState } from 'react'
import { TabContext, TabPanel } from '@mui/lab';
import { Box, Container, FormControl, Grid, MenuItem, Select, Typography } from '@mui/material';


import Navbar from '../../components/Navbar'
import MonthCard from './MonthCard';
import TodayCard from './TodayCard';
import WeekCard from './WeekCard';
import YearCard from './YearCard';
import OverallCard from './OverallCard';
import AuthContext from '../../context/AuthProvider';

export default function Dashboard() {
  const [value, setValue] = useState('1');
  const [site, setSite] = useState([]);
  const [set, setSet] = useState();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true)
  const { get_sites_token } = useContext(AuthContext)
  const handleSelect = (event) => {
    setSet(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const tabsDashboardData = [{ label: 'Dashboard', value: '1', href: '/' }]

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    get_sites_token(setSite)
  }, [get_sites_token, setSite])

  useEffect(() => {
    if(site.length === 0) {
      setIsLoading(true)
    }
    else {
      setIsLoading(false)
      setSet(site[0].siteID)
    }
  },[site,setIsLoading, setSite])

  // console.log(set)

  return (
    <TabContext value={value}>
      <Box sx={{ width: '100%' }}>
        <Navbar handleChange={handleChange} tabsData={tabsDashboardData}>
        </Navbar>
        <Container maxWidth={false} sx={{ maxWidth: '1800px', }}>
          <TabPanel value='1' sx={{ height: '86vh', overflow: 'auto' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <Typography variant='h4'>Dashboard</Typography>
              {!isLoading ? <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Select
                  open={open}
                  onClose={handleClose}
                  onOpen={handleOpen}
                  // defaultValue={set}
                  value={set}
                  onChange={handleSelect}
                >
                  {site.map((item, i) =>
                    <MenuItem key={i} value={item.siteID}>{item.siteName}</MenuItem>
                  )}

                </Select>
              </FormControl>: '...'}
              
            </Box>
            <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 16 }}>
              <Grid item xs={4} sm={4} md={4}>
                <TodayCard set={set}/>
              </Grid>
              <Grid item xs={4} sm={4} md={4}>
                <WeekCard set={set}/>
              </Grid>
              <Grid item xs={4} sm={4} md={4}>
                <MonthCard set={set}/>
              </Grid>
              <Grid item xs={4} sm={4} md={4}>
                <YearCard set={set}/>
              </Grid>
            </Grid>
           
            <OverallCard  set={set}/>
          </TabPanel>
        </Container>

      </Box>
    </TabContext>
  )
}
