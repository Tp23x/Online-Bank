import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Avatar, Box, Button, FormControl } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from "react";
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import api from '../../../components/api/api'
import moment from "moment";
import AuthContext from '../../../context/AuthProvider';

let api_url = process.env.REACT_APP_BASE_API

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


export default function InformationDetail() {

    const navigate = useNavigate();

    const [detailmanual, setDetail] = useState();
    const { tscba_tscBankAccountID } = useParams()
    const [isLoading, setIsLoading] = useState(true);
    const [isLoading2, setIsLoading2] = useState(true);
    const [logDataMassID, setLogDataMassID] = useState()
    const [body, setBody] = useState(null)

    // console.log(tscba_tscBankAccountID)
    useEffect(() => {
        api.get(`api/v1.0/deposit/detail/manual/${tscba_tscBankAccountID}`)

            .then((response) => response.data)
            .then((data) => {
                if (data.status === true) {
                    console.log('succes', data.result[0])
                    setDetail(data.result[0])
                    setIsLoading2(false)

                } else {
                    console.log('failed')
                }
            });
    }, [tscba_tscBankAccountID, setDetail]);

    //-------------------GET IMAGE-------------------------------
    const { bank_ddl } = useContext(AuthContext)
    const [bank_d, setBank_D] = useState([])
    const [isLoading1, setIsLoading1] = useState(true);

    useEffect(() => {
        bank_ddl(setBank_D, setIsLoading1)
    }, [bank_ddl, setIsLoading1, setBank_D])

    //---------------update(put) depositunknow detail------------------
    const [Logdata, setLogdata] = useState();
    const { tscBankAccountID } = useParams()
    
    const Handlesubmit = (e) => {
        api.put(`api/v1.0/deposit/detail/${tscba_tscBankAccountID}`, { "logDataMassID": `${logDataMassID}` })

            .then((response) => response.data)
            .then((data) => {
                if (data.status === true) {
                    console.log('Succes')
                    // setCheckbox(data.result)
                    // setIsLoading(false)
                    alert('บันทึกข้อมูลเรียบร้อย')
                    window.location.href = '/DepositsList/ListUnknow'

                } else {
                    console.log('Failed')
                }
            });
    }

    useEffect(() => {
        if (isLoading1 === false && isLoading2 === false) {
            setIsLoading(false)
        } else {
            setIsLoading(true)
        }
    }, [setIsLoading, isLoading1, isLoading2])
    //console.log("Data", logDataMassID, tscba_tscBankAccountID);


    return (
        <> {!isLoading ?
            <Box >
                <TableContainer >
                    <Box sx={{ m: 1, display: 'flex', gridAutoRows: "auto" }}>
                        <Typography variant='h4'>ข้อมูลแจ้งฝาก</Typography>
                        {/* <Typography variant='h6' sx={{ m: 2, color: "primary.main", align: 'center', marginTop: '10px' }}>#{detailmanual.docNo}</Typography> */}
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
                                /* onClick={() => handleSite(row.site)} */
                                sx={{
                                    cursor: 'pointer', '&:hover': {
                                        background: '#f7f7f7'
                                    }
                                }} >
                                <TableCell component="th" scope="row" sx={{ alignItems: 'center' }}>
                                    {moment(detailmanual.datetsc).format("DD-MM-YYYY HH:mm")}
                                </TableCell>
                                <TableCell align="center">{parseFloat(detailmanual.amount, 10).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</TableCell>
                                <TableCell align="center">{detailmanual.remark? detailmanual.remark:"-" }</TableCell>
                                <TableCell align="center">
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Avatar src={`${api_url}api/v1.0/bankaccount/bank-ddl/img/${bank_d.result.filter((item) => item.bankCode === detailmanual.bankCodeFrom?.toUpperCase()).map((bank) => bank.bankID)[0]}`}
                                            sx={{ marginRight: '10px', width: '26px', height: '26px' }} />
                                        {detailmanual.bankCodeFrom}
                                    </Box>
                                </TableCell>
                                <TableCell align="center">{detailmanual.bankAccNoFrom}</TableCell>
                                <TableCell align="center">
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Avatar src={`${api_url}api/v1.0/bankaccount/bank-ddl/img/${bank_d.result.filter((item) => item.bankCode === detailmanual.bankCodeTo?.toUpperCase()).map((bank) => bank.bankID)[0]}`}
                                            sx={{ marginRight: '10px', width: '26px', height: '26px' }} />
                                        {detailmanual.bankCodeTo}
                                    </Box>
                                </TableCell>
                                <TableCell align="center">{detailmanual.bankAccNoTo}</TableCell>
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
                                <TableCell align="center" sx={{ color: '#535252', }}>จำนวน</TableCell>
                                <TableCell align="center" sx={{ color: '#535252' }}>ช่องทาง</TableCell>
                                <TableCell align="center" sx={{ color: '#535252' }}>จากธนาคาร</TableCell>
                                <TableCell align="center" sx={{ color: '#535252' }}>เลขบัญชี</TableCell>
                                <TableCell align="center" sx={{ color: '#535252' }}>เข้าธนาคาร</TableCell>
                                <TableCell align="center" sx={{ color: '#535252' }}>เลขบัญชี</TableCell>
                            </TableRow>
                        </TableHead>
                        {detailmanual.status === "A" ?
                            <TableBody>
                                <TableRow
                                    /* onClick={() => handleSite(row.site)} */
                                    sx={{
                                        cursor: 'pointer', '&:hover': {
                                            background: '#f7f7f7'
                                        }
                                    }} >
                                    <TableCell component="th" scope="row" sx={{ alignItems: 'center' }}>
                                        {moment(detailmanual.message.datesms).format("DD-MM-YYYY HH:mm")}
                                    </TableCell>
                                    <TableCell align="center">{parseFloat(detailmanual.message.amount, 10).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</TableCell>
                                    <TableCell align="center">{detailmanual.message.channel}</TableCell>
                                    <TableCell align="center">
                                    {bank_d.result.filter((item) => item.bankCode === detailmanual.message.codeBankFrom?.toUpperCase()).map((bank) => bank.bankID)[0]? <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Avatar src={`${api_url}api/v1.0/bankaccount/bank-ddl/img/${bank_d.result.filter((item) => item.bankCode === detailmanual.message.codeBankFrom?.toUpperCase()).map((bank) => bank.bankID)[0]}`}
                                                sx={{ marginRight: '10px', width: '26px', height: '26px' }} />
                                            {detailmanual.message.codeBankFrom}
                                        </Box>:"-"}
                                    </TableCell>
                                    <TableCell align="center">{detailmanual.message.bankNoFrom? detailmanual.message.bankNoFrom : "-"}</TableCell>
                                    <TableCell align="center">
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Avatar src={`${api_url}api/v1.0/bankaccount/bank-ddl/img/${bank_d.result.filter((item) => item.bankCode === detailmanual.message.codeBankTo?.toUpperCase()).map((bank) => bank.bankID)[0]}`}
                                                sx={{ marginRight: '10px', width: '26px', height: '26px' }} />
                                            {detailmanual.message.codeBankTo}
                                        </Box>
                                    </TableCell>
                                    <TableCell align="center">{detailmanual.message.bankNoTo}</TableCell>
                                </TableRow>
                            </TableBody>

                            : <TableBody>
                                {detailmanual?.message?.map((item, index) => 
                                 <TableRowData item={item} index={index} setLogDataMassID={setLogDataMassID}/>
                                )}

                            </TableBody>

                        }

                    </Table>
                </TableContainer>

                <Box sx={{ align: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '80px' }}>
                    <FormControl>
                        <Button style={{ borderRadius: 4, backgroundColor: "#eb4e6e", padding: "6px 60px", fontSize: "15px", margin: "10px" }} variant="contained" onClick={() => navigate('/DepositsList/DepoListUnknow')}>ยกเลิก</Button>
                    </FormControl>
                    <FormControl>
                        <Button style={{ borderRadius: 4, backgroundColor: "#1fc64c", padding: "6px 62px", fontSize: "15px", marginLeft: "10px" }} sx={{ display: detailmanual.status === "A" ? 'none' : 'block' }} variant="contained" type='submit' onClick={Handlesubmit}>ตกลง</Button>
                    </FormControl>
                </Box>
            </Box>
            : ''}
        </>
    );
}
const TableRowData = ({item, index, setLogDataMassID} ) => {
    const [alllcheckbox, setCheckbox] = useState(false);

    const handleCheckbox = (e, item, index) => {
        // e.preventDefault();
        setCheckbox(e.target.checked);
        if (alllcheckbox === false) {
            setLogDataMassID(item.logDataMassID)
        } else {
            setLogDataMassID()
        }
    }
    // console.log("tr", item);
    
    return (
        <TableRow
            sx={{
                cursor: 'pointer', '&:hover': {
                    background: '#f7f7f7'
                }
            }} >
            <TableCell component="th" scope="row" sx={{ display: 'flex', alignItems: 'center', borderBottom: '2px solid #fff' }}>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}>

                    <Checkbox size="small" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}
                        // value={value.tscBankAccountID}
                        // checked={alllcheckbox.selected || false}
                        onChange={(e) => handleCheckbox(e, item, index)}
                        checked={alllcheckbox ? true : false}
                    />

                    {moment(item.datesms).format("DD-MM-YYYY HH:mm")}
                </Box>
            </TableCell>
            <TableCell align="center" sx={{ borderBottom: '2px solid #fff' }}>{parseFloat(item.amount, 10).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</TableCell>
            <TableCell align="center" sx={{ marginRight: '100px', borderBottom: '2px solid #fff' }}>{item.channel}</TableCell>
            <TableCell align="center" sx={{ borderBottom: '2px solid #fff' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                    {item.codeBankFrom ? item.codeBankFrom : "-"}
                </Box>
            </TableCell>
            <TableCell align="center" sx={{ borderBottom: '2px solid #fff' }}>{item.bankNoFrom ? item.bankNoFrom : "-"}</TableCell>
            <TableCell align="center" sx={{ borderBottom: '2px solid #fff' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                    {item.codeBankTo ? item.codeBankTo: "-"}
                </Box>
            </TableCell>
            <TableCell align="center" sx={{ borderBottom: '2px solid #fff' }}>{item.bankNoTo ? item.bankNoTo: "-"}</TableCell>
        </TableRow>
    )
}