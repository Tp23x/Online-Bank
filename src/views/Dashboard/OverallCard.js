import { Card, Toolbar, Typography } from '@mui/material'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Chart from 'react-apexcharts';
import React from 'react'
import { Box } from '@mui/system';
import BottomYear from './BottomYear';
import BottomWeek from './BottomWeek';
import BottomAlltime from './BottomAlltime';


export default function OverallCard({ set }) {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Card sx={{ minWidth: 275, marginTop: '40px', marginBottom: '20px' }}>
            <TabContext value={value} >

                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}>
                    <Typography variant='h3' sx={{ fontWeight: 'bold', display: { xs: 'none', lg: 'block' } }} >Overall</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}>
                        {/* <Typography variant='h5' value='1' onClick={e => setState(e.target.value)} sx={{ margin: '20px' }}>All time</Typography>
                    <Typography variant='h5' value='2' onClick={e => setState(e.target.value)} sx={{ margin: '20px' }}>This year</Typography>
                    <Typography variant='h5' value='3' onClick={e => setState(e.target.value)} sx={{ margin: '20px' }}>This week</Typography> */}
                        <TabList onChange={handleChange}
                            variant="scrollable"
                            scrollButtons="auto">
                            <Tab label="All time" value="1" sx={{ fontSize: "24px" }} />
                            <Tab label="This year" value="2" sx={{ fontSize: "24px" }} />
                            <Tab label="This week" value="3" sx={{ fontSize: "24px" }} />
                        </TabList>
                    </Box>
                    <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '48px', fontWeight: 'bold' }}>
                            more_vert
                        </span>
                    </Box>

                </Toolbar>
                <Box sx={{ height: '500px' }}>
                    <TabPanel value="1">
                        <BottomAlltime set={set} />
                    </TabPanel>
                    <TabPanel value="2">
                        <BottomYear set={set} />
                    </TabPanel>
                    <TabPanel value="3">
                        <BottomWeek set={set} />
                    </TabPanel>
                </Box>

            </TabContext>



        </Card>
    )
}
