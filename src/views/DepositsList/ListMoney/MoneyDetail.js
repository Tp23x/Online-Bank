import React, { useEffect, useState, useContext } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Avatar, Box, Button, FormControl } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import api from '../../../components/api/api'
import moment from "moment";
import AuthContext from '../../../context/AuthProvider';

let api_url = process.env.REACT_APP_BASE_API

export default function MoneyDetail() {

    const navigate = useNavigate();
    const [detail, setDetail] = useState();
    const { tscba_tscBankAccountID } = useParams()
    const [isLoading, setIsLoading] = useState(true);

    const { bank_ddl } = useContext(AuthContext)
    const [bank_d, setBank_D] = useState([])
    const [isLoading1, setIsLoading1] = useState(true); 
    const [isLoading2, setIsLoading2] = useState(true);
       
    useEffect(() => {
        bank_ddl(setBank_D, setIsLoading1)
    }, [bank_ddl, setIsLoading1, setBank_D])

    useEffect(() => {
    api.get(`api/v1.0/deposit/detail/${tscba_tscBankAccountID}`)
            .then((response) => response.data)
            .then((data) => {
                if (data.status === true) {
                    setDetail(data.result[0])
                    setIsLoading2(false)

                } else {
                    console.log('failed')
                }
            });
    }, []);

    useEffect(() => {
        if (isLoading1 === false && isLoading2 === false ) {
            setIsLoading(false)
        } else {
            setIsLoading(true)
        }
    }, [ setIsLoading, isLoading1, isLoading2])

    return (
        <>
         {!isLoading ?
            <Box>
                <TableContainer >
                    <Box sx={{ m: 1, display: 'flex', gridAutoRows: "auto" }}>
                        <Typography variant='h4'>ข้อมูลแจ้งฝาก</Typography>
                    </Box>

                    <Table sx={{ minWidth: 650 }} >
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: '#535252' }}>วัน/เวลา โอน</TableCell>
                                <TableCell align="center" sx={{ color: '#535252' }}>จำนวน</TableCell>
                                <TableCell align="center" sx={{ color: '#535252' }}>ช่องทาง</TableCell>
                                <TableCell align="center" sx={{ color: '#535252' }}>จากธนาคาร</TableCell>
                                <TableCell align="center" sx={{ color: '#535252' }}>เลขบัญชี</TableCell>
                                <TableCell align="center" sx={{ color: '#535252' }}>เข้าธนาคาร</TableCell>
                                <TableCell align="center" sx={{ color: '#535252' }}>เลขบัญชี</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell component="th" scope="row" sx={{ alignItems: 'center' }}>
                                    {moment(detail.datetsc).format("DD-MM-YYYY HH:mm")}
                                </TableCell>
                                <TableCell align="center">{parseFloat(detail.amount, 10).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</TableCell>
                                <TableCell align="center">{detail.remark? detail.remark :"-"}</TableCell>
                                <TableCell align="center">
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Avatar src={`${api_url}api/v1.0/bankaccount/bank-ddl/img/${bank_d.result.filter((item) => item.bankCode === detail.bankCodeFrom.toUpperCase()).map((bank) => bank.bankID)[0]}`} 
                                        sx={{ marginRight: '10px', width: '26px', height: '26px' }} />
                                        {detail.bankCodeFrom}
                                    </Box>
                                </TableCell>
                                <TableCell align="center">{detail.bankAccNoFrom}</TableCell>
                                <TableCell align="center">
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Avatar src={`${api_url}api/v1.0/bankaccount/bank-ddl/img/${bank_d.result.filter((item) => item.bankCode === detail.bankCodeTo.toUpperCase()).map((bank) => bank.bankID)[0]}`} 
                                        sx={{ marginRight: '10px', width: '26px', height: '26px' }} />
                                        {detail.bankCodeTo}
                                    </Box>
                                </TableCell>
                                <TableCell align="center">{detail.bankAccNoTo}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

                <TableContainer >
                    <Box sx={{ m: 1, display: 'flex', gridAutoRows: "auto", marginTop: '80px' }}>
                        <Typography variant='h4'>รายการเงินฝากธนาคาร</Typography>
                    </Box>

                    <Table sx={{ minWidth: 650 }} >
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: '#535252' }}>วัน/เวลา โอน</TableCell>
                                <TableCell align="center" sx={{ color: '#535252' }}>จำนวน</TableCell>
                                <TableCell align="center" sx={{ color: '#535252' }}>ช่องทาง</TableCell>
                                <TableCell align="center" sx={{ color: '#535252' }}>จากธนาคาร</TableCell>
                                <TableCell align="center" sx={{ color: '#535252' }}>เลขบัญชี</TableCell>
                                <TableCell align="center" sx={{ color: '#535252' }}>เข้าธนาคาร</TableCell>
                                <TableCell align="center" sx={{ color: '#535252' }}>เลขบัญชี</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow
                                sx={{
                                    cursor: 'pointer', '&:hover': {
                                        background: '#f7f7f7'
                                    }
                                }} >
                                <TableCell component="th" scope="row" sx={{ borderBottom: '2px solid #fff' }}>
                                    {moment(detail.message.datesms).format("DD-MM-YYYY HH:mm")}
                                </TableCell>
                                <TableCell align="center" sx={{ borderBottom: '2px solid #fff' }}>{parseFloat(detail.message.amount, 10).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</TableCell>
                                <TableCell align="center" sx={{ marginRight: '100px', borderBottom: '2px solid #fff' }}>{detail.message.channel}</TableCell>
                                <TableCell align="center" sx={{ borderBottom: '2px solid #fff' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Avatar src={`${api_url}api/v1.0/bankaccount/bank-ddl/img/${bank_d.result.filter((item) => item.bankCode === detail.bankCodeFrom.toUpperCase()).map((bank) => bank.bankID)[0]}`} 
                                        sx={{ marginRight: '10px', width: '26px', height: '26px' }} />
                                        {detail.bankCodeFrom}
                                    </Box>
                                </TableCell>
                                <TableCell align="center" sx={{ borderBottom: '2px solid #fff' }}>{detail.bankAccNoFrom}</TableCell>
                                <TableCell align="center" sx={{ borderBottom: '2px solid #fff' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Avatar src={`${api_url}api/v1.0/bankaccount/bank-ddl/img/${bank_d.result.filter((item) => item.bankCode === detail.bankCodeTo.toUpperCase()).map((bank) => bank.bankID)[0]}`} 
                                        sx={{ marginRight: '10px', width: '26px', height: '26px' }} />
                                        {detail.bankCodeTo}
                                    </Box>
                                </TableCell>
                                <TableCell align="center" sx={{ borderBottom: '2px solid #fff' }}>{detail.bankAccNoTo}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

                <Box sx={{ align: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '80px' }}>
                    <FormControl>
                        <Button style={{ borderRadius: 4, backgroundColor: "#eb4e6e", padding: "6px 60px", fontSize: "15px", margin: "10px" }} variant="contained" onClick={() => navigate('/DepositsList/DepoListMoney')}>กลับ</Button>
                    </FormControl>
                </Box>
            </Box>
            : ''}
        </>
    );
}