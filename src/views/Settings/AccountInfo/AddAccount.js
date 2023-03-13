import { Box, Grid, TextField, Typography, MenuItem, FormControlLabel, Switch, Button, FormHelperText } from '@mui/material'
import { Formik } from 'formik';
import * as Yup from 'yup';

import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import AuthContext from '../../../context/AuthProvider';

export default function AddAccount() {
    const navigate = useNavigate()
    const { bank_ddl } = useContext(AuthContext)
    const { site_ddl } = useContext(AuthContext)
    const { customer_ddl } = useContext(AuthContext)
    const { create_bankaccount } = useContext(AuthContext)

    const [bank_d, setBank_D] = useState([])
    const [site_d, setSite_D] = useState([])
    const [customer_d, setCustomer_D] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [isLoading1, setIsLoading1] = useState(true);
    const [isLoading2, setIsLoading2] = useState(true);
    const [isLoading3, setIsLoading3] = useState(true);


    useEffect(() => {
        if (isLoading1 === false && isLoading2 === false && isLoading3 === false) {
            setIsLoading(false)
        } else {
            setIsLoading(true)
        }
    }, [isLoading1, isLoading2, isLoading3, setIsLoading])
    useEffect(() => {

        try {
            bank_ddl(setBank_D, setIsLoading1)
            site_ddl(setSite_D, setIsLoading2)
            customer_ddl(setCustomer_D, setIsLoading3)
        } catch (error) {

        }
    }, [setIsLoading1, setIsLoading2, setIsLoading3, setBank_D, setSite_D, setCustomer_D, bank_ddl, site_ddl, customer_ddl])
    // console.log(bank_d, site_d, customer_d, isLoading, isLoading1, isLoading2, isLoading3)
    // console.log(isLoading1, isLoading2, isLoading3, isLoading)

    return (
        <>
            {!isLoading ?
                <Formik
                    initialValues={{
                        bankAccNo: '',
                        bankAccName: '',
                        bankType: '',
                        siteID: '',
                        bankID: '',
                        customerID: '',
                        walletID: '',
                        balance: 0,
                        bankAccNickName: '',
                        isShow: true,
                        isAuto: true,
                        isCrypto: true,
                        comRef: '',
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
                            create_bankaccount(value)

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
                                เพิ่มข้อมูลบัญชี
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
                                sx={{ width: '100%', marginBottom: '20px' }}
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
                                sx={{ width: '100%', marginBottom: '20px',display:'none' }}
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
                                sx={{ width: '100%',  marginTop: '20px' }}
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
                                sx={{ width: '100%',  marginTop: '20px' }}
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
                            {/* <FormControlLabel control={<Switch name='isShow' checked={values.isShow} onChange={handleChange} />} label="โชว์บัญชี" sx={{  marginTop: '20px', marginBottom: '20px', width: '100%' }} /> */}
                            <FormControlLabel control={<Switch name='isAuto' checked={values.isAuto} onChange={handleChange} />} label="สถานะออโต้ถอน" sx={{ width: '100%', marginTop: '20px' }} />
                            <FormControlLabel control={<Switch name='isCrypto' type="checkbox" checked={values.isCrypto} onChange={handleChange} />} label="สถานะคริปโต" sx={{ marginBottom: '20px', width: '100%', marginTop: '20px' }} />
                            <Grid container spacing={{ xs: 1, md: 2 }} columns={{ sm: 8, md: 12 }}>
                                <Grid item sm={8} md={6}>
                                    <Button variant="contained" onClick={() => navigate('/Settings/AccountInfo')} sx={{ fontSize: '16px', width: '100%', background:"#ec4e6e",'&:hover': {background:"#c93c58"} }}>ยกเลิก</Button>
                                </Grid>
                                <Grid item sm={8} md={6}>
                                    <Button type='submit' variant="contained" color="primary" sx={{ fontSize: '16px', width: '100%' }}>ตกลง</Button>
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
