import React, { useState } from 'react'
import TableContainer from '@mui/material/TableContainer';
import { Box, InputAdornment, FormControl, FormControlLabel } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import UploadIcon from '@mui/icons-material/Upload';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import api from '../../../components/api/api'
// let api_url = window.REACT_APP_BASE_API || process.env.REACT_APP_BASE_API

// const api_url = process.env.REACT_APP_BASE_API
// import configData from '../../../config.json'
// const api_url = configData.REACT_APP_BASE_API

const data = [

]

export default function AddSite() {

    const navigate = useNavigate();
    const [siteName, setSiteName] = useState('')
    // const [ status, setStatus] = useState('')
    const [confirmAmount, setConfirmAmount] = useState('')

    const handleSubmit = e => {
        e.preventDefault();
        api.post(`api/v1.0/site/create`, JSON.stringify({ siteName, confirmAmount }), {
            headers: { 'Content-Type': 'application/json' }
        })
            .then((response) => response.data)
            .then((data) => {
                if (data.status === true) {
                    alert('Create Success')
                    console.log('succes')
                    navigate('/Settings/Site')
                } else {
                    console.log('failed')
                }
            });

        setSiteName('')
        setConfirmAmount('')
    }
    return (
        <Box component="form" onSubmit={handleSubmit}>
            <TableContainer >
                <Box sx={{ m: 1, display: 'flex', gridAutoRows: "auto" }}>
                    <Typography variant='h4'>เพิ่มข้อมูลไซต์</Typography>
                </Box>
                {/* <Stack spacing={2} sx={{ m: 1, width: 420, marginTop: 5 }} size="small" >
                    <Autocomplete
                        id="free-solo-demo"
                        freeSolo
                        options={data.map((option) => option.title)}
                        renderInput={(params) => <TextField {...params} label="โลโก้"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment>
                                        <IconButton>
                                            <UploadIcon />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />}
                    />
                </Stack> */}
                <Stack spacing={2} sx={{ m: 1, width: 420, marginTop: 3 }} size="small" >
                    <Autocomplete
                        id="free-solo-demo"
                        freeSolo
                        options={data.map((option) => option.title)}
                        renderInput={(params) => <TextField {...params} label="ชื่อไซต์" required value={siteName} onChange={(e) => setSiteName(e.target.value)} />}
                    />
                </Stack>
                <Stack spacing={2} sx={{ m: 1, width: 420, marginTop: 3 }} size="small" >
                    <Autocomplete
                        id="free-solo-demo"
                        freeSolo
                        options={data.map((option) => option.title)}
                        renderInput={(params) => <TextField {...params} label="จำนวนเงิน" required value={confirmAmount} onChange={(e) => setConfirmAmount(e.target.value)} />}
                    />
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ m: 1, width: 350, marginTop: 3 }}>
                    <FormControlLabel control={<Switch type="checkbox" name='status' defaultChecked  />} label="สถานะ" />
                </Stack>
            </TableContainer>

            <Box sx={{ display: 'flex', justifyContent: 'between', alignItems: 'center' }}>
                <FormControl>
                    <Button style={{ borderRadius: 4,  padding: "10px 80px", fontSize: "15px", margin: "10px", background:"#ec4e6e",'&:hover': {background:"#c93c58"}  }} variant="contained" onClick={() => navigate('/Settings/Site')}>ยกเลิก</Button>
                </FormControl>
                <FormControl>
                    <Button style={{ borderRadius: 4, backgroundColor: "#4086f5", padding: "10px 80px", fontSize: "15px", marginLeft: "8px" }} variant="contained" type='submit'>ตกลง</Button>
                </FormControl>
            </Box>
        </Box >
    );
}
