import { Box, Grid, Typography, Button, InputBase, Paper, FormHelperText } from '@mui/material'
import React, { useContext, } from 'react'
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AuthContext from '../context/AuthProvider';
import { useDispatch, useSelector } from 'react-redux';
import { loginAsync } from '../store/slices/authSlice'
import { ProfileAsync } from '../store/slices/profileSlice'

export default function Login() {

    // const { getUser } = useContext(AuthContext)

    const { user, loading, error } = useSelector(state => state.auth)

    const dispatch = useDispatch()
  
  

    // console.log(from)
    // const [username, setUsername] = useState('')
    // const [password, setPassword] = useState('')



    // useEffect(() => {
    //     if (local_token !== null) {
    //         navigate('/')
    //     }
    // })
    // const handleSubmit = async (event) => {
    //     event.preventDefault();

    //     try {
    // await axios.post(`${api_url}api/v1.0/auth/login`, JSON.stringify({ username, password }), {
    //     headers: { 'Content-Type': 'application/json' }
    // })

    //     .then((response) => response.data)
    //     .then((data) => {
    //         if (data.status === true) {
    //             console.log('login succes')
    //             const token = data.result.accessToken
    //             localStorage.setItem('accessToken', token)
    //             setAuth({ username, password, token })
    //             navigate(from, { replace: true })

    //         } else {
    //             console.log('login failed')
    //         }
    //     });

    //         setUsername('')
    //         setPassword('')
    //     } catch (err) {

    //     }

    // }

    return (
        <Box sx={{ width: '100%' }}>
            <Grid container columns={{ sm: 8, md: 12 }}>
                <Grid item sm={8} md={6} sx={{display:{ xs:'none', sm:'none', md:'block'}}}>
                    <Box sx={{ width: '100%', height: '100vh', color: '#fff', background: '#248ef9', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography variant='h4'>Nice to see you again</Typography>
                        <Typography variant='h1' sx={{ textTransform: 'uppercase', textAlign:'center' }}>welcome back</Typography>
                    </Box>
                </Grid>
                <Grid item sm={8} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh', background: '#f9f9f9' }}>
                    <Box sx={{ width: '600px', height: 'auto', background: '#fff', boxShadow: 'rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px', borderRadius: '15px' }}>
                        <Formik initialValues={{
                            username: '',
                            password: '',
                            submit: null
                        }}
                            validationSchema={Yup.object().shape({
                                username: Yup.string().max(255).required('กรุณาระบุ Username'),
                                password: Yup.string().max(255).required('กรุณาระบุ Password')
                            })}
                            onSubmit={async (value, { setErrors, setStatus, setSubmitting }) => {
                                try {

                                    dispatch(loginAsync(value));
                                    
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
                                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ margin: '50px 80px' }}>
                                    <Typography variant='h4' sx={{ color: '#4086f5', fontWeight: 'bold', marginBottom: '20px' }}>Login</Typography>

                                    <Paper sx={{ display: 'flex', alignItems: 'center', padding: '10px', marginBottom: '20px', color: '#A3A3A3' }}>
                                        <PermIdentityIcon sx={{ marginRight: '10px' }} />
                                        <InputBase
                                            error={Boolean(touched.username && errors.username)}
                                            placeholder="Username"
                                            type="text"
                                            // ref={userRef}
                                            autoComplete='off'
                                            name='username'
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            fullWidth
                                            required
                                            // onChange={(e) => setUsername(e.target.value)}
                                            // value={username}
                                            value={values.username}
                                            inputProps={{}}
                                        />
                                        {touched.username && errors.username && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.username}
                                            </FormHelperText>
                                        )}
                                    </Paper>
                                    {/* {console.log(errors)} */}
                                    <Paper sx={{ display: 'flex', alignItems: 'center', padding: '10px', marginBottom: '20px', color: '#A3A3A3' }}>
                                        <LockOutlinedIcon sx={{ marginRight: '10px' }} />
                                        <InputBase
                                            error={Boolean(touched.username && errors.username)}
                                            placeholder="Password"
                                            type="password"
                                            value={values.password}
                                            name="password"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            fullWidth
                                            required
                                            inputProps={{}}
                                        // onChange={(e) => setPassword(e.target.value)}
                                        // value={password}
                                        />
                                        {touched.password && errors.password && (
                                            <FormHelperText error id="standard-weight-helper-text-password-login">
                                                {errors.password}
                                            </FormHelperText>
                                        )}
                                    </Paper>

                                    {/* <Typography variant='h6' sx={{ fontSize: '1rem', width: '100%', textAlign: 'right', marginBottom: '40px' }}>Forgot Password ?</Typography> */}

                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <FormHelperText sx={{ fontSize: '24px' }} error>{user?.code === 1001 ? 'ไม่พบชื่อผู้ใช้งานนี้ในระบบ' : '' || user?.code === 1002 ? 'ไม่พบอีเมลนี้ในระบบ' : '' || user?.code === 1003 ? 'รหัสผ่านไม่ถูกต้อง' : ''}</FormHelperText>
                                    </Box>

                                    <Button type='submit' disabled={isSubmitting} variant="contained" sx={{ background: "#4086f5", fontSize: '24px', width: '100%', marginBottom: '20px' }}>{loading ? 'Loading...' : 'Sign in'}</Button>
                                </Box>
                            )}
                        </Formik>

                        <Typography variant='h6' sx={{ fontSize: '1rem', width: '100%', textAlign: 'center', marginBottom: '20px', color: '#A3A3A3' }}>Version 0.0.1</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box >
    )
}
