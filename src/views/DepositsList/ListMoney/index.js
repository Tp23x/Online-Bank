import React from 'react'
import { Box } from '@mui/material';

import DepoListMoney from './DepoListMoney'

export default function ListMoney() {

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ marginTop: 5 }}>
                <DepoListMoney />
            </Box>
        </Box>
    )
}
