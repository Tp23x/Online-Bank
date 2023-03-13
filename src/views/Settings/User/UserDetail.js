import { Box, Grid, TextField, Typography, MenuItem, FormControlLabel, Switch, Button, Paper, List, ListItem, Checkbox, FormHelperText } from '@mui/material'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import AuthContext from '../../../context/AuthProvider';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchItem, userSiteAsync, itemSeletor } from '../../../store/slices/userSiteSlice';

const options = ["COM1", "COM2", "COM3", "COM4", "COM5", "COM6", "COM7"];

// const roleData = [
//   {
//     value: 1,
//     label: 'Developer',
//   },
//   {
//     value: 2,
//     label: 'Adminnistrator',
//   },
//   {
//     value: 3,
//     label: 'App',
//   },
//   {
//     value: 4,
//     label: 'Straff',
//   },
// ];

export default function UserDetail() {
  const [isLoading, setIsLoading] = useState(true);
  // const [isLoading3, setIsLoading3] = useState(true);
  const [isLoadingUserSite, setIsLoadingUserSite] = useState(true);
  const { checkUser } = useContext(AuthContext)
  const { updateUser } = useContext(AuthContext)
  const [site, setSite] = useState([])
  const { siteList } = useContext(AuthContext)
  const { users_sites_create } = useContext(AuthContext)
  const { get_users_sites } = useContext(AuthContext)
  const { getRole } = useContext(AuthContext)
  // const { resetPassword } = useContext(AuthContext)

  const [user, setUser] = useState()
  const [userSite, setUserSite] = useState([])
  const { userID } = useParams()

  const [open, setOpen] = React.useState(false);
  const [role, setRole] = useState([])

  const [password, setPassword] = useState()
  const [detail, setDetail] = useState()
  const handleClickOpen = () => {
    // resetPassword(password, userID)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // const dispatch = useDispatch()


  // const { userSiteList } = useSelector(state => state.userSiteList)

  // const { loading, error, userSiteList } = useSelector(itemSeletor)
  // console.log(userSiteList)
  // useEffect(() => {
  //   dispatch(fetchItem(userID))
  // }, [dispatch])


  // const renderItem =() => {
  //   if (userSiteList.result === undefined) return 'loading....' 
  //   if (error) return 'no item'
  //   return userSiteList.result
  // }


  // console.log(userSite)

  useEffect(() => {
    try {
      checkUser(userID, setUser)
    } catch (err) {
      console.log(err)
    }

  }, [checkUser, userID, setUser])
  // useEffect(() => {
  //   try {
  //     checkUser(userID, setUser, setIsLoading2)
  //     get_users_sites(userID, setUserSite,setIsLoading3)


  //   } catch (err) {
  //     console.log(err)
  //   }

  // }, [checkUser, userID, get_users_sites, setUser, setUserSite, setIsLoading2,setIsLoading3])
  useEffect(() => {
    try {
      get_users_sites(userID, setUserSite, setIsLoadingUserSite)
    } catch (err) {
      console.log(err)
    }

  }, [userID, get_users_sites, setUserSite, setIsLoadingUserSite])



  const navigate = useNavigate()

  const [selected, setSelected] = useState([]);

  // const location = useLocation()
  // const handleChangeAll = (event) => {
  //   const value = event.target.value;
  //   // console.log(value);
  //   if (value === "all") {
  //     setSelected(selected.length === options.length ? [] : options);
  //     return;
  //   }

  //   const list = [...selected];
  //   const index = list.indexOf(value);
  //   index === -1 ? list.push(value) : list.splice(index, 1);
  //   setSelected(list);
  // };
  //  console.log(site, userSite)
  // const [role, setRole] = React.useState(0);

  // const handleChangeRole = (event) => {
  //   setRole(event.target.value);
  // };

  useEffect(() => {
    siteList(setSite)
  }, [setSite, siteList])
  useEffect(() => {
    getRole(setRole)
  }, [getRole, setRole])

  const selectAllData = site.map((checkbox) => checkbox.siteID)
  // const filterSite = site.filter((item) => item.siteID === userSite.siteID.map(site_c) => site_c.siteID).map((site_c) => ({id: site_c.siteID}))  

  useEffect(() => {
    if (user && isLoadingUserSite === false) {
      setIsLoading(false)
    } else {
      setIsLoading(true)
    }
  }, [user, isLoadingUserSite, setIsLoading])

  // console.log(isLoading, user, site, userSite, isLoadingUserSite)
  //   useEffect(() => {
  //     if (isLoading2 === false && isLoading3 === false) {
  //         setIsLoading(false)
  //     } else {
  //         setIsLoading(true)
  //     }
  // }, [ isLoading2, isLoading3, setIsLoading])
  // console.log(isLoading3,isLoading2, isLoading)


  return (
    <>
      {!isLoading ?
        <Formik initialValues={{
          userId: user.userID,
          username: user.username,
          password: "",
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          roleID: user.roleID.roleID,
          status: user.status,
          siteID: userSite.map((us_c) => { return us_c.siteID }),
          // siteID: userSiteList.result?.map((us_c) => { return us_c.siteID }),
          selectAll: false,
          submit: null
        }}
          validationSchema={Yup.object().shape({
            username: Yup.string().max(255).required('กรุณาระบุ Username'),
            // password: Yup.string().max(255).required('Password is required'),
            firstname: Yup.string().max(255).required('กรุณาระบุ ชื่อ'),
            lastname: Yup.string().max(255).required('กรุณาระบุ นามสกุล'),
            email: Yup.string().max(255).required('กรุณาระบุ Email'),
          })}
          onSubmit={async (value, { setErrors, setStatus, setSubmitting }) => {
            // console.log(value)
            try {

              updateUser(value, users_sites_create, userSite, site)


              setStatus({ success: true })
              setSubmitting(false)
            } catch (err) {
              console.log(err)
              setStatus({ success: false })
              setErrors({ submit: err.message })
              setSubmitting(false)
            }
          }}>
          {({ errors, handleBlur, handleChange, handleSubmit, setFieldValue, isSubmitting, touched, values }) => (
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ width: '100%' }}>
              <Grid container spacing={{ xs: 2, md: 3 }} columns={{ sm: 8, md: 12 }}>
                <Grid item sm={8} md={6}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant='h4' sx={{ marginBottom: '20px' }}>รายละเอียด</Typography>
                    <FormControlLabel control={<Switch type="checkbox" name='status' checked={values.status} onChange={handleChange} />} label="สถานะ" />
                  </Box>
                  <Grid container spacing={{ xs: 1, md: 2 }} columns={{ sm: 8, md: 12 }}>
                    <Grid item sm={8} md={6}>
                      <TextField
                        error={Boolean(touched.firstname && errors.firstname)}
                        required
                        label="ชื่อ"
                        name='firstname'
                        onBlur={handleBlur}
                        onChange={handleChange}
                        sx={{ width: '100%' }}
                        value={values.firstname}
                        inputProps={{}}
                      />
                      {touched.firstname && errors.firstname && (
                        <FormHelperText error>
                          {errors.firstname}
                        </FormHelperText>
                      )}
                    </Grid>
                    <Grid item sm={8} md={6}>
                      <TextField
                        error={Boolean(touched.lastname && errors.lastname)}
                        required
                        label="นามสกุล"
                        name='lastname'
                        onBlur={handleBlur}
                        onChange={handleChange}
                        sx={{ width: '100%' }}
                        value={values.lastname}
                        inputProps={{}}
                      />
                      {touched.lastname && errors.lastname && (
                        <FormHelperText error>
                          {errors.lastname}
                        </FormHelperText>
                      )}
                    </Grid>
                    <Grid item sm={8} md={6}>
                      <TextField
                        error={Boolean(touched.username && errors.username)}
                        disabled
                        label="username"
                        name='username'
                        onBlur={handleBlur}
                        onChange={handleChange}
                        sx={{ width: '100%' }}
                        value={values.username}
                        inputProps={{}}
                      />
                      {touched.username && errors.username && (
                        <FormHelperText error>
                          {errors.username}
                        </FormHelperText>
                      )}

                    </Grid>
                    <Grid item sm={8} md={6}>
                      {/* <TextField 
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        name='password'
                        onBlur={handleBlur}
                        onChange={handleChange}
                        sx={{ width: '100%' }}
                        value={values.password}
                        inputProps={{}}
                      />
                      {touched.password && errors.password && (
                        <FormHelperText error>
                          {errors.password}
                        </FormHelperText>
                      )} */}
                      <TextField
                        label="email"
                        type="email"
                        autoComplete="current-email"
                        name='email'
                        onBlur={handleBlur}
                        onChange={handleChange}
                        sx={{ width: '100%' }}
                        value={values.email}
                        inputProps={{}}
                      />
                      {touched.email && errors.email && (
                        <FormHelperText error>
                          {errors.email}
                        </FormHelperText>
                      )}
                    </Grid>
                    <Grid item sm={8} md={6}>
                      <TextField
                        select
                        label="บทบาท"
                        name='roleID'
                        value={values.roleID}
                        onChange={handleChange}
                        sx={{ width: '100%' }}
                      >
                        {role.map((option, i) => (
                          <MenuItem key={i} value={option.roleID}>
                            {option.roleName}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item sm={8} md={6}></Grid>
                    <Grid item sm={8} md={6} sx={{ marginTop: '20px' }}>
                      {/* <Typography variant='h6' onClick={handleClickOpen} sx={{ marginBottom: '20px', fontWeight: 'bold', textAlign: 'right', cursor: 'pointer' }}>
                        เปลี่ยนรหัสผ่าน
                      </Typography> */}
                      <Grid container spacing={{ xs: 1, md: 2 }} columns={{ sm: 8, md: 12 }}>

                        <Grid item sm={8} md={6}>
                          <Button variant="contained" onClick={() => navigate('/Settings/User')} sx={{ fontSize: '16px', width: '100%', background: "#ec4e6e", '&:hover': { background: "#c93c58" } }}>ยกเลิก</Button>
                        </Grid>
                        <Grid item sm={8} md={6}>
                          <Button type='submit' variant="contained" color="primary" sx={{ fontSize: '16px', width: '100%' }}>บันทึก</Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                </Grid>

                <Grid item sm={8} md={6}>
                  <Box component={Paper} sx={{ maxWidth: 760 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant='h5' sx={{ margin: '20px', }}>ไซต์ (Site)</Typography>
                      <Box>
                        <Checkbox
                          //  variant="outlined" value="all" onClick={handleChange} 
                          onChange={() => {

                            // const selectAllData = site.map((checkbox) => checkbox.siteID)

                            if (!values.selectAll) {
                              setFieldValue("siteID", selectAllData);
                            } else {
                              setFieldValue("siteID", []);
                            }
                            setFieldValue("selectAll", !values.selectAll);
                          }}
                          checked={values.selectAll}
                          type="checkbox"
                          name="selectAll"
                          sx={{ height: 'fit-content', marginRight: '10px' }}>

                        </Checkbox>
                        <span style={{ fontSize: '18px', marginRight: '20px' }}>Select All</span>
                      </Box>


                    </Box>


                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', padding: '0 20px 20px 20px' }}>
                      {site.map((option, i) =>
                        <ListItem key={i}>
                          <Field
                            // className="mr-2 leading-tight"
                            style={{
                              height: '20px',
                              width: '50px',
                              marginRight: '10px'
                            }}
                            // value={option.siteID}
                            // onChange={handleChange}
                            // checked={option?.isChecked || false}
                            type="checkbox" name="siteID" value={option.siteID} onChange={handleChange}
                          // checked={selected.includes(option)}
                          />
                          <span style={{ fontSize: '18px' }}>{option.siteName}</span>
                        </ListItem>
                      )}


                    </List>
                  </Box>
                </Grid>

              </Grid>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>เปลี่ยนรหัสผ่าน</DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    name="password"
                    label="รหัสผ่านใหม่"
                    type="text"
                    onBlur={handleBlur}
                    value={values.password}
                    onChange={handleChange}
                    fullWidth
                    variant="standard"
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>ยกเลิก</Button>
                  <Button type='submit' onClick={handleClose}>ตกลง</Button>
                </DialogActions>
              </Dialog>
            </Box>
          )}
        </Formik>

        : <Typography variant='h4'>Loading.....</Typography>
      }
    </>

  )
}
