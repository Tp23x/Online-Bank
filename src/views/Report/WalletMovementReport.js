import React, { useContext } from 'react'
import { Table, TableHead, TableRow, TableCell, TableBody,Box,Typography, TableContainer, Button } from '@mui/material';
import AuthContext from '../../context/AuthProvider';
import GetAppIcon from '@mui/icons-material/GetApp';
import moment from "moment";



export default function WalletMovementReport({ reportName,reportWalletBankaccMovement, data }) {
   const { ReportBankaccWalleMovementFile } = useContext(AuthContext)

  return (
    <Box sx={{ display: `${(reportName === 20 && 'block') || 'none'}` }}>
      <Box sx={{ display: 'flex' }}>
        <Typography variant='h4' sx={{ marginRight: '10px' }}>รายงานการเคลื่อนไหวของวอลเล็ท</Typography>
        <Button variant="outlined" onClick={e => ReportBankaccWalleMovementFile(data)} endIcon={<GetAppIcon />}>
          Download
        </Button>
      </Box>
      <TableContainer>
        <Table sx={{ minWidth: 650, borderCollapse: 'inherit', borderSpacing: '0 20px' }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: '18px', border: 'none', padding: '0 16px' }} align="center">เวลา</TableCell>
              {/* <TableCell sx={{ fontSize: '18px', border: 'none', padding: '0 16px' }} align="center">วันที่</TableCell> */}
              <TableCell sx={{ fontSize: '18px', border: 'none', padding: '0 16px' }} align="center">ไซต์</TableCell>
              {/* <TableCell sx={{ fontSize: '18px', border: 'none', padding: '0 16px' }} align="center">เลขที่บัญชี</TableCell> */}
              <TableCell sx={{ fontSize: '18px', border: 'none', padding: '0 16px' }} align="center">username</TableCell>
              <TableCell sx={{ fontSize: '18px', border: 'none', padding: '0 16px' }} align="center">ประเภท</TableCell>
              <TableCell sx={{ fontSize: '18px', border: 'none', padding: '0 16px' }} align="center">จำนวนเงิน</TableCell>
              <TableCell sx={{ fontSize: '18px', border: 'none', padding: '0 16px' }} align="center">ยอดคงเหลือ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {reportWalletBankaccMovement.sort((a, b) => new Date(b.datetsc) - new Date(a.datetsc)).map((row, i) => ( */}
            {reportWalletBankaccMovement.map((row, i) => (
              <TableRow
                key={i}
                sx={{
                  fontSize: '18px', cursor: 'pointer', '&:hover': {
                    background: '#f7f7f7'
                  }
                }}
              >
                <TableCell component="th" scope="row" align="center" sx={{ fontSize: '18px', borderTop: '2px solid #D7D7D7', borderLeft: '2px solid #D7D7D7', borderBottom: '2px solid #D7D7D7', borderRadius: '5px 0 0 5px' }}>
                  {moment(row.datetsc).format("DD-MM-YYYY HH:mm:ss")}
                </TableCell>
                {/* <TableCell align="center" sx={{ fontSize: '18px', borderTop: '2px solid #D7D7D7', borderBottom: '2px solid #D7D7D7' }}>{row.date}</TableCell> */}
                <TableCell align="center" sx={{ fontSize: '18px', borderTop: '2px solid #D7D7D7', borderBottom: '2px solid #D7D7D7' }}>{row.siteName}</TableCell>
                {/* <TableCell align="center" sx={{ fontSize: '18px', borderTop: '2px solid #D7D7D7', borderBottom: '2px solid #D7D7D7' }}>{row.account_number}</TableCell> */}
                <TableCell align="center" sx={{ fontSize: '18px', borderTop: '2px solid #D7D7D7', borderBottom: '2px solid #D7D7D7' }}>{row.username}</TableCell>
                <TableCell align="center" sx={{ fontSize: '18px', borderTop: '2px solid #D7D7D7', borderBottom: '2px solid #D7D7D7' }}>{row.typeTranName}</TableCell>
                <TableCell align="center" sx={{ fontSize: '18px', borderTop: '2px solid #D7D7D7', borderBottom: '2px solid #D7D7D7' }}>{parseFloat(row.amount, 10).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</TableCell>
                <TableCell align="center" sx={{ fontSize: '18px', borderTop: '2px solid #D7D7D7', borderRight: '2px solid #D7D7D7', borderBottom: '2px solid #D7D7D7', borderRadius: ' 0 5px 5px 0' }}>{parseFloat(row.balance, 10).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
