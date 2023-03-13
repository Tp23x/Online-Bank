import React, { useEffect, useState, useContext } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Avatar, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../context/AuthProvider';

import Ber from '../../../assets/images/Ber.png';
import lay from '../../../assets/images/lay.png';
import tiger from '../../../assets/images/tiger.png';
import mas from '../../../assets/images/mas.png';


function createData(img, site, status) {
    return { img, site, status };
}

const rows = [
    createData(Ber, 'COM8', 'ใช้งาน'),
    createData(lay, 'COM2', 'ใช้งาน'),
    createData(tiger, 'COM5', 'ใช้งาน'),
    createData(mas, 'COM1', 'ใช้งาน')
];


export default function SiteList() {

    const [sites, setSite] = useState([])
    const navigate = useNavigate()
    const { siteList } = useContext(AuthContext)

  useEffect(() => {
    siteList(setSite)
  }, [setSite, siteList])
   /*  console.log(sites)
    useEffect(() => {
        axios.get(`${api_url}api/v1.0/site`, {
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
            setUsers(response.data.result);
        });

    }, []) */

    return (
        <Box>
            <TableContainer >
                <Table sx={{ minWidth: 650, borderCollapse: 'inherit', borderSpacing: '0 20px' }} >
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontSize: '18px', border: 'none', padding: '0 16px' }}>ชื่อไชต์</TableCell>
                            <TableCell sx={{ fontSize: '18px', border: 'none', padding: '0 16px' }} align="center">จำนวนเงิน</TableCell>
                            <TableCell sx={{ fontSize: '18px', border: 'none', padding: '0 16px' }} align="right">สถานะ&nbsp;&nbsp;&nbsp;&nbsp;</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sites.map((site, i) => (
                            <TableRow
                                key={i}
                                onClick={() => navigate(`/Settings/SiteList/Update/${site.siteID}`)}
                                sx={{
                                    fontSize: '18px', cursor: 'pointer', '&:hover': {
                                        background: '#f7f7f7'
                                    }
                                }} >
                                <TableCell component="th" scope="row" sx={{ fontSize: '18px', display: 'flex', alignItems: 'center', borderTop: '2px solid #D7D7D7', borderLeft: '2px solid #D7D7D7', borderBottom: '2px solid #D7D7D7', borderRadius: '5px 0 0 5px' }}>
                                {site.siteName} {/* <Avatar src={rows.img} sx={{ marginRight: '20px' }} /> */} 
                                </TableCell>
                                <TableCell align="center" sx={{ fontSize: '18px', borderTop: '2px solid #D7D7D7', borderBottom: '2px solid #D7D7D7' }}>{parseInt(site.confirmAmount, 10).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</TableCell>
                                <TableCell align="right" sx={{ fontSize: '18px', borderTop: '2px solid #D7D7D7', borderRight: '2px solid #D7D7D7', borderBottom: '2px solid #D7D7D7', borderRadius: '0 5px 5px 0', color: `${(site.status === true && '#27E900') || '#CACFD2'}` }}>
                                    {(site.status === true && 'ใช้งาน') || 'ปิดใช้งาน'}&nbsp;&nbsp;&nbsp;&nbsp;</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
