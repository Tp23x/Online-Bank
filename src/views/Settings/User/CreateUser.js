import { Box, Grid, TextField, Typography, MenuItem, FormControlLabel, Switch, Button, Paper, List, ListItem, Checkbox, FormHelperText } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import AuthContext from '../../../context/AuthProvider';

// const options = ["COM1", "COM2", "COM3", "COM4", "COM5", "COM6", "COM7"];

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

export default function CreateUser() {
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState([])
  const { createUser } = useContext(AuthContext)

  // const [user, setUser] = useState()
  const [site, setSite] = useState([])
  // const [rows, setRows] = useState([]);

  // const { username } = useParams()

  const { siteList } = useContext(AuthContext)
  const { users_sites_create, getRole } = useContext(AuthContext)

  const navigate = useNavigate()

  // const [selected, setSelected] = useState([]);

  // const location = useLocation()
  // console.log(site)
  // const handleChangeAll = (event) => {
  //   const value = event.target.value;
  //   console.log(value);
  //   if (value === "all") {
  //     setSelected(selected.length === options.length ? [] : options);
  //     return;
  //   }

  //   const list = [...selected];
  //   const index = list.indexOf(value);
  //   index === -1 ? list.push(value) : list.splice(index, 1);
  //   setSelected(list);
  // };

  useEffect(() => {
    siteList(setSite)
  }, [setSite, siteList])

  useEffect(() => {

    if ( site.length === 0 ) {
      setIsLoading(true)
    }else {
      setIsLoading(false)
    }
  },[site, setIsLoading])

  useEffect(() => {
    getRole(setRole)
  }, [getRole, setRole])

  // console.log(role)
  // console.log(site, isLoading)

  // const [role, setRole] = React.useState(0);

  // const handleChangeRole = (event) => {
  //   setRole(event.target.value);
  // };

  // const idrows = rows.filter((item) => item.isChecked === true).map((row) => ({ id: row.siteID }))
  // console.log(idrows);
  // const idrows = rows.map((row) => ({id:row.siteID}))
  // const handleChange = (e) => {

  //   const { value, checked } = e.target;
  //   if (value === 'all') {
  //     let id = site.map((row) => {
  //       return { ...row, isChecked: checked };
  //     });
  //     setSite(id);
  //   } else {
  //     let id = site.map((row) =>
  //       row.siteID === value ? { ...row, isChecked: checked } : row
  //     )
  //     setSite(id);
  //   }
  // }
  // useEffect(() => {


  //   setIsLoading(false)
  // }, [selectAllData])
  // console.log(rows)
  // useEffect(() => {
  //   if (!site) {
  //     setIsLoading(true)
  //   } else {

  //     setRows(site.map((checkbox) => checkbox.siteID))
  //     setIsLoading(false)
  //   }
  // }, [site])

  const selectAllData = site.map((checkbox) => checkbox.siteID)

  //  console.log(selectAllData)

  return (
    <Formik initialValues={{
      
      username: '',
      password: '',
      firstname: '',
      lastname: '',
      email: '',
      roleID: '',
      status: true,
      // checked: [],
      siteID: '',
      selectAll: false,
      submit: null,
    }}
      validationSchema={Yup.object().shape({
        username: Yup.string().max(255).required('กรุณาระบุ Username'),
        password: Yup.string().max(255).required('กรุณาระบุ Password'),
        firstname: Yup.string().max(255).required('กรุณาระบุ ชื่อ'),
        lastname: Yup.string().max(255).required('กรุณาระบุ นามสกุล'),
        email: Yup.string().max(255).required('กรุณาระบุ Email'),
      })}
      onSubmit={async (value, { setErrors, setStatus, setSubmitting }) => {
        try {
          createUser(value, users_sites_create)
          // console.log(value)
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
                <Typography variant='h4' sx={{ marginBottom: '20px' }}>เพิ่มผู้ใช้</Typography>
                <FormControlLabel control={<Switch name='status' checked={values.status} onChange={handleChange} />} label="สถานะ" />
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
                    required
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
                  <TextField
                    error={Boolean(touched.password && errors.password)}
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
                  )}
                </Grid>
                <Grid item sm={8} md={6}>
                  <TextField
                    error={Boolean(touched.email && errors.email)}
                    label="Email"
                    type="email"
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

                <Grid item sm={8} md={6} sx={{ marginTop: '20px' }}>
                  <Grid container spacing={{ xs: 1, md: 2 }} columns={{ sm: 8, md: 12 }}>
                    <Grid item sm={8} md={6}>
                      <Button variant="contained" onClick={() => navigate('/Settings/User')} sx={{ fontSize: '16px', width: '100%', background:"#ec4e6e",'&:hover': {background:"#c93c58"}  }}>ยกเลิก</Button>
                    </Grid>
                    <Grid item sm={8} md={6}>
                      <Button type='submit' variant="contained" color="primary" sx={{ fontSize: '16px', width: '100%' }}>ตกลง</Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

            </Grid>

            <Grid item sm={8} md={6}>
              <>
                {!isLoading ?

                  // {site.map((checkbox) => checkbox.siteID)}
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
                              marginRight:'10px'
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
                  : ''}
              </>
            </Grid>



          </Grid>
        </Box>

      )}
    </Formik>
  )
}
