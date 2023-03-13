import { Box, Drawer, List, ListItem, ListItemAvatar, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom'
import React from 'react'
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import logo from '../../assets/images/logo.png';

const ListSideBar = [
    { herf: '/', icon: 'home', title: 'Dashboard' },
    { herf: '/DepositsList/ListMoney', icon: 'savings', title: 'รายการฝาก' },
    { herf: '/WithdawList/ListMoney', icon: 'account_balance', title: 'รายการถอน' },
    { herf: '/Report', icon: 'pie_chart', title: 'รายงาน' },
    { herf: '/Settings/User', icon: 'settings', title: 'ตั้งค่า' }]

function Sidebar() {
    const [value, setValue] = React.useState('recents');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Drawer sx={{
                width: '100px', display: { xs: 'none', sm: 'none', md: 'flex' }, flexShrink: 0, '& .MuiDrawer-paper': {
                    width: '100px',
                    boxSizing: 'border-box',
                },
            }} variant="permanent" anchor="left">
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
                    <img src={logo} alt="Logo" />
                </Box>

                <List sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
                    {ListSideBar.map((listItem, i) =>

                        <ListItem component={NavLink} key={i} to={listItem.herf} sx={{
                            justifyContent: 'center', marginBottom: '30px', '&.active': {
                                color: 'primary.main',

                                '&:before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: '26px',
                                    left: '-31px',
                                    width: '64px',
                                    height: '8px',
                                    borderRadius: '25px 25px 0 0',
                                    background: '#1976d2',
                                    transform: 'translateY(-50%) rotate(90deg)',
                                }
                            },
                            '&:hover': {
                                "& .MuiTypography-root": {
                                    opacity: '1',
                                    zIndex: '10000',
                                    transform: 'translateX(0px)'
                                },
                                "& .MuiListItemAvatar-root": {
                                    color: 'primary.main',
                                }
                            }
                        }}>
                            <Typography variant='h6' sx={{
                                position: 'absolute', top: '44px', opacity: '0', fontSize: '16px', color: 'primary.main', transition: '.5s',
                                transform: 'translateX(20px)'
                            }}>{listItem.title}</Typography>
                            <ListItemAvatar sx={{
                                display: 'contents', color: 'primary.light', transition: '.5s'
                            }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '40px' }}>
                                    {listItem.icon}
                                </span>

                            </ListItemAvatar>
                        </ListItem>

                    )}

                </List>
            </Drawer >
            <BottomNavigation sx={{
                width: '100%',
                position: 'absolute',
                bottom: '0',
                zIndex: '999',
                display: { sm: 'flex', md: 'none' }
            }} value={value} onChange={handleChange}>
                {ListSideBar.map((listItem, i) =>
                    <BottomNavigationAction
                        key={i}
                        component={NavLink}
                        label={listItem.title}
                        value={listItem.title}
                        to={listItem.herf}
                        icon={<span className="material-symbols-outlined" style={{ fontSize: '32px' }}>
                            {listItem.icon}
                        </span>}
                    />)}
            </BottomNavigation>
        </>

    )
}

export default Sidebar