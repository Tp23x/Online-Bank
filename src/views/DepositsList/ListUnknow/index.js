import React from 'react'
/* import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete'; */
import { Box, FormControl, MenuItem, Select, Typography, InputAdornment, IconButton, Grid } from '@mui/material';
/* import Button from '@mui/material/Button';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DateRangeIcon from '@mui/icons-material/DateRange'; */

import DepoListUnknow from './DepoListUnknow'

export default function ListUnknow() {

    /* const [site, setSite] = React.useState();
    const [open, setOpen] = React.useState(false);
    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);

    const handleSelect = (event) => {
        setSite(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };
    const [site2, setSite2] = React.useState();
    const [open2, setOpen2] = React.useState(false);

    const handleSelect2 = (event) => {
        setSite2(event.target.value);
    };

    const handleClose2 = () => {
        setOpen2(false);
    };

    const handleOpen2 = () => {
        setOpen2(true);
    };
    const amount = [
        { title: '500.00 ฿' },
        { title: '1000.00 ฿' },
    ];
    const accountNum = [
        { title: 'XX3948239' },
        { title: 'XX3948239' },
    ];
 */

    return (
        <Box sx={{ width: '100%' }}>
            {/* <Box sx={{ display: 'flex', gridAutoRows: "auto", alignItems: 'center', marginBottom: '24px' }}>
                <Typography variant='h4'>รายการค้นหา</Typography>
            </Box>

            <Grid container spacing={3} columns={{ xs: 4, sm: 8, md: 14 }} sx={{ marginBottom: '20px' }}>
                <Grid item xs={4} sm={4} md={6}>
                    <Grid container spacing={3} columns={{ xs: 4, sm: 8, md: 6 }}>
                        <Grid item xs={4} sm={8} md={3}>
                            <FormControl sx={{ m: 1, width: '100%' }}>
                                <Autocomplete
                                    id="free-solo-demo"
                                    freeSolo
                                    options={amount.map((option) => option.title)}
                                    renderInput={(params) => <TextField {...params} label="ยอดฝาก"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment>
                                                    <IconButton>
                                                        <AttachMoneyIcon />
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={4} sm={8} md={3}>
                            <FormControl sx={{ m: 1, width: '100%' }}>
                                <Autocomplete
                                    id="free-solo-demo"
                                    freeSolo
                                    options={accountNum.map((option) => option.title)}
                                    renderInput={(params) => <TextField {...params} label="เลขบัญชีลูกค้า"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment>
                                                    <IconButton>
                                                        <AccountBoxIcon />
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />}
                                />
                            </FormControl>
                        </Grid>


                    </Grid>
                    <Stack sx={{ width: '100%' }}>
                        <DesktopDatePicker
                            label="วันที่เริ่มต้น"
                            value={startDate}
                            onChange={(newStartDate) => {
                                setStartDate(newStartDate);
                            }}
                            renderInput={(params) => <TextField {...params} sx={{ m: 1, width: '100%' }} />}
                        />
                    </Stack>
                </Grid>
                <Grid item xs={4} sm={4} md={6}>
                    <Grid container spacing={3} columns={{ xs: 4, sm: 8, md: 6 }}>
                        <Grid item xs={4} sm={8} md={3}>
                            <FormControl sx={{ m: 1, width: '100%' }}>
                                <Select
                                    open={open}
                                    onClose={handleClose}
                                    onOpen={handleOpen}
                                    defaultValue={1}
                                    value={site}
                                    onChange={handleSelect}
                                >
                                    <MenuItem value={1}>ค้นหาทุกบัญชีในระบบ</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4} sm={8} md={3}>
                            <FormControl sx={{ m: 1, width: '100%' }}>
                                <Select
                                    open={open2}
                                    onClose={handleClose2}
                                    onOpen={handleOpen2}
                                    defaultValue={2}
                                    value={site2}
                                    onChange={handleSelect2}
                                >
                                    <MenuItem value={2}>ไซต์</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                    </Grid>
                    <Stack sx={{ width: '100%' }}>
                        <DesktopDatePicker
                            label="วันที่สิ้นสุด"
                            value={endDate}
                            onChange={(newEndDate) => {
                                setEndDate(newEndDate);
                            }}
                            renderInput={(params) => <TextField {...params} sx={{ m: 1, width: '100%' }} />}
                        />
                    </Stack>
                </Grid>
                <Grid item xs={4} sm={4} md={2}>

                    <Grid container spacing={1} columns={{ xs: 4, sm: 8, md: 2 }}>
                        <Grid item xs={2} sm={4} md={2}>
                            <Button variant="contained" color="primary" sx={{ fontSize: '1.375em', width: '100%', m: 1 }}>ค้นหา</Button>
                        </Grid>
                        <Grid item xs={2} sm={4} md={2}>
                            <Button variant="contained" sx={{ background: '#eb4e6e', '&:hover': { background: '#cf4964' }, fontSize: '1.375em', width: '100%', m: 1 }}>ล้างข้อมูล</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <Typography variant='h4'>รายการฝาก</Typography>
            </Box> */}
            <Box sx={{ marginTop: 5 }}>
                <DepoListUnknow />
            </Box>
        </Box>
    )
}
