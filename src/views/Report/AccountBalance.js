import React, { useContext } from 'react'
import { Table, TableHead, TableRow, TableCell, TableBody, Box, Typography, Button, TableContainer } from '@mui/material';
import AuthContext from '../../context/AuthProvider';
import GetAppIcon from '@mui/icons-material/GetApp';


export default function AccountBalance({ reportName, reportBankacc, data }) {

    const { ReportBankaccFile } = useContext(AuthContext)

    
    return (
        <Box sx={{display: `${(reportName === 30 && 'block') || 'none'}`}}>
            <Box sx={{ display: 'flex' }}>
                <Typography variant='h4' sx={{ marginRight: '10px' }}>รายงานบัญชียอดคงเหลือ</Typography>
                <Button variant="outlined" onClick={e => ReportBankaccFile(data)} endIcon={<GetAppIcon />}>
                    Download
                </Button>
            </Box>
            <TableContainer>
            <Table sx={{ minWidth: 650, borderCollapse: 'inherit', borderSpacing: '0 20px' }}>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontSize: '18px', border: 'none', padding: '0 16px' }} align="center">ไซต์</TableCell>
                        <TableCell sx={{ fontSize: '18px', border: 'none', padding: '0 16px' }} align="center">เลขที่บัญชี</TableCell>
                        <TableCell sx={{ fontSize: '18px', border: 'none', padding: '0 16px' }} align="center">จำนวนเงิน</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {reportBankacc.map((row) => (
                        <TableRow
                            key={row.bankAccID}
                            sx={{
                                fontSize: '18px', cursor: 'pointer', '&:hover': {
                                    background: '#f7f7f7'
                                }
                            }}
                        >
                            <TableCell component="th" scope="row" align="center" sx={{ fontSize: '18px', borderTop: '2px solid #D7D7D7', borderLeft: '2px solid #D7D7D7', borderBottom: '2px solid #D7D7D7', borderRadius: '5px 0 0 5px' }}>
                                {row.site?.siteName}
                            </TableCell>
                            <TableCell align="center" sx={{ fontSize: '18px', borderTop: '2px solid #D7D7D7', borderBottom: '2px solid #D7D7D7' }}>{row.bankAccNo}</TableCell>
                            <TableCell align="center" sx={{ fontSize: '18px', borderTop: '2px solid #D7D7D7', borderRight: '2px solid #D7D7D7', borderBottom: '2px solid #D7D7D7', borderRadius: ' 0 5px 5px 0' }}>{parseFloat(row.balance, 10).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </TableContainer>

        </Box>

    )
}
