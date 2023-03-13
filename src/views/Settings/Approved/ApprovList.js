import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Avatar, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

import Ber from '../../../assets/images/Ber.png';
import lay from '../../../assets/images/lay.png';
import tiger from '../../../assets/images/tiger.png';
import mas from '../../../assets/images/mas.png';

import api from '../../../components/api/api'
// import configData from '../../../config.json'
// const api_url = configData.REACT_APP_BASE_API
// let api_url = window.REACT_APP_BASE_API || process.env.REACT_APP_BASE_API

function createData(img, site, status) {
    return { img, site, status };
}

const rows = [
    createData(Ber, 'COM8', 'ใช้งาน'),
    createData(lay, 'COM2', 'ใช้งาน'),
    createData(tiger, 'COM5', 'ใช้งาน'),
    createData(mas, 'COM1', 'ใช้งาน')
];


export default function ApprovList() {
    const [rows, setRows] = useState([])
    const [sites, setUsers] = useState([])
    
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate()
    // console.log(sites)
    
    useEffect(() => {
        api.get(`api/v1.0/confirm`, {
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
            setUsers(response.data.result);
            setIsLoading(false)

        });



    }, [])

    return (<>{!isLoading ?
        
            
                <Box>
                    <Box sx={{ display: 'flex', gridAutoRows: "auto" }}>
                        <Typography variant='h4'>รายการข้อมูลยอดเงินอนุมัติ</Typography>
                    </Box>
                    <TableContainer >
                        <Table sx={{ minWidth: 650, borderCollapse: 'inherit', borderSpacing: '0 20px' }} >
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontSize: '18px', border: 'none', padding: '0 16px', width: '400px' }} align="left">ชื่อไชต์</TableCell>
                                    <TableCell sx={{ fontSize: '18px', border: 'none', padding: '0 16px', width: '400px' }} align="right">ยอดเงินอนุมัติ</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sites.map((site, i) => (
                                    <TableRow
                                        key={i}
                                        onClick={() => navigate(`/Settings/ApprovList/Add/${site.siteID}`)}
                                        sx={{
                                            cursor: 'pointer', '&:hover': {
                                                background: '#f7f7f7'
                                            }
                                        }} >
                                        <TableCell align="left" sx={{ fontSize: '18px', borderTop: '2px solid #D7D7D7', borderBottom: '2px solid #D7D7D7',borderLeft:'2px solid #D7D7D7', borderRadius: '5px 0 0 5px'}}>{site.siteName}</TableCell>
                                        <TableCell align="right" sx={{ fontSize: '18px', borderTop: '2px solid #D7D7D7', borderRight: '2px solid #D7D7D7', borderBottom: '2px solid #D7D7D7', borderRadius: '0 5px 5px 0' ,}}>{site.confirmAmount}
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            :''}</>

    )
}
