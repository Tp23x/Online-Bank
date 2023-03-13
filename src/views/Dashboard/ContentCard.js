import { Avatar, Box, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../context/AuthProvider'

export default function ContentCard({ siteID, startDate, endDate, title }) {

    const { get_dashboard_top } = useContext(AuthContext)

    const [dashboardSum, setDashboardSum] = useState()
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        get_dashboard_top(siteID, startDate, endDate, setDashboardSum)
    }, [siteID, startDate, endDate, setDashboardSum])
    // console.log(dashboardSum)
    useEffect(() => {
        if (!dashboardSum) {
            setIsLoading(true)
        } else {
            setIsLoading(false)
        }
    })
    return (
        <>
            {!isLoading ? <Box sx={{ display: 'flex', position: 'relative' }}>
                <Box>
                    <Typography variant="h4" sx={{ color: '#fff', fontWeight: 'bold' }}>
                        {parseFloat(dashboardSum.sum, 10).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                    </Typography>
                    <Typography variant="h7" sx={{ color: '#fff' }}>
                        {title}
                    </Typography>
                </Box>
                <Avatar sx={{ position: 'absolute', bottom: '10px', right: '10px', background: 'rgb(0 0 0 / 26%)', transform: 'rotate(-45deg)' }}>
                    <span className="material-symbols-outlined">
                        arrow_forward
                    </span>
                </Avatar>
            </Box> : '...'}
        </>
    )
}
