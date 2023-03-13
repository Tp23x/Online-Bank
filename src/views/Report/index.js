import React, { useContext, useEffect, useState} from 'react'
import { TabContext } from '@mui/lab';
import { Box, Container, Grid, Typography, FormControl, Select, MenuItem, Button, InputLabel, TextField, TableContainer } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Navbar from '../../components/Navbar'
import AccountBalance from './AccountBalance';
import WalletBalance from './WalletBalance';
import AccountMovementReport from './AccountMovementReport';
import WalletMovementReport from './WalletMovementReport';
import AuthContext from '../../context/AuthProvider';
import api from '../../components/api/api'

export default function Report() {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  const tabsReportData = [{ label: 'รายงาน', value: '1' }]

  const [reportName, setReportName] = useState(10);
  const [typeName, setTypeName] = useState('');
  const [siteName, setSiteName] = useState('');
  const [nameAcc, setNameAcc] = useState('');
  const [site, setSite] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState({})
  const [reportBankacc, setReportBankacc] = useState([])
  const [reportWalletBankacc, setReportWalletBankacc] = useState([])
  const [reportBankaccMovement, setReportBankaccMovement] = useState([])
  const [reportWalletBankaccMovement, setReportWalletBankaccMovement] = useState([])

  const { 
    getReportBankacc, 
    getReportWalletBankacc, 
    getReportBankaccMovement, 
    getReportWalletBankaccMovement, 
     } = useContext(AuthContext)


  const handleSelectReport = (event) => {
    setReportName(event.target.value);
  };
  const handleSelectType = (event) => {
    setTypeName(event.target.value);
  };
  const handleSelectSite = (event) => {
    setSiteName(event.target.value);
  };
  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
  const bType = [
    {
      title: 'ลูกค้า',
      bankType: 'C'
      
    },
    {
      title: 'ผู้ให้บริการ',
      bankType: 'E'
    }
  ]

  useEffect(() => {
    api.get(`api/v1.0/users/sites/getuserbytoken`)
      .then((response) => response.data)
      .then((data) => {
        if (data.status === true) {
          setSite(data.result)
          // console.log('succes')
          setIsLoading(false)
        } else {
          console.log('failed')
        }
      });
  }, [setIsLoading])

  const handleSubmit = (e) => {
    const body = {
      bankType: typeName, siteID: siteName, startdate: convert(startDate), enddate: convert(endDate), bankAccNo: nameAcc
    }
    setData(body)

  }
  const handleClear = (e) => {

    setTypeName('')
    setSiteName('')
    setNameAcc('')
    setStartDate(new Date())
    setEndDate(new Date())
    setReportBankacc([])
    setReportWalletBankacc([])
    reportBankaccMovement([])
    setReportWalletBankaccMovement([])
  }
   
 useEffect(() => {
      getReportBankacc(setReportBankacc, data)
      getReportWalletBankacc(setReportWalletBankacc, data)
      getReportBankaccMovement(setReportBankaccMovement, data)
      getReportWalletBankaccMovement(setReportWalletBankaccMovement, data)
   
    }, [data])
    // console.log(data)
   
  return (

    <>
      {!isLoading ? <TabContext value={value}>
        <Box sx={{ width: '100%' }}>
          <Navbar handleChange={handleChange} tabsData={tabsReportData}>
          </Navbar>
          <Box sx={{ marginTop: '50px', height: '80vh', overflowY: 'auto' }}>
            <Container maxWidth={false} sx={{ maxWidth: '1800px', marginBottom: '60px' }}>
              <Typography variant='h4'>รายการค้นหา</Typography>
              <Grid container spacing={3} columns={{ xs: 4, sm: 8, md: 14 }} sx={{ marginBottom: '20px' }}>
                <Grid item xs={4} sm={4} md={6}>
                  <FormControl sx={{ m: 1, width: '100%' }}>
                    <Select
                      value={reportName}
                      onChange={handleSelectReport}
                      displayEmpty
                    >
                      <MenuItem value={10}>รายงานเคลื่อนไหวของบัญชี</MenuItem>
                      <MenuItem value={20}>รายงานเคลื่อนไหวของวอลเล็ท</MenuItem>
                      <MenuItem value={30}>รายงานบัญชียอดคงเหลือ</MenuItem>
                      <MenuItem value={40}>รายงานยอดคงเหลือวอลเล็ท</MenuItem>
                    </Select>
                  </FormControl>
                  <Grid container spacing={3} columns={{ xs: 4, sm: 8, md: 6 }}>
                    <Grid item xs={4} sm={8} md={3}>
                      <FormControl sx={{ m: 1, width: '100%' }}>
                        <InputLabel>ประเภท</InputLabel>
                        <Select
                          value={typeName}
                          onChange={handleSelectType}
                          displayEmpty
                          label="ประเภท"
                        >
                          {bType.map((option, i) => (
                            <MenuItem key={i} value={option.bankType}>
                              {option.title}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={4} sm={8} md={3}>
                      <FormControl sx={{ m: 1, width: '100%' }}>
                        <InputLabel>ไซต์</InputLabel>
                        <Select
                          value={siteName}
                          onChange={handleSelectSite}
                          displayEmpty
                          label="ไซต์"
                        >
                          {site.map((option) => (
                            <MenuItem key={option.siteID} value={option.siteID}>
                              {option.siteName}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={4} sm={4} md={6}>
                  <Grid container spacing={3} columns={{ xs: 4, sm: 8, md: 6 }}>
                    <Grid item xs={4} sm={8} md={3}>
                      <DesktopDatePicker
                        label="วันที่เริ่มต้น"
                        defaultShow={true}
                        value={startDate}
                        onChange={(newStartDate) => {
                          setStartDate(newStartDate);
                        }}
                        renderInput={(params) => <TextField {...params} sx={{ m: 1, width: '100%' }} />}
                      />
                    </Grid>
                    <Grid item xs={4} sm={8} md={3}>
                      <DesktopDatePicker
                        label="วันที่สิ้นสุด"
                        defaultShow={true}
                        value={endDate}
                        onChange={(newEndDate) => {
                          setEndDate(newEndDate);
                        }}
                        renderInput={(params) => <TextField {...params} sx={{ m: 1, width: '100%' }} />}
                      />
                    </Grid>
                  </Grid>
                  <TextField
                    id="outlined-required"
                    label="เลขบัญชี หรือ ชื่อวอลเล็ท"
                    value={nameAcc}
                    onChange={e => setNameAcc(e.target.value)}
                    sx={{ m: 1, width: '100%' }}
                  />
                </Grid>
                <Grid item xs={4} sm={4} md={2}>
                  <Grid container spacing={1} columns={{ xs: 4, sm: 8, md: 2 }}>
                    <Grid item xs={2} sm={4} md={2}>
                      <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ fontSize: '1.375em', width: '100%', m: 1 }}>ค้นหา</Button>
                    </Grid>
                    <Grid item xs={2} sm={4} md={2}>
                      <Button variant="contained" color="error" onClick={handleClear} sx={{ fontSize: '1.375em', width: '100%', m: 1 }}>ล้างข้อมูล</Button>
                    </Grid>
                  </Grid>
                </Grid>

              </Grid>
              <AccountMovementReport reportName={reportName} reportBankaccMovement={reportBankaccMovement} data={data}/>
              <WalletMovementReport reportName={reportName} reportWalletBankaccMovement={reportWalletBankaccMovement} data={data}/>
              <AccountBalance reportName={reportName} reportBankacc={reportBankacc} data={data}/>
              <WalletBalance reportName={reportName} reportWalletBankacc={reportWalletBankacc} data={data}/>
            </Container>
          </Box>
        </Box>
      </TabContext> : ''}
    </>

  )
}
