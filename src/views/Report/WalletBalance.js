import React, { useContext } from 'react'
import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Box, Typography, Button } from '@mui/material';
import AuthContext from '../../context/AuthProvider';
import GetAppIcon from '@mui/icons-material/GetApp';

export default function WalletBalance({ reportName, reportWalletBankacc, data }) {
  
  const { ReportBankaccWalleFile} = useContext(AuthContext)

  return (
    <Box sx={{display: `${(reportName === 40 && 'block') || 'none'}`}}>
    <Box sx={{ display: 'flex' }}>
        <Typography variant='h4' sx={{ marginRight: '10px' }}>รายงานยอดคงเหลือวอลเล็ท</Typography>
        <Button variant="outlined" onClick={e => ReportBankaccWalleFile(data)} endIcon={<GetAppIcon />}>
            Download
        </Button>
    </Box>
    <TableContainer>
      <Table sx={{ minWidth: 650, borderCollapse: 'inherit', borderSpacing: '0 20px' }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontSize: '18px', border: 'none', padding: '0 16px' }} align="center">ไซต์</TableCell>
            <TableCell sx={{ fontSize: '18px', border: 'none', padding: '0 16px' }} align="center">username</TableCell>
            <TableCell sx={{ fontSize: '18px', border: 'none', padding: '0 16px' }} align="center">จำนวนเงิน</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reportWalletBankacc.map((row) => (
            <TableRow
              key={row.walletID}
              sx={{
                fontSize: '18px', cursor: 'pointer', '&:hover': {
                  background: '#f7f7f7'
                }
              }}
            >
              <TableCell component="th" scope="row" align="center" sx={{ fontSize: '18px', borderTop: '2px solid #D7D7D7', borderLeft: '2px solid #D7D7D7', borderBottom: '2px solid #D7D7D7', borderRadius: '5px 0 0 5px' }}>
                {row.site?.siteName}
              </TableCell>
              <TableCell align="center" sx={{ fontSize: '18px', borderTop: '2px solid #D7D7D7', borderBottom: '2px solid #D7D7D7' }}>{row.walletName}</TableCell>
              <TableCell align="center" sx={{ fontSize: '18px', borderTop: '2px solid #D7D7D7', borderRight: '2px solid #D7D7D7', borderBottom: '2px solid #D7D7D7', borderRadius: ' 0 5px 5px 0' }}>{parseFloat(row.balance, 10).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  )
}
