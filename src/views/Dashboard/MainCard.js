import { Card } from '@mui/material'
import React from 'react'

export default function MainCard({ children, color }) {
    return (
        <Card sx={{
            maxWidth: 420,
            minHeight: 245,
            background: `${color}`,
            borderRadius: '20px',
            padding: '15px 25px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        }}>
            {children}
        </Card>
    )
}
