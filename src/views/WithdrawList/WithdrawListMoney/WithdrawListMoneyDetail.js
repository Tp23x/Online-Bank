import { Box, Typography, TableContainer, Table, TableHead, TableRow, TableCell, Divider, Button, Avatar, TableBody, FormControl, Select, MenuItem } from '@mui/material'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from "react";
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import moment from "moment";
import api from '../../../components/api/api'
import AuthContext from '../../../context/AuthProvider';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
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
export default function WithdrawListMoneyDetail() {
    const navigate = useNavigate()
    const [detail, setDetail] = useState();
    const { tscba_tscBankAccountID } = useParams()
    const [isLoading, setIsLoading] = useState(true);
    const [isLoading4, setIsLoading4] = useState(true);
    const [isLoading2, setIsLoading2] = useState(true);
    const [dataAccount, setdataAccount] = useState([]);
    const [Account, setAccount] = useState("");
    // console.log(detail);
    // console.log(detail);

    useEffect(() => {
        api.get(`api/v1.0/withdraw/detail/${tscba_tscBankAccountID}`)
            .then((response) => response.data)
            .then((data) => {
                if (data.status === true) {
                    setDetail(data.result[0])
                    setIsLoading4(false)

                } else {
                    console.log('failed')
                }
            });
    }, [tscba_tscBankAccountID, setDetail]);


    // console.log(detail)
    //-------------------GET ACCOUNT-----------------
    useEffect(() => {
        api.get(`api/v1.0/withdraw/account`)
            .then((response) => response.data)
            .then((data) => {
                if (data.status === true) {
                    //console.log('get succes')
                    setdataAccount(data.result)
                    setIsLoading2(false)

                } else {
                    console.log('failed')
                }
            });
    }, []);
    //console.log("AAAAAa", dataAccount);
    //---------------------Update-----------------------
    const Handlesubmit = (e) => {
        api.put(`api/v1.0/withdraw/detail/${tscba_tscBankAccountID}`,
            { "bankAccNoTo": `${Account}` })
            .then((response) => response.data)
            .then((data) => {
                if (data.status === true) {
                    console.log('Succes')
                    alert('บันทึกข้อมูลเรียบร้อย')
                    window.location.href = '/WithdawList/ListMoney'

                } else {
                    console.log('Failed')
                }
            });
    }
    console.log("sUBMIT", Account);


    //-------------------GET IMAGE-------------------------------
    const { bank_ddl } = useContext(AuthContext)
    const [bank_d, setBank_D] = useState([])
    const [isLoading1, setIsLoading1] = useState(true);

    useEffect(() => {
        bank_ddl(setBank_D, setIsLoading1)
    }, [bank_ddl, setIsLoading1, setBank_D])

    useEffect(() => {
        if (isLoading4 === false && isLoading2 === false && isLoading1 === false) {
            setIsLoading(false)
            setAccount(dataAccount.filter((item) => item.mba_siteID === detail.tscba_siteID).map((data) => data.mba_bankAccNo)[0])
        }
        else {
            setIsLoading(true)
        }
    }, [isLoading4, isLoading2, dataAccount, setIsLoading, setAccount])

    return (<>
        {!isLoading ?
            <Box sx={{ width: '100%' }}>
                <Typography variant='h4'>รายการถอน</Typography>
                <Box sx={{ marginTop: 5 }}>
                    <TableContainer>
                        <Table sx={{ minWidth: 800 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">วัน/เวลา แจ้งถอน</TableCell>
                                    <TableCell align="left">จำนวน</TableCell>
                                    <TableCell align="center">เข้าธนาคาร</TableCell>
                                    <TableCell align="right">เลขบัญชี</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                <StyledTableRow>
                                    <StyledTableCell align="left">{moment(detail.tscba_datetsc).format("DD-MM-YYYY HH:mm")}</StyledTableCell>
                                    <StyledTableCell align="left">{parseFloat(Math.abs(detail.tscba_amount, 10)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Box sx={{ alignItems: 'center', display: 'flex', height: "100%", justifyContent: "center" }}>
                                            <Avatar src={`${api_url}api/v1.0/bankaccount/bank-ddl/img/${bank_d.result.filter((item) => item.bankCode === detail.tscba_bankCodeFrom?.toUpperCase()).map((bank) => bank.bankID)[0]}`}
                                                sx={{ marginRight: '8px', width: '26px', height: '26px' }} />{detail.tscba_bankCodeFrom} </Box></StyledTableCell>
                                    <StyledTableCell align="right">{detail.tscba_bankAccNoFrom}</StyledTableCell>

                                </StyledTableRow>

                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Box sx={{ margin: "90px 0px 30px", maxWidth: '700px', }}>
                        <Typography variant='h4' sx={{ marginBottom: '25px', fontWeight: "500" }}>บันทึกการถอนเงิน บัญชีธนาคาร </Typography>
                        <div>
                            <h4>จากบัญชีธนาคาร</h4>
                            <FormControl sx={{ width: '100%', paddingTop: "15px" }}>
                                {detail.tscba_status === "P" ?
                                    <Select value={Account} onChange={(e) => setAccount(e.target.value)}>
                                        {dataAccount.filter((item) => item.mba_siteID === detail.tscba_siteID).map((item) =>
                                            <MenuItem value={item.mba_bankAccNo}>บัญชีถอน {item.siteName} : {item.mba_bankAccName} : บัญชีออก {item.mba_bankAccNo}</MenuItem>
                                        )}
                                    </Select>
                                    :
                                    <Box>
                                        {dataAccount.filter((item) => item.mba_bankAccNo === detail.tscba_bankAccNoTo).map((item) =>
                                            <Box sx={{ fontSize: "20px", color: "#273746" }}>&nbsp;&nbsp;&nbsp;&nbsp;บัญชีถอน {item.siteName} : {item.mba_bankAccName} : บัญชีออก {item.mba_bankAccNo}</Box>
                                        )}
                                    </Box>
                                }
                            </FormControl>
                        </div>
                        <Box sx={{ paddingTop: "8px" }}>
                            <h2>ข้อมูลยอดเงิน</h2>
                            {detail.tscba_status === "P" ?
                                <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', width: "100%" }}>  <Typography>ยอดแจ้งถอน</Typography> <Typography sx={{
                                        fontSize: '25px', fontWeight: '500', color: "#535252"
                                    }}>{parseFloat(Math.abs(detail.tscba_amount, 10)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Typography></Box>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', width: "100%", alignItems: "left" }}>
                                        <Typography>ยอดเงินในบัญชี</Typography>
                                        <Typography sx={{
                                            fontSize: '25px', fontWeight: '500', color: "#138D75"
                                        }}>{dataAccount.filter((item) => item.mba_bankAccNo === Account).map((data) => parseFloat(data.mba_balance, 10).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'))}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', width: "100%", alignItems: "left" }}><Typography>ยอดเงินคงเหลือ</Typography>
                                        <Typography sx={{ fontSize: '25px', fontWeight: '500', color: "#535252" }}>
                                            {dataAccount.filter((item) => item.mba_bankAccNo === Account).map((data) =>
                                                parseFloat((data.mba_balance - Math.abs(detail.tscba_amount)), 10).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'))}
                                        </Typography>
                                    </Box>
                                </Box>
                                :
                                <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', width: "100%" }}>  <Typography>ยอดแจ้งถอน</Typography> <Typography sx={{
                                        fontSize: '25px', fontWeight: '500', color: "#535252"
                                    }}>{parseFloat(Math.abs(detail.tscba_amount, 10)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Typography></Box>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', width: "100%", alignItems: "left" }}>
                                        {/* <Typography>ยอดเงินในบัญชี</Typography>
                                        <Typography sx={{
                                            fontSize: '25px', fontWeight: '500', color: "#138D75"
                                        }}>{dataAccount.filter((item) => item.mba_bankAccNo === detail.tscba_bankAccNoTo).map((data) => parseInt(data.mba_balance, 10).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'))}
                                        </Typography> */}
                                    </Box>

                                    {/* <Box sx={{ display: 'flex', flexDirection: 'column', width: "100%", alignItems: "left" }}><Typography>ยอดเงินคงเหลือ</Typography>
                                        <Typography sx={{
                                            fontSize: '25px', fontWeight: '500', color: "#138D75"
                                        }}>{dataAccount.filter((item) => item.mba_bankAccNo === detail.tscba_bankAccNoTo).map((data) => parseInt(data.mba_balance, 10).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'))}
                                        </Typography>
                                    </Box> */}
                                </Box>
                            }
                            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', marginTop: "30px" }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', width: "100%" }}>  <Typography>ไปบัญชีที่สมาชิก</Typography>
                                    <Box sx={{ alignItems: 'center', display: 'flex', height: "100%" }}>
                                        <Avatar src={`${api_url}api/v1.0/bankaccount/bank-ddl/img/${bank_d.result.filter((item) => item.bankCode === detail.tscba_bankCodeFrom?.toUpperCase()).map((bank) => bank.bankID)[0]}`}
                                            sx={{ marginRight: '10px', width: '26px', height: '26px' }} />
                                        <Typography sx={{ fontSize: '17px', color: "#535252", }}>{detail.tscba_bankCodeFrom}</Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', width: "100%", alignItems: "left" }}>
                                    <Typography>เลขที่บัญชี</Typography>
                                    <Typography sx={{
                                        fontSize: '25px', fontWeight: '500',
                                    }}>{detail.tscba_bankAccNoFrom}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', width: "100%", alignItems: "left" }}>
                                    <Typography>ชื่อ</Typography>
                                    <Typography
                                        sx={{ fontSize: '25px', fontWeight: '500' }}>
                                        {detail.tscba_username}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Divider />
                    {
                        parseFloat(Math.abs(detail.tscba_amount, 10)) > dataAccount.filter((item) => item.mba_bankAccNo === Account).map((data) => parseFloat(data.mba_balance, 10))[0] !== true
                            ? '' :
                            <Box sx={{ display: detail.tscba_status === "A" ? 'none' : 'block' }}>
                                <Alert severity="error" >
                                    <AlertTitle>ยอดเงินในบัญชีคงเหลือไม่เพียงพอ</AlertTitle>
                                </Alert>
                            </Box>
                    }
                    {/*  {console.log("UUUUU", parseInt(detail.tscba_amount, 10) > dataAccount.filter((item) => item.mba_bankAccNo === Account).map((data) => parseInt(data.mba_balance, 10))[0])}
                    {console.log("UUUUU", parseInt(detail.tscba_amount, 10) , dataAccount.filter((item) => item.mba_bankAccNo === Account).map((data) => parseInt(data.mba_balance, 10))[0])} */}

                    <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: "20px" }}>
                        <Typography sx={{}}>ยอดแจ้งถอน</Typography>
                        <Typography sx={{
                            fontSize: '25px', fontWeight: '500', color: "#ef2851", marginBottom: "20px"
                        }}>{parseFloat(Math.abs(detail.tscba_amount, 10)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Typography>
                    </Box>
                    <Divider />
                    <Box sx={{ display: 'flex', justifyContent: 'center', width: "100%", }}>
                        <Button onClick={() => navigate('/WithdawList/ListMoney')} sx={{ marginRight: "20px", backgroundColor: "#eb4e6e", '&:hover': { background: '#ef2851' }, color: "#FFF", padding: "7px 55px", marginTop: "23px" }}>กลับ</Button>
                        {
                            parseFloat(Math.abs(detail.tscba_amount, 10)) <= dataAccount.filter((item) => item.mba_bankAccNo === Account).map((data) => parseFloat(data.mba_balance, 10))[0] !== true
                                ? '' :
                                <Button onClick={Handlesubmit} sx={{ backgroundColor: "#30e76a", '&:hover': { background: '#1fc64c' }, color: "#FFFF", padding: "7px 55px", marginTop: "23px", display: detail.tscba_status === "A" ? 'none' : 'block' }} >ตกลง</Button>
                        }
                        {/*   <Button onClick={Handlesubmit} sx={{ backgroundColor: "#30e76a", '&:hover': { background: '#1fc64c' }, color: "#FFFF", padding: "7px 55px", marginTop: "23px", display: detail.tscba_status === "A" ? 'none' : 'block' }} >ตกลง</Button> */}
                    </Box>
                </Box>
            </Box>
            : ''}
    </>
    )
}
