import { Box, Grid, TextField, Typography, MenuItem, FormControlLabel, Switch, Button, FormHelperText } from '@mui/material'
import { Formik } from 'formik';
import * as Yup from 'yup';

import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from '../../../context/AuthProvider';


export default function DetailAccount() {
    const navigate = useNavigate()
    const { bank_ddl } = useContext(AuthContext)
    const { site_ddl } = useContext(AuthContext)
    const { customer_ddl } = useContext(AuthContext)
    const { bankaccount_detail } = useContext(AuthContext)
    const { bankaccount_update } = useContext(AuthContext)
    const [detailAccount, setDetailAccount] = useState()
    const [bank_d, setBank_D] = useState([])
    const [site_d, setSite_D] = useState([])
    const [customer_d, setCustomer_D] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [isLoading1, setIsLoading1] = useState(true);
    const [isLoading2, setIsLoading2] = useState(true);
    const [isLoading3, setIsLoading3] = useState(true);
    const [isLoading4, setIsLoading4] = useState(true);
    const { mba_bankAccID } = useParams()




    // console.log(mba_bankAccID)

    useEffect(() => {
        if (isLoading1 === false && isLoading2 === false && isLoading3 === false && isLoading4 === false) {
            setIsLoading(false)
        } else {
            setIsLoading(true)
        }
    }, [isLoading1, isLoading2, isLoading3, isLoading4, setIsLoading])

    // console.log(isLoading1, isLoading2, isLoading3, isLoading4, isLoading)


    useEffect(() => {

        try {
            bankaccount_detail(mba_bankAccID, setDetailAccount, setIsLoading4)
            bank_ddl(setBank_D, setIsLoading1)
            site_ddl(setSite_D, setIsLoading2)
            customer_ddl(setCustomer_D, setIsLoading3)
        } catch (error) {

        }
    }, [setIsLoading1, setIsLoading2, setIsLoading3, setIsLoading4, setBank_D, setSite_D, setCustomer_D, setDetailAccount, bankaccount_detail, bank_ddl, site_ddl, customer_ddl, mba_bankAccID])
    return (
        <>
            {!isLoading ?
                <Formik
                    initialValues={{
                        bankAccID: detailAccount.mba_bankAccID,
                        bankAccNo: detailAccount.mba_bankAccNo,
                        bankAccName: detailAccount.mba_bankAccName,
                        bankType: detailAccount.mba_bankType,
                        siteID: detailAccount.mba_siteID,
                        bankID: detailAccount.mba_bankID,
                        customerID: detailAccount.mba_customerID,
                        walletID: detailAccount.mba_walletID,
                        balance: detailAccount.mba_balance,
                        bankAccNickName: detailAccount.mba_bankAccNickName,
                        isShow: detailAccount.mba_isShow === 1 ? true : false,
                        isAuto: detailAccount.mba_isAuto === 1 ? true : false,
                        isCrypto: detailAccount.mba_isCrypto === 1 ? true : false,
                        comRef: detailAccount.mba_comRef,
                        submit: null
                    }}
                    validationSchema={Yup.object().shape({
                        bankAccNo: Yup.string().min(10, "กรุณาระบุ 10 ตำเเหน่งขึ้นไป").max(255).required('กรุณาระบุ เลขบัญชี'),
                        bankAccName: Yup.string().max(255).required('กรุณาระบุ ชื่อบัญชี'),
                        bankAccNickName: Yup.string().max(255).required('กรุณาระบุ ชื่อเล่น'),
                        comRef: Yup.string().max(255).required('กรุณาระบุ COM'),
                    })}
                    onSubmit={async (value, { setErrors, setStatus, setSubmitting }) => {
                        // console.log(value)
                        try {

                            // console.log(value)
                            bankaccount_update(value)

                            setStatus({ success: true })
                            setSubmitting(false)
                        } catch (err) {
                            console.log(err)
                            setStatus({ success: false })
                            setErrors({ submit: err.message })
                            setSubmitting(false)
                        }
                    }}
                >
                    {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ maxWidth: '400px' }}>
                            <Typography variant='h3' sx={{ marginBottom: '50px' }}>
                                เเก้ไขข้อมูลบัญชี
                            </Typography>
                            <TextField
                                id="outlined-select-currency"
                                select
                                label="เลือกธนาคาร"
                                name='bankID'
                                sx={{ width: '100%' }}
                                value={values.bankID}
                                onChange={handleChange}

                            >
                                {bank_d.result.map((option) => (
                                    <MenuItem key={option.bankID} value={option.bankID}>
                                        {option.bankName}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                required
                                error={Boolean(touched.bankAccNo && errors.bankAccNo)}
                                id="outlined-required"
                                label="เลขบัญชีธนาคาร"
                                sx={{ width: '100%', marginTop: '20px' }}
                                name='bankAccNo'
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.bankAccNo}
                                inputProps={{}}
                            />
                            {touched.bankAccNo && errors.bankAccNo && (
                                <FormHelperText error>
                                    {errors.bankAccNo}
                                </FormHelperText>
                            )}

                            <TextField
                                required
                                error={Boolean(touched.bankAccName && errors.bankAccName)}
                                id="outlined-required"
                                label="ชื่อบัญชีธนาคาร"
                                sx={{ width: '100%', marginTop: '20px' }}
                                name='bankAccName'
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.bankAccName}
                                inputProps={{}}
                            />
                            {touched.bankAccName && errors.bankAccName && (
                                <FormHelperText error>
                                    {errors.bankAccName}
                                </FormHelperText>
                            )}
                            {/* <TextField
                                id="outlined-select-currency"
                                select
                                label="ผู้ใช้"
                                name='customerID'
                                sx={{ width: '100%', marginBottom: '20px', display:'none' }}
                                value={values.customerID}
                                onChange={handleChange}

                            >
                                {customer_d.result.map((option) => (
                                    <MenuItem key={option.customerID} value={option.customerID} onClick={(e) => setFieldValue('bankType', `${option.typeCustomer}`)}>
                                        {option.username}
                                    </MenuItem>
                                ))}
                            </TextField> */}
                            <TextField
                                id="outlined-select-currency"
                                select
                                label="ไซต์"
                                name='siteID'
                                sx={{ width: '100%', marginTop: '20px' }}
                                value={values.siteID}
                                onChange={handleChange}

                            >
                                {site_d.result.map((option) => (
                                    <MenuItem key={option.siteID} value={option.siteID}>
                                        {option.siteName}
                                    </MenuItem>
                                ))}
                            </TextField>
                            {/* <TextField
                                required
                                error={Boolean(touched.balance && errors.balance)}
                                id="outlined-required"
                                label="สมดุล"
                                sx={{ width: '100%', marginBottom: '20px', display:'none' }}
                                name='balance'
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.balance}
                                inputProps={{}}
                            />
                            {touched.balance && errors.balance && (
                                <FormHelperText error>
                                    {errors.balance}
                                </FormHelperText>
                            )} */}
                            <TextField
                                required
                                error={Boolean(touched.bankAccNickName && errors.bankAccNickName)}
                                id="outlined-required"
                                label="ชื่อสำหรับเเสดงในระบบ"
                                sx={{ width: '100%', marginTop: '20px' }}
                                name='bankAccNickName'
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.bankAccNickName}
                                inputProps={{}}
                            />
                            {touched.bankAccNickName && errors.bankAccNickName && (
                                <FormHelperText error>
                                    {errors.bankAccNickName}
                                </FormHelperText>
                            )}
                            <TextField
                                required
                                error={Boolean(touched.comRef && errors.comRef)}
                                id="outlined-required"
                                label="COM"
                                sx={{ width: '100%', marginTop: '20px' }}
                                name='comRef'
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.comRef}
                                inputProps={{}}
                            />
                            {touched.comRef && errors.comRef && (
                                <FormHelperText error>
                                    {errors.comRef}
                                </FormHelperText>
                            )}
                            {/* <FormControlLabel control={<Switch name='isShow' type="checkbox" checked={values.isShow} onChange={handleChange} />} label="โชว์บัญชี" sx={{ marginTop: '20px', marginBottom: '20px', width: '100%' }} /> */}
                            <FormControlLabel control={<Switch name='isAuto' type="checkbox" checked={values.isAuto} onChange={handleChange} />} label="สถานะออโต้ถอน" sx={{ width: '100%', marginTop: '20px' }} />
                            <FormControlLabel control={<Switch name='isCrypto' type="checkbox" checked={values.isCrypto} onChange={handleChange} />} label="สถานะคริปโต" sx={{ marginBottom: '20px', width: '100%', marginTop: '20px' }} />
                            <Grid container spacing={{ xs: 1, md: 2 }} columns={{ sm: 8, md: 12 }}>
                                <Grid item sm={8} md={6}>
                                    <Button variant="contained" onClick={() => navigate('/Settings/AccountInfo')} sx={{ fontSize: '16px', width: '100%', background: "#ec4e6e", '&:hover': { background: "#c93c58" } }}>ยกเลิก</Button>
                                </Grid>
                                <Grid item sm={8} md={6}>
                                    <Button type='submit' variant="contained" color="primary" sx={{ fontSize: '16px', width: '100%' }}>บันทึก</Button>
                                </Grid>
                            </Grid>
                        </Box>
                    )}
                </Formik>

                : '...'
            }
        </>
    )
}
