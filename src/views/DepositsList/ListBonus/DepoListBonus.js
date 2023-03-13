import React, { useEffect, useState, useContext } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, FormControl, MenuItem, Typography, TextField, Avatar } from '@mui/material';
import Stack from '@mui/material/Stack';
import AuthContext from '../../../context/AuthProvider';
import moment from "moment";

import bonus from '../../../assets/images/bonus.png';

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
        /* backgroundColor: '#e8eaf6', */
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


//-----------------------------------Function Routing-----------------------------------------

export default function DepoListBobus() {

    const [BonusList, setBonusList] = useState([]);
    const { DepoListBonus } = useContext(AuthContext);
    const [FilterVal, setFilterVal] = useState('');

    const { bank_ddl } = useContext(AuthContext)
    const [bank_d, setBank_D] = useState([])
    const [isLoading1, setIsLoading1] = useState(true);

    useEffect(() => {
        DepoListBonus(setBonusList)
        bank_ddl(setBank_D, setIsLoading1)
    }, [setBonusList, DepoListBonus, bank_ddl, setIsLoading1, setBank_D])

    //--------------------Search Function------------------------
    const handleFilter = (e) => {
        if (e.target.value === '') {
            window.location.reload(true)
            const tempArr = BonusList;
            setBonusList(tempArr)
        } else {
            const filterResult = BonusList.filter(item => item.tscba_username.toLowerCase().includes(e.target.value.toLowerCase())
                || item.tscba_amount.toLowerCase().includes(e.target.value.toLowerCase())
                || item.tscba_bankAccNoTo.toLowerCase().includes(e.target.value.toLowerCase())
                //|| item.tscba_datetsc.format("DD-MM-YYYY HH:mm").toLowerCase().includes(e.target.value.toLowerCase())
                // || item.tscba_docNo.toLowerCase().includes(e.target.value.toLowerCase())
                // || item.siteName.toLowerCase().includes(e.target.value.toLowerCase())
                // || item.tscba_bankAccNoFrom.toLowerCase().includes(e.target.value.toLowerCase())
                // || item.tscba_status.toLowerCase().includes(e.target.value.toLowerCase())

            )
            setBonusList(filterResult)
        }
        setFilterVal(e.target.value);
    }


    //------------------GET DROPDOWN SITE-------------------

    const { get_sites_token } = useContext(AuthContext)
    const [site, setSite] = useState([]);
    const [set, setSet] = useState();
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        get_sites_token(setSite)
    }, [setSite, get_sites_token])

    const handleSelect = (event) => {
        setSet(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    useEffect(() => {
        if (site.length !== 0 && isLoading1 === false) {
            setIsLoading(false)
            setSet(site[0].siteID)
        }
        else {
            setIsLoading(true)
        }
    }, [site, setIsLoading, setSite])


    //------------------END DROPDOWN SITE-------------------


    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ marginTop: 5 }}>
                <Box sx={{ display: 'flex', gridAutoRows: "auto", marginTop: "-40px" }}>
                    <Typography variant='h4'>รายการฝาก</Typography>
                    <Stack spacing={2} sx={{ m: 1, width: 250, marginLeft: "auto" }} size="small" >
                        <TextField size="small" label="Search" placeholder='Search...' value={FilterVal} onInput={(e) => handleFilter(e)} />
                    </Stack>
                    {!isLoading ?
                        <FormControl sx={{ m: 1, minWidth: 250, marginRight: 0 }} size="small">
                            <TextField
                                size="small"
                                select
                                label="ไซต์"
                                sx={{ width: '100%', marginBottom: '20px' }}
                                open={open}
                                onClose={handleClose}
                                onOpen={handleOpen}
                                // defaultValue={set}
                                value={set}
                                onChange={handleSelect}
                            >
                                {site.map((item) =>
                                    <MenuItem value={item.siteID}>{item.siteName}</MenuItem>
                                )}

                            </TextField>
                        </FormControl> : '...'}
                </Box>
                <Box sx={{ marginTop: "40px" }}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    {/* <TableCell>เข้าธนาคาร</TableCell> */}
                                    <StyledTableCell align="left" sx={{ fontSize: "18px" }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;เข้าธนาคาร</StyledTableCell>
                                    <StyledTableCell align="center" sx={{ fontSize: "18px" }}>วันเวลาที่ลูกค้าทำรายการ</StyledTableCell>
                                    {/*  <StyledTableCell align="center" sx={{ fontSize: "18px" }}>เลขเอกสาร</StyledTableCell> */}
                                    <StyledTableCell align="center" sx={{ fontSize: "18px" }}>ไซต์</StyledTableCell>
                                    {/* <StyledTableCell align="center" sx={{ fontSize: "18px" }}>ฝากโบนัส</StyledTableCell> */}
                                    <StyledTableCell align="center" sx={{ fontSize: "18px" }}>ยอดฝาก</StyledTableCell>
                                    <StyledTableCell align="center" sx={{ fontSize: "18px" }}>รหัสผู้ใช้งาน</StyledTableCell>
                                    <StyledTableCell align="center" sx={{ fontSize: "18px" }}>เติมโดย</StyledTableCell>
                                    <StyledTableCell align="center" sx={{ fontSize: "18px" }}>สถานะ</StyledTableCell>
                                    <StyledTableCell align="center" sx={{ fontSize: "18px" }}>หมายเหตุ</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody >
                                {BonusList.sort((a, b) => new Date(b.tscba_datetsc) - new Date(a.tscba_datetsc)).filter((item) => item.tscba_siteID === set).map((row, i) => (
                                    <StyledTableRow key={row.tscba_bankAccNoTo}>
                                        <StyledTableCell component="th" scope="row">
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <Avatar src={`${api_url}api/v1.0/bankaccount/bank-ddl/img/${bank_d.result.filter((item) => item.bankCode === row.tscba_bankCodeTo?.toUpperCase()).map((bank) => bank.bankID)[0]}`}
                                                    sx={{ marginRight: '20px', width: '26px', height: '26px' }} />
                                                {/* {console.log(bank_d.result.filter((item) => item.filename === row.tscba_bankCodeTo).map((bank) => bank.bankID)[0])} */}
                                                {row.tscba_bankAccNoTo}
                                            </Box>
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{moment(row.tscba_datetsc).format("DD-MM-YYYY HH:mm")}</StyledTableCell>
                                        {/*  <StyledTableCell align="center" >{row.tscba_docNo}</StyledTableCell> */}
                                        <StyledTableCell align="center">{row.siteName}</StyledTableCell>
                                        {/* <StyledTableCell align="center">

                                            {row.tscba_bankAccNoFrom}</StyledTableCell> */}
                                        <StyledTableCell align="center" sx={{ width: 100, color: "#19D609" }}>{parseFloat(row.tscba_amount, 10).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</StyledTableCell>
                                        <StyledTableCell align="center">{row.tscba_username}</StyledTableCell>
                                        <StyledTableCell align="center">{row.tscba_empBonus}</StyledTableCell>
                                        <StyledTableCell align="center" sx={{ color: `${row.tscba_status === 'P' ? '#FFC300' : '' || row.tscba_status === 'A' ? '#19D609' : ''}` }}>{row.tscba_status === 'P' ? 'รอดำเนินการ' : '' || row.tscba_status === 'A' ? 'เรียบร้อย' : ''}</StyledTableCell>
                                        <StyledTableCell align="center">{row.tscba_remark}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </Box>
    );
}
