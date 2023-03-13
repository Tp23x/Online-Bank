import React, { useEffect, useState, useContext } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Box, FormControl, MenuItem, Select, Typography, InputAdornment, IconButton, Grid, InputLabel, Avatar } from '@mui/material';
import Button from '@mui/material/Button';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AuthContext from '../../../context/AuthProvider';
import moment from "moment";
import api from "../../../components/api/api";

let api_url = process.env.REACT_APP_BASE_API

//-----------------------------------Function Table-----------------------------------------
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

//-----------------------------------Function Routing-----------------------------------------

export default function DepoListUnknown() {

  const navigate = useNavigate();
  const [UnknownList, setUnknownList] = useState([]);
  const { DepoListUnknown } = useContext(AuthContext);

  useEffect(() => {
    DepoListUnknown(setUnknownList)
  }, [setUnknownList, DepoListUnknown])

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [Amount, setAmount] = useState('');
  const [Account, setAccount] = useState();
  const [error, setError] = useState(false)

  function convert(str) {
    if (str !== null) {
      var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      return [date.getFullYear(), mnth, day].join("-");
    } else {
      return null
    }

  }
  //console.log("tr",convert(startDate), convert(endDate))

  //---------------- search------------------
  const { get_sites_token } = useContext(AuthContext)
  const [site, setSite] = useState([]);
  const [set, setSet] = useState();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    get_sites_token(setSite)
  }, [setSite, get_sites_token])

  /*  const handleSelect = (event) => {
     setSet(event.target.value);
   };
 
   const handleClose = () => {
     setOpen(false);
   };
 
   const handleOpen = () => {
     setOpen(true);
   }; */

  //--------------------Post Search-----------------------------
  const getapi = () => {
    if (set !== undefined) { //Amount.length !== 0 && set !== undefined
      try {
        const result = api.post("api/v1.0/deposit/manual-search", {
          "amount": Amount,
          "accountNo": Account,
          "siteID": set,
          "dateSt": convert(startDate),
          "dateEn": convert(endDate),
        })
          .then((res) => {
            setUnknownList(res.data?.result)
          })
      } catch (e) {
        console.log(e);
      }
      setError(false)
    }
    else {
      setError(true)
    }
  }
  //console.log("SiteID",getapi);
  const handleclearData = () => {
    setAccount("")
    setAmount("")
    setSet("")
    setStartDate(null)
    setEndDate(null)
  }

  //-------------------GET IMAGE-------------------------------
  const { bank_ddl } = useContext(AuthContext)
  const [bank_d, setBank_D] = useState([])
  const [isLoading1, setIsLoading1] = useState(true);

  useEffect(() => {
    bank_ddl(setBank_D, setIsLoading1)
  }, [bank_ddl, setIsLoading1, setBank_D])

  return (
    <>
      {!isLoading1 ?
        <Box sx={{ width: '100%' }}>
          <Box sx={{ marginTop: -5 }}>
            <Box sx={{ display: 'flex', gridAutoRows: "auto", alignItems: 'center', marginBottom: '24px' }}>
              <Typography variant='h4'>รายการค้นหา</Typography>
            </Box>

            <Grid container spacing={3} columns={{ xs: 4, sm: 8, md: 14 }} sx={{ marginBottom: '20px' }}>
              <Grid item xs={4} sm={4} md={6}>
                <Grid container spacing={3} columns={{ xs: 4, sm: 8, md: 6 }}>
                  <Grid item xs={4} sm={8} md={3}>
                    <FormControl sx={{ m: 1, width: '100%' }}>
                      <TextField label="ยอดฝาก"
                        //error={error}
                        // helperText={error}
                        onChange={(e) => setAmount(e.target.value)}
                        value={Amount}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment>
                              <IconButton>
                                <AttachMoneyIcon />
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={4} sm={8} md={3}>
                    <FormControl sx={{ m: 1, width: '100%' }}>
                      <TextField label="เลขบัญชีลูกค้า"
                        onChange={(e) => setAccount(e.target.value)}
                        value={Account}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment>
                              <IconButton>
                                <AccountBoxIcon />
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
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

                  <Grid item xs={4} sm={8} md={8}>
                    <FormControl sx={{ m: 1, width: '100%' }} error={error}>
                      <InputLabel id="detail" sx={{ background: '#fff' }}>ไซต์</InputLabel>
                      <Select value={set} onChange={(e) => setSet(e.target.value)}>
                        {site.map((item, i) =>
                          <MenuItem key={i} value={item.siteID}>{item.siteName}</MenuItem>
                        )}
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
                    <Button variant="contained" color="primary" sx={{ fontSize: '1.375em', width: '100%', m: 1 }} onClick={() => getapi()}>ค้นหา</Button>
                  </Grid>
                  <Grid item xs={2} sm={4} md={2}>
                    <Button variant="contained" sx={{ background: '#eb4e6e', '&:hover': { background: '#cf4964' }, fontSize: '1.375em', width: '100%', m: 1 }} onClick={() => handleclearData()}>ล้างข้อมูล</Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ marginTop: 5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <Typography variant='h4'>รายการฝาก</Typography>
            </Box>
          </Box>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="a dense table">
              <TableHead>
                <TableRow>
                  {/* <TableCell>เข้าธนาคาร</TableCell> */}
                  <StyledTableCell sx={{ fontSize: "18px" }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;เข้าธนาคาร</StyledTableCell>
                  <StyledTableCell align="center" sx={{ fontSize: "18px" }}>วันเวลาที่ลูกค้าทำรายการ</StyledTableCell>
                  {/* <StyledTableCell align="center" sx={{ fontSize: "18px" }}>เลขเอกสาร</StyledTableCell> */}
                  <StyledTableCell align="center" sx={{ fontSize: "18px" }}>ไซต์</StyledTableCell>
                  <StyledTableCell align="center" sx={{ fontSize: "18px" }}>จากบัญชี</StyledTableCell>
                  <StyledTableCell align="center" sx={{ fontSize: "18px" }}>ยอดฝาก</StyledTableCell>
                  <StyledTableCell align="center" sx={{ fontSize: "18px" }}>รหัสผู้ใช้งาน</StyledTableCell>
                  <StyledTableCell align="center" sx={{ fontSize: "18px" }}>สถานะ</StyledTableCell>
                  <StyledTableCell sx={{ fontSize: "18px" }}>แอคชั่น</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {UnknownList?.sort((a, b) => new Date(b?.tscba_datetsc) - new Date(a?.tscba_datetsc)).map((row, i) => (
                  <StyledTableRow key={i} id={row.tscba_bankAccNoTo}>
                    <StyledTableCell component="th" scope="row">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar src={`${api_url}api/v1.0/bankaccount/bank-ddl/img/${bank_d.result.filter((item) => item.bankCode === row.tscba_bankCodeTo?.toUpperCase()).map((bank) => bank.bankID)[0]}`}
                          sx={{ marginRight: '10px', width: '26px', height: '26px' }} />
                        {row.tscba_bankAccNoTo}
                      </Box>
                      {/* <Avatar src={row.img} sx={{ align: 'center', marginRight: '5px', height: 23, alignItems: 'center', width: 23, }} />
                  {row.account} */}
                    </StyledTableCell>
                    <StyledTableCell align="center">{moment(row.tscba_datetsc).format("DD-MM-YYYY HH:mm")}</StyledTableCell>
                    {/* <StyledTableCell align="center" >{row.tscba_docNo}</StyledTableCell> */}
                    <StyledTableCell align="center">{row.siteName}</StyledTableCell>
                    <StyledTableCell align="center">{row.tscba_bankAccNoFrom}</StyledTableCell>
                    <StyledTableCell align="center" sx={{ width: 100, color: "#19D609" }}>{parseFloat(row.tscba_amount, 10).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</StyledTableCell>
                    <StyledTableCell align="center">{row.tscba_username}</StyledTableCell>
                    <StyledTableCell align="center" sx={{ color: `${row.tscba_status === 'P' ? '#FFC300' : '' || row.tscba_status === 'A' ? '#19D609' : ''}` }}>{row.tscba_status === 'P' ? 'รอดำเนินการ' : '' || row.tscba_status === 'A' ? 'เรียบร้อย' : ''}</StyledTableCell>
                    <StyledTableCell align="center">
                      <Button variant="contained" onClick={() => navigate(`/DepositsList/DepoListUnknow/InformationDetail/${row.tscba_tscBankAccountID}`)} sx={{ height: "30px" }} >รายละเอียด</Button>
                      {row.action}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

        </Box>
        : '...'}
    </>
  );
}
