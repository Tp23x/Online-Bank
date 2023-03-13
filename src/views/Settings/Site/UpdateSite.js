import { Box, Grid, TextField, Typography, FormControlLabel, Switch, Button, FormHelperText, InputAdornment } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { Formik } from 'formik';
import IconButton from '@mui/material/IconButton';
import UploadIcon from '@mui/icons-material/Upload';
import AuthContext from '../../../context/AuthProvider';


export default function UpdateSite() {
    const [isLoading, setIsLoading] = useState(true);
    const { checksite } = useContext(AuthContext)
    const { updateSite } = useContext(AuthContext)

    const [site, setSite] = useState()
    const [siteName, setSiteName] = useState("");
    //const [confirmAmount, setConfirmAmount] = useState("1000");
    const { siteID } = useParams()
    // console.log(user, isLoading)
    useEffect(() => {
        try {
            checksite(siteID, setSite, setIsLoading, setSiteName)

        } catch (err) {
            console.log(err)
        }

    }, [checksite, siteID, setSite, setIsLoading, setSiteName])

    const navigate = useNavigate()

    /* const handleSubmit = e => {
        e.preventDefault(); */
    // updateSite(siteID, siteName)

    return (
        <>
            {!isLoading ?
                <Formik initialValues={{
                    siteId: site.siteID,
                    siteName: site.siteName,
                    status: site.status,
                    //confirmAmount: confirmAmount,
                    submit: null
                }}
                    onSubmit={async (value, { setErrors, setStatus, setSubmitting }) => {
                        // console.log(value)
                        try {
                            updateSite(value)

                            setStatus({ success: true })
                            setSubmitting(false)
                        } catch (err) {
                            console.log(err)
                            setStatus({ success: false })
                            setErrors({ submit: err.message })
                            setSubmitting(false)
                        }
                    }}>
                    {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ width: '100%' }}>
                            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ sm: 8, md: 12 }}>
                                <Grid item sm={8} md={6}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant='h4' sx={{ marginBottom: '20px', marginLeft: '10px' }}>แก้ไขข้อมูลไซต์</Typography>
                                    </Box>
                                    <Grid container spacing={{ xs: 1, md: 2 }} columns={{ sm: 8, md: 12 }}>
                                       {/*  <Grid item sm={8} md={6} m={1}>
                                            <TextField
                                                label="โลโก้"
                                                name=''
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                sx={{ width: '100%' }}
                                                inputProps={{}}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment>
                                                            <IconButton>
                                                                <UploadIcon />
                                                            </IconButton>
                                                        </InputAdornment>
                                                    )
                                                }}
                                            />
                                            {touched.firstname && errors.firstname && (
                                                <FormHelperText error>
                                                    {errors.firstname}
                                                </FormHelperText>
                                            )}
                                        </Grid> */}
                                        <Grid item sm={8} md={6} m={1}>
                                            <TextField
                                                required
                                                label="ชื่อไซต์"
                                                name='siteName'
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                sx={{ width: '100%' }}
                                                value={values.siteName}
                                                inputProps={{}}
                                            />
                                            {touched.siteName && errors.siteName && (
                                                <FormHelperText error>
                                                    {errors.siteName}
                                                </FormHelperText>
                                            )}
                                        </Grid>
                                        <Grid item sm={4} md={6} >
                                            <Box sx={{ display: 'flex', margin: '9px' }}>
                                                <FormControlLabel control={<Switch type="checkbox" name='status' checked={values.status} onChange={handleChange} />} label="สถานะ" />
                                            </Box>
                                        </Grid>
                                        <Grid item sm={8} md={6}></Grid>
                                        <Grid item sm={8} md={6} m={1} sx={{ marginTop: '-8px' }}>
                                            <Grid container spacing={{ xs: 1, md: 2 }} columns={{ sm: 8, md: 12 }}>
                                                <Grid item sm={8} md={6}>
                                                    <Button variant="contained" onClick={() => navigate('/Settings/Site')} sx={{ fontSize: '16px', width: '100%', padding: "10px 80px", background:"#ec4e6e",'&:hover': {background:"#c93c58"}  }}>ยกเลิก</Button>
                                                </Grid>
                                                <Grid item sm={8} md={6}>
                                                    <Button type='submit' variant="contained" sx={{ fontSize: '16px', width: '100%', backgroundColor: "#4086f5", padding: "10px 80px" }}>ตกลง</Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
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






/* import React, { useState, useEffect, useContext } from 'react'
import TableContainer from '@mui/material/TableContainer';
import { Box, InputAdornment, FormControl } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import UploadIcon from '@mui/icons-material/Upload';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../../../context/AuthProvider';


const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
        '& .MuiSwitch-thumb': {
            width: 15,
        },
        '& .MuiSwitch-switchBase.Mui-checked': {
            transform: 'translateX(9px)',
        },
    },
    '& .MuiSwitch-switchBase': {
        padding: 2,
        '&.Mui-checked': {
            transform: 'translateX(12px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
        width: 12,
        height: 12,
        borderRadius: 6,
        transition: theme.transitions.create(['width'], {
            duration: 200,
        }),
    },
    '& .MuiSwitch-track': {
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor:
            theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
        boxSizing: 'border-box',
    },
}));

const data = [

]


export default function UpdateSite() {

    const [isLoading, setIsLoading] = useState(true);
    const { checksite } = useContext(AuthContext);
    const { updateSite } = useContext(AuthContext);
    const [site, setSite] = useState();
    const [siteName, setSiteName] = useState("");
    const [statusSite, setStatussite] = useState(false);
    const [checked, setChecked] = useState( statusSite !== "true" ? false : true );
    const [confirmAmount, setConfirmAmount] = useState("1");
    const { siteID } = useParams();
    const navigate = useNavigate();


    console.log("test",statusSite)
    console.log("Check",checked)

    useEffect(() => {
        checksite(siteID, setSite, setIsLoading, setSiteName, setStatussite)
    }, [siteID, setSite, setIsLoading, checksite, setSiteName, setStatussite])


    const handleSubmit = e => {
        e.preventDefault();
        updateSite(siteID, siteName, confirmAmount)
    }

    return (
        <>
            {!isLoading ?
                <Box component="form" onSubmit={handleSubmit} >

                    <TableContainer >
                        <Box sx={{ m: 1, display: 'flex', gridAutoRows: "auto" }}>
                            <Typography variant='h4'>รายการข้อมูลไซต์</Typography>
                        </Box>
                        <Stack spacing={2} sx={{ m: 1, width: 350, marginTop: 5 }} size="small" >
                            <Autocomplete
                                id="free-solo-demo"
                                freeSolo
                                options={data.map((option) => option.title)}
                                renderInput={(params) => <TextField {...params} label="โลโก้"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment>
                                                <IconButton>
                                                    <UploadIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />}
                            />
                        </Stack>
                        <Stack spacing={2} sx={{ m: 1, width: 350, marginTop: 3 }} size="small" >
                            <TextField label="ชื่อไซต์" required value={siteName} onChange={(e) => setSiteName(e.target.value)} />

                        </Stack>
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ m: 1, width: 350, marginTop: 3 }}>
                            <AntSwitch checked={checked}  onChange={(event) => setChecked(event.target.checked)} />
                            <Typography>สถานะ</Typography>
                        </Stack>
                    </TableContainer>

                    <Box sx={{ display: 'flex', justifyContent: 'between', alignItems: 'center' }}>
                        <FormControl>
                            <Button style={{ borderRadius: 4, backgroundColor: "#eb4e6e", padding: "10px 60px", fontSize: "15px", margin: "10px" }} variant="contained" onClick={() => navigate('/Settings/Site')}>ยกเลิก</Button>
                        </FormControl>
                        <FormControl>
                            <Button style={{ borderRadius: 4, backgroundColor: "#4086f5", padding: "10px 62px", fontSize: "15px", marginLeft: "10px" }} variant="contained" type='submit'>ตกลง</Button>
                        </FormControl>
                    </Box>
                </Box >
                : '...'
            }
        </>
    );
}
 */