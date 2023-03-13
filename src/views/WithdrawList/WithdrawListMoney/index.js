import { Box, Typography, TableContainer, Table, TableHead, TableRow, TableBody, Button, Paper, Avatar } from '@mui/material'
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { useEffect, useState, useContext} from "react";
import { styled } from '@mui/material/styles';
import React from 'react'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import api from '../../../components/api/api'
import AuthContext from '../../../context/AuthProvider';
let api_url = process.env.REACT_APP_BASE_API

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


export default function WithdrawListMoney() {
  const navigate = useNavigate()
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        await api.get(`api/v1.0/withdraw`)
          .then((response) => {
            setData(response.data.result);
          });

      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  //-------------------GET IMAGE-------------------------------
  const { bank_ddl } = useContext(AuthContext)
  const [bank_d, setBank_D] = useState([])
  const [isLoading1, setIsLoading1] = useState(true); 

  useEffect(() => {
    bank_ddl(setBank_D, setIsLoading1)
  }, [bank_ddl, setIsLoading1, setBank_D])

  return ( 
  <>{!isLoading1 ?
    <Box sx={{ width: '100%' }}>
      <Typography variant='h4'>รายการถอน</Typography>
      <Box sx={{ marginTop: 5 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 800 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>จากบัญชี</TableCell>
                <TableCell align="center">จากบัญชี</TableCell>
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
              {data.sort((a, b) => new Date(b.tscba_datetsc) - new Date(a.tscba_datetsc)).map((row,i) => (
                <StyledTableRow key={i}>

                    <StyledTableCell component="th" scope="row"
                      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar src={`${api_url}api/v1.0/bankaccount/bank-ddl/img/${bank_d.result.filter((item) => item.bankCode === row.tscba_bankCodeTo?.toUpperCase()).map((bank) => bank.bankID)[0]}`}
                          sx={{ marginRight: '10px', width: '26px', height: '26px' }} />
                        {row.tscba_bankAccNoTo}

                      </Box>
                      <ArrowRightAltIcon sx={{ color: 'green', fontSize: "35px", marginRight: "1px" }}></ArrowRightAltIcon>
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.tscba_bankAccNoFrom}</StyledTableCell>
                    <StyledTableCell align="center">{moment(row.tscba_datetsc).format("DD-MM-YYYY HH:mm")}</StyledTableCell>
                    {/*  <StyledTableCell align="center">{row.tscba_remark}</StyledTableCell> */}
                    <StyledTableCell align="center">{row.siteName}</StyledTableCell>
                    <StyledTableCell align="center" sx={{ color: 'red' }}>{parseFloat(Math.abs(row.tscba_amount, 10)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</StyledTableCell>
                    <StyledTableCell align="center">{row.tscba_username}</StyledTableCell>
                    <StyledTableCell align="center" sx={{ color: `${row.tscba_status === 'P' ? '#e60000' : '' || row.tscba_status === 'A' ? '#19D609' : ''}` }}>{row.tscba_status === 'P' ? 'รออนุมัติ' : '' || row.tscba_status === 'A' ? 'อนุมัติ' : ''}</StyledTableCell>
                    <StyledTableCell align="center"><Button variant="contained" size="small" onClick={() => navigate(`/WithdawList/ListMoney/Detail/${row.tscba_tscBankAccountID}`)}>รายละเอียด</Button></StyledTableCell>

                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box >
      : '...'}</>
  )
}
