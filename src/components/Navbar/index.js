import { TabList } from "@mui/lab"
import { Avatar, Box, Container, Tab, Typography, Menu, MenuItem, ListItemIcon, Button, Fade, Card, List, ListItem, ListItemText, Divider } from "@mui/material"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Logout from '@mui/icons-material/Logout';
import NotificationSound from "../../assets/sound/notification-sound.mp3"
import api from '../../components/api/api'
import { Link, useNavigate } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import React, { useEffect, useState, useRef } from 'react'
import moment from "moment";
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { notiDepoAsync } from '../../store/slices/notiDepoSlice';
import { notiWitDAsync } from '../../store/slices/notiWitDSlice';

function Navbar({ handleChange, tabsData }) {
  const { notiDepo } = useSelector(state => state.notiDepo)
  const { notiWitD } = useSelector(state => state.notiWitD)
  const [isLoading, setIsLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorE2, setAnchorE2] = useState(null);
  // const [Trashnoti, setTrashnoti] = useState([]);
  const [Notideposit, setNotideposit] = useState(notiDepo.length);
  // const [newNotideposit, setNewNotideposit] = useState([]);
  const [Notiwithdraw, setNotiwithdraw] = useState(notiWitD.length);
  // const [newNotiwithdraw, setNewNotiwithdraw] = useState([]);
  const [anchorElwithdraw, setAnchorElwithdraw] = useState(null);
  const dispatch = useDispatch()

  const navigate = useNavigate();

  const audioPlayer = useRef(null);

  //////////////////////  เมนูถอน 
  const openwithdraw = Boolean(anchorElwithdraw);
  const handleClickwithdraw = (event) => {
    setAnchorElwithdraw(event.currentTarget);
  };
  const handleClosewithdraw = () => {
    setAnchorElwithdraw(null);
  };

  ///////////////////// เมนูฝาก
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  ///////////////////// เมนูlogout

  const openMenu = Boolean(anchorE2);

  const handleClickMenu = (event) => {
    setAnchorE2(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorE2(null);
  };


  const profile = localStorage.getItem('profile')
  const user = (JSON.parse(profile)?.profile)

  useEffect(() => {
    if (!user) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
  }, [user])

  // const navigate = useNavigate()
  const handleLogOut = async (event) => {
    // event.preventDefault();
    localStorage.removeItem("accessToken")
    localStorage.removeItem("profile")
    navigate('/login')
  }


  useEffect(() => {
    if (Notideposit !== notiDepo.length) {
      setNotideposit(notiDepo.length)
    } 
    if (Notideposit < notiDepo.length) {
      audioPlayer.current.play();
    }
    if (Notiwithdraw !== notiWitD.length) {
      setNotiwithdraw(notiWitD.length)
    } 
    if (Notiwithdraw < notiWitD.length) {
      audioPlayer.current.play();
    }

  }, [notiDepo, notiWitD, setNotideposit, setNotiwithdraw])
  //Deposit

  // const getNotiDeposit = async () => {
  //   await api.get(`api/v1.0/notification/list?typeTranID=1`)
  //     .then((response) => response.data)
  //     .then((data) => {
  //       if (data.status === true) {
  //         // console.log('succes')
  //         setNotideposit(data.result)
  //         setIsLoading(false)
  //       } else {
  //         console.log('failed')
  //       }
  //     });
  // }
  //  const getNotiWitD = async () => {
  //     await api.get(`api/v1.0/notification/list?typeTranID=2`)
  //     .then((response) => response.data)
  //     .then((data) => {
  //       if (data.status === true) {
  //         // console.log('succes')

  //         setNotiwithdraw(data.result)
  //       } else {
  //         console.log('failed')
  //       }
  //     }) }
  // useEffect(() => {
  //   getNotiDeposit()
  //   setInterval(() => {

  //     api.get(`api/v1.0/notification/list?typeTranID=1`)
  //       .then((response) => response.data)
  //       .then((data) => {
  //         if (data.status === true) {
  //           // console.log('succes', data.result)
  //           setNewNotideposit(data.result)
  //           setIsLoading(false)
  //         } else {
  //           console.log('failed')
  //         }
  //       });

  //   }, 1000 * 35)
  //   // const componentWillUnmount = () => {
  //   //   clearInterval(intervalId)
  //   // }
  //   // componentWillUnmount()

  // }, [setNewNotideposit]);


  // if (newNotideposit > Notideposit) {
  //   audioPlayer.current.play();
  //   setNotideposit(newNotideposit)
  // }





  //withdraw
  // useEffect(() => {

  // const getNotiWitD = async () => {
  //   await api.get(`api/v1.0/notification/list?typeTranID=2`)
  //   .then((response) => response.data)
  //   .then((data) => {
  //     if (data.status === true) {
  //       // console.log('succes')

  //       setNotiwithdraw(data.result)
  //     } else {
  //       console.log('failed')
  //     }
  //   }) }
  //   getNotiWitD()
  // setInterval(() => {
  //   const getNewNotiWitD = async () => {
  //      await api.get(`api/v1.0/notification/list?typeTranID=2`)
  //     .then((response) => response.data)
  //     .then((data) => {
  //       if (data.status === true) {
  //         // console.log('succes', data.result)
  //         setNewNotiwithdraw(data.result)
  //       } else {
  //         console.log('failed')
  //       }
  //     });
  //   }

  //   getNewNotiWitD()


  // }, 1000 * 10)
  // const componentWillUnmount = () => {
  //   clearInterval(intervalId)
  // }
  // componentWillUnmount()


  // }, [setNotiwithdraw, setNewNotiwithdraw]);
  // console.log(Notideposit, notiDepo.length, Notiwithdraw, notiWitD.length);
  // if (newNotiwithdraw > Notiwithdraw) {
  //   audioPlayer.current.play();
  //   setNotiwithdraw(newNotiwithdraw)
  // }


  ///////////// อ่านเเจ้งเตือน
  const postRead = async (option) => {
    try {
      const result = await api.post(`api/v1.0/notification/read`, {
        "notificationID": option.notificationID,
        "isRead": true
      },
      ).then((response) => response.data)
        .then((data) => {
          if (data.status === true) {
            dispatch(notiDepoAsync());
            dispatch(notiWitDAsync());          }
        });
    } catch (error) {
      console.log("error => ", error);
    }
  };

  ///////////// ลบเเจ้งเตือน

  const postTrash = async (option) => {
    try {
      const result = await api.post(`api/v1.0/notification/trash`, {
        "notificationID": option.notificationID,
        "isTrash": true
      },
      ).then((response) => response.data)
        .then((data) => {
          if (data.status === true) {
            dispatch(notiDepoAsync());
            dispatch(notiWitDAsync());
          }
        });
    } catch (error) {
      console.log("error => ", error);
    }
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', }}>
      <Container maxWidth="1800px" sx={{ display: 'flex', justifyContent: 'space-between' }}>

        <TabList
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          sx={{
            '& .MuiTabs-flexContainer': {
              height: '100%',
            }
          }}>
          {tabsData.map((item, i) =>
            <Tab component={Link} key={i} label={item.label} value={item.value} sx={{ fontSize: '18px' }} to={`${item.href}`} />
          )}
        </TabList>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            <Box sx={{ display: 'flex', padding: "10px 20px", background: '#0069d9', color: '#fff', borderRadius: '50px', marginRight: '10px', cursor:'pointer' }}
              onClick={handleClick}
            >
              <Typography >ฝาก</Typography>
              <Typography sx={{ background: '#fff', color: '#000', display: 'flex', alignItems: 'center', fontSize: '14px', padding: '0 5px', borderRadius: '3px', marginLeft: '5px' }}>
                <audio ref={audioPlayer} src={NotificationSound} />
                {notiDepo.filter((item) => item.isRead === false).length}
              </Typography>
            </Box>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}

            >
              <Card
                sx={{ display: 'flex', marginTop: "-8px", padding: "4px 100px", color: "#fff", backgroundColor: "#1A5276", width: '100%', maxWidth: 360, justifyContent: "center", fontWeight: 500 }} >Notification</Card>
              <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', padding: "2px 6px", }}>
                {notiDepo.map((option, i) =>
                  <div key={i}>
                    <ListItem alignItems="flex-start" onClick={(e) => postRead(option)} sx={{ background: `${option.isRead === true ? "#fff" : "#DCEBF5"}`, padding: " 6px", cursor: "pointer", '&:hover': { '& .MuiTypography-root': { color: '#2980B9' } } }}>
                      <ListItemText onClick={() => navigate(`/DepositsList/DepoListUnknow/InformationDetail/${option.tscBankAccountID}`)}
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: 'inline', fontSize: 16, fontWeight: "700", transition: '.5s' }}
                              component="span"
                              variant="body2"
                              color="text.primary"

                            >
                              {option.title}
                            </Typography>
                            <Typography sx={{ transition: '.5s', fontSize: 14 }}>{option.description}</Typography>
                            <Typography sx={{ fontSize: 10, fontWeight: 600, transition: '.5s' }}> {moment(option.createDate).format("DD-MM-YYYY HH:mm")}</Typography>
                          </React.Fragment>
                        }
                      />
                      <Box sx={{ color: '#1C3CCA' }}>
                        <DeleteIcon onClick={(e) => postTrash(option)} />
                      </Box>
                    </ListItem>
                    <Divider />
                  </div>
                )}
              </List>

            </Menu>

            <Box sx={{ display: 'flex', padding: "10px 20px", background: '#0069d9', color: '#fff', borderRadius: '50px', cursor:'pointer' }}
              onClick={handleClickwithdraw}
            >
              <Typography>ถอน</Typography>
              <Typography sx={{ background: '#fff', color: '#000', display: 'flex', alignItems: 'center', fontSize: '14px', padding: '0 5px', borderRadius: '3px', marginLeft: '5px' }}>{notiWitD.filter((item) => item.isRead === false).length}</Typography>
            </Box>
            <Menu
              anchorEl={anchorElwithdraw}
              open={openwithdraw}
              onClose={handleClosewithdraw}
              sx={{ borderRadius: "40px" }}
            >
              <Card sx={{ display: 'flex', marginTop: "-8px", padding: "4px 100px", color: "#fff", backgroundColor: "#C0392B", width: '100%', maxWidth: 360, justifyContent: "center", fontWeight: 500 }} >Notification</Card>
              <Box></Box>
              <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', padding: "2px 6px" }}>
                {notiWitD.map((option, i) =>
                  <div key={i}>
                    <ListItem alignItems="flex-start" onClick={(e) => postRead(option)} sx={{ background: `${option.isRead === true ? "#fff" : "#DCEBF5"}`, padding: " 6px", cursor: "pointer", '&:hover': { '& .MuiTypography-root': { color: '#2980B9' } } }}>
                      <ListItemText onClick={() => navigate(`/WithdawList/ListMoney/Detail/${option.tscBankAccountID}`)}
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: 'inline', fontSize: 16, fontWeight: "700", transition: '.5s' }}
                              component="span"
                              variant="body2"
                              color="text.primary"

                            >
                              {option.title}
                            </Typography>
                            <Typography sx={{ transition: '.5s', fontSize: 14 }}>{option.description}</Typography>
                            <Typography sx={{ fontSize: 10, fontWeight: 600, transition: '.5s' }}> {moment(option.createDate).format("DD-MM-YYYY HH:mm")}</Typography>
                          </React.Fragment>
                        }
                      />
                      <Box sx={{ color: '#FE0202' }}>
                        <DeleteIcon onClick={(e) => postTrash(option)} />
                      </Box>
                    </ListItem>
                    <Divider />
                  </div>
                )}
              </List>

            </Menu>

          </Box>
          <Box sx={{ display: 'flex', margin: '1.2rem', alignItems: 'center' }} onClick={handleClickMenu}>

            {!isLoading ?
              <Box sx={{ display: { xs: 'none', sm: 'none', lg: 'block' }, width: '100px', textAlign: 'end', marginRight: '10px' }}>
                <Typography variant="h6">{user.firstname}</Typography>
                <Typography>{user.role}</Typography>
              </Box> :
              <Box sx={{ display: { xs: 'none', sm: 'none', lg: 'block' }, width: '100px', textAlign: 'end', marginRight: '10px' }}>
                <Typography variant="h6">...</Typography>
                <Typography>...</Typography>
              </Box>}
            <Box

              sx={{ display: 'contents' }}>
              <Avatar sx={{ width: '48px', height: '48px' }}>
                <PersonIcon sx={{ fontSize: '32px' }} />
              </Avatar>
              <KeyboardArrowDownIcon />

            </Box>


          </Box>
          <Menu
            anchorEl={anchorE2}
            open={openMenu}
            onClose={handleClickMenu}
            onClick={handleCloseMenu}
            style={{
              top: '45px',
              left: '-20px',
            }}
            PaperProps={{
              elevation: 0,

              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          >

            <MenuItem onClick={handleLogOut}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Container >
    </Box >
  )
}

export default Navbar