import { Box, Typography, TableContainer, Table, TableHead, TableRow, TableBody, Button, Paper } from '@mui/material'
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import BitCoinlogo from '../../../assets/images/Bitcoin.png'
import { useEffect, useState } from "react";
import moment from "moment";
import { styled } from '@mui/material/styles';
import React from 'react'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { useNavigate } from 'react-router-dom';
import api from '../../../components/api/api'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function WithdrawListCrypto() {
  const navigate = useNavigate()
  const [data, setData] = useState([]);
  // console.log(data);

  useEffect(() => {
    const getData = async () => {
      try {
        await api.get(`api/v1.0/withdraw/crypto`)
          .then((response) => {
            setData(response.data.result);
          });
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);
  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant='h4'>รายการถอน</Typography>
      <Box sx={{ marginTop: 5 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 800 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell >จากบัญชี</TableCell>
                <TableCell align="center">วันเวลาที่ลูกค้าทำรายการ</TableCell>
                {/* <TableCell align="center">เอกสาร</TableCell> */}
                <TableCell align="center">ไซต์&nbsp;</TableCell>
                <TableCell align="center">ยอดถอน&nbsp;</TableCell>
                <TableCell align="center">รหัสผู้ใช้งาน&nbsp;</TableCell>
                <TableCell align="center">สถานะ&nbsp;</TableCell>
                <TableCell align="center">แอคชั่น&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.sort((a, b) => new Date(b.tscba_datetsc) - new Date(a.tscba_datetsc)).map((row, i) => (
                <StyledTableRow key={i}>
                  <StyledTableCell component="th" scope="row">
                    <Box sx={{ display: 'flex', alignItems: 'center'}}>
                      <Box component="img" sx={{ marginRight: "10px", width: '24px', height: '24px' }} src={BitCoinlogo}>

                      </Box>
                      {row.tscba_bankAccNoTo}
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell align="center">{moment(row.tscba_datetsc).format("DD-MM-YYYY HH:mm")}</StyledTableCell>
                  {/* <StyledTableCell align="center">{row.tscba_remark}</StyledTableCell> */}
                  <StyledTableCell align="center">{row.siteName}</StyledTableCell>
                  <StyledTableCell align="center" sx={{ color: 'red' }}>{parseFloat(Math.abs(row.tscba_amount, 10)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</StyledTableCell>
                  <StyledTableCell align="center">{row.tscba_username}</StyledTableCell>
                  <StyledTableCell align="center" sx={{ color: `${row.tscba_status === 'A' ? '#27E900' : '#e60000'}` }}>{row.tscba_status === "A" ? "อนุมัติ" : "รออนุมัติ"}</StyledTableCell>
                  <StyledTableCell align="center">
                    <Button variant="contained" onClick={() => navigate(`/WithdawList/ListCrypto/Detail/${row.tscba_tscBankAccountID}`)} sx={{ height: "30px" }} >รายละเอียด</Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      </Box>
    </Box>
  )
}
