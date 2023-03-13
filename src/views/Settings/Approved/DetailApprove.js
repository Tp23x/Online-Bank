import { Box, Grid, TextField, Typography, Button, Paper, List, ListItem, Checkbox } from '@mui/material'
import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
import { Formik } from 'formik';
import AuthContext from '../../../context/AuthProvider';
import api from '../../../components/api/api'
// import configData from '../../../config.json'
// const api_url = configData.REACT_APP_BASE_API
// let api_url = window.REACT_APP_BASE_API || process.env.REACT_APP_BASE_API


// const options = ["COM1", "COM2", "COM3", "COM4", "COM5", "COM6", "COM7"];


export default function DetailApprove() {

  const [selected, setSelected] = useState([]);
  const [rows, setRows] = useState([]);
  const [amount, setAmount] = useState(0)
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate()
  /*   const [siteName, setSiteName] = useState('')
    const [confirmAmount, setConfirmAmount] = useState('') */
  useEffect(() => {
    api.get(`api/v1.0/confirm`, {
      headers: { 'Content-Type': 'application/json' }
    }).then((response) => {
      setRows(response.data.result);
      setIsLoading(false)
    });




  }, [])
  const idrows = rows.filter((item) => item.isChecked === true).map((row) => ({ id: row.siteID }))
  console.log(idrows);
  // const idrows = rows.map((row) => ({id:row.siteID}))
  const handleChange = (e) => {

    const { value, checked } = e.target;
    if (value === 'all') {
      let id = rows.map((row) => {
        return { ...row, isChecked: checked };
      });
      setRows(id);
    } else {
      let id = rows.map((row) =>
        row.siteID === value ? { ...row, isChecked: checked } : row
      )
      setRows(id);
    }
  }
    ;
  // const idrows = rows.map((row) => ({id:row.siteID}))
  //   console.log(selected);
  // const handleChangeAll = (event) => {
  //   const value = event.target.value;
  //   // console.log(value);
  //   console.log(rows);

  //   if (value === "all") {
  //     setSelected(selected.length === idrows.length ? [] : idrows);
  //     return;
  //   }

  //   const list = [...selected];
  //   const index = list.indexOf(value);
  //   index === -1 ? list.push(value) : list.splice(index, 1);

  //   setSelected(list);

  // };


  // const handleChange = (event) => {
  //   const value = event.target.value;

  //   const data = {
  //     id: value
  //   }

  //   const check = selected.findIndex(e => e.id === value)
  //   if (check !== -1) {
  //   // if (selected === 'all') {
  //     selected.splice(check, 1);
  //     // console.log(newList);
  //     setSelected(selected)
  //   } else {
  //     setSelected([...selected, data])
  //   }

  //   // console.log(check);

  // };

  /* const checkSiteID = (siteID, setsite, setIsLoading) => {
    axios.get(`${api_url}api/v1.0/site/detail/${siteID}`).then((response) => response.data)
      .then((data) => {
        if (data.status === true) {
          setsite(data.result)
          setIsLoading(false)
        } else {
          console.log('failed')
        }
      });
  } */

  const { siteID } = useParams()
  const [detail, setDetail] = useState();
  const { updateAmount } = useContext(AuthContext)


  useEffect(() => {
    api.put(`api/v1.0/site/detail/${siteID}`)


      .then((response) => response.data)
      .then((data) => {
        if (data.status === true) {
          console.log('succes')
          setDetail(data.result)
          setIsLoading(false)

        } else {
          console.log('failed')
        }
      });
    // GET request using axios inside useEffect React hook

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  /* const updateSiteID = (value) => {
    axios.put(`${api_url}api/v1.0/site/update/${value.confirmAmount}`, value, {
      headers: { 'Content-Type': 'appplication/json' }
    }).then((response) => response.data)
      .then((data) => {
        if (data.status === true) {
          console.log('Succes')
          navigate('/Approved/ApproList')
        } else {
          console.log('failed')
        }
      });
  } */


  const SavePayment = () => {
    if (idrows.length !== 0 && amount !== 0) {
      const data = {
        confirmAmount: amount,
        siteId: idrows
      }
      console.log(data);
      updateAmount(data)
    }
  }


  return (
    <>
      {!isLoading ?

        <Box sx={{ width: '100%' }}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ sm: 8, md: 12 }}>
            <Grid item sm={8} md={6}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant='h4' sx={{ marginBottom: '20px' }}>รายละเอียดยอดเงินอนุมัติ</Typography>
              </Box>

              <Grid container spacing={{ xs: 1, md: 2 }} columns={{ sm: 8, md: 12 }}>
                <Grid item sm={8} md={6}>
                  <TextField
                    required
                    id="outlined-required"
                    label="จำนวนเงิน"
                    name='confirmAmount'
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    type="number"
                    sx={{ width: '100%', marginTop: '50px' }}
                  />
                </Grid>

                <Grid item sm={8} md={6}></Grid>
                <Grid item sm={8} md={6} sx={{ marginTop: '20px' }}>
                  <Grid container spacing={{ xs: 1, md: 2 }} columns={{ sm: 8, md: 12 }} sx={{ marginLeft: "50px" }} >
                    <Grid item sm={8} md={6} >
                      <Button variant="contained" sx={{ Width: "100%", backgroundColor: "#eb4e6e", '&:hover': { background: '#ef2851' }, padding: "10px 60px", fontSize: "15px", margin: "10px", marginLeft: "20px" }} onClick={() => navigate('/Settings/Site')}>กลับ</Button>
                    </Grid>
                    <Grid item sm={8} md={6}>
                      <Button variant="contained" onClick={SavePayment} sx={{ Width: "100%", backgroundColor: "#4086f5", padding: "10px 60px", fontSize: "15px", margin: "10px", marginLeft: "20px" }} >บันทึก</Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

            </Grid>
            <Grid item sm={8} md={6}>
              <Box component={Paper} sx={{ maxWidth: 760 }}>
                <Grid container spacing={{ xs: 1, md: 2 }} columns={{ sm: 8, md: 12 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'between', alignItems: 'center' }}>
                    <Typography variant='h5' sx={{ margin: '20px', }}>ไซต์ (Site)</Typography>
                    <Checkbox value="all" type='checkbox' checked={rows.filter((row) => row?.isChecked !== true).length < 1} onClick={handleChange} sx={{ height: 'fit-content', marginRight: '2px' }} /><span style={{ fontSize: '18px', fontWeight: '500' }}>เลือกทั้งหมด</span>

                  </Box>
                </Grid>

                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', padding: '0 20px 20px 20px' }}>
                  {rows.map((option, i) =>
                    <ListItem key={i} disablePadding>
                      <Checkbox
                        value={option.siteID}
                        checked={option?.isChecked || false}
                        onChange={handleChange}
                      // checked={selected.includes(option)}
                      />
                      <span style={{ fontSize: '18px' }}>{option.siteName}</span>
                      <span style={{ fontSize: '18px', marginLeft: '20px' }}>({parseInt(option.confirmAmount, 10).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')})</span>
                    </ListItem>
                  )}

                </List>
              </Box>
            </Grid>
          </Grid>


        </Box>
        : ''}
    </>


  )
}
