import React, { useContext, useEffect, useState } from 'react'
import { Table, TableHead, TableRow, TableCell, TableBody, Avatar } from '@mui/material';

import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import AuthContext from '../../../context/AuthProvider';
import {setDefaultURL} from '../../../components/api/api'
let api_url = process.env.REACT_APP_BASE_API


export default function AccountList() {

    const [accounts, setAccounts] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [bank_d, setBank_D] = useState([])
    const [isLoading1, setIsLoading1] = useState(true);    
    const [isLoading3, setIsLoading3] = useState(true);
    const [bankID, setBankID] = useState('')

    

    const navigate = useNavigate()
    const { bank_ddl, bankaccount, getImg } = useContext(AuthContext)

    // const { bankaccount } = useContext(AuthContext)
    // console.log(accounts, isLoading, bank_d, isLoading1, isLoading3)
    
    useEffect(() => {
        if (isLoading === false && isLoading1 === false ) {
            setIsLoading3(false)
        } else {
            setIsLoading3(true)
        }
    }, [isLoading, isLoading1, setIsLoading])

    useEffect(() => {
        bankaccount(setAccounts, setIsLoading)
        bank_ddl(setBank_D, setIsLoading1)
    }, [bankaccount, bank_ddl, setAccounts, setIsLoading,setBank_D, setIsLoading1])
    // console.log(setDefaultURL())
    return (
        <>
            {!isLoading3 ?
                <Table sx={{ minWidth: 350, borderCollapse: 'inherit', borderSpacing: '0 20px' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontSize: '18px', border: 'none', padding: '0 16px' }}>ธนาคาร</TableCell>
                            <TableCell sx={{ fontSize: '18px', border: 'none', padding: '0 16px' }} align="center">เลขบัญชี</TableCell>
                            {/* <TableCell sx={{ fontSize: '18px', border: 'none', padding: '0 16px' }} align="center">ประเภทบัญชี</TableCell> */}
                            <TableCell sx={{ fontSize: '18px', border: 'none', padding: '0 16px' }} align="center">ชื่อสำหรับเเสดงในระบบ</TableCell>
                            <TableCell sx={{ fontSize: '18px', border: 'none', padding: '0 16px' }} align="center">ชื่อบัญชี</TableCell>
                            <TableCell sx={{ fontSize: '18px', border: 'none', padding: '0 16px' }} align="center">สถานะ</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {accounts.result.map((row, i) => (
                            <TableRow
                                key={i}
                                onClick={() => navigate(`/Settings/AccountInfo/Detail/${row.mba_bankAccID}`)}
                                sx={{
                                    cursor: 'pointer', '&:hover': {
                                        background: '#f7f7f7'
                                    }
                                }} >
                                <TableCell component="th" scope="row" sx={{ display: 'flex', alignItems: 'center', fontSize: '18px', borderTop: '2px solid #D7D7D7', borderLeft: '2px solid #D7D7D7', borderBottom: '2px solid #D7D7D7', borderRadius: '5px 0 0 5px' }}>
                                    {/* {console.log(getImg(row.mba_bankID))} */}
                                    <Avatar src={`${api_url}api/v1.0/bankaccount/bank-ddl/img/${row.mba_bankID}`} sx={{ marginRight: '20px' }} />
                                    {bank_d.result.filter((item) => item.bankID === row.mba_bankID).map((bank) => `${bank.bankName}`)}
                                </TableCell>
                                <TableCell align="center" sx={{ fontSize: '18px', borderTop: '2px solid #D7D7D7', borderBottom: '2px solid #D7D7D7' }}>{row.mba_bankAccNo}</TableCell>
                                {/* <TableCell align="center" sx={{ fontSize: '18px', borderTop: '2px solid #D7D7D7', borderBottom: '2px solid #D7D7D7' }}>{row.mba_bankType}</TableCell> */}
                                <TableCell align="center" sx={{ fontSize: '18px', borderTop: '2px solid #D7D7D7', borderBottom: '2px solid #D7D7D7' }}>{row.mba_bankAccNickName}</TableCell>
                                <TableCell align="center" sx={{ fontSize: '18px', borderTop: '2px solid #D7D7D7', borderBottom: '2px solid #D7D7D7' }}>{row.mba_bankAccName}</TableCell>
                                <TableCell align="center" sx={{ color: `${(row.mba_status === 0 && '#CACFD2') || '#27E900'}`, fontSize: '18px', borderTop: '2px solid #D7D7D7', borderRight: '2px solid #D7D7D7', borderBottom: '2px solid #D7D7D7', borderRadius: ' 0 5px 5px 0' }}>
                                    {(row.mba_status === 0 && 'ปิด') || 'ใช้งาน'}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table> : ''}
        </>
    )
}
