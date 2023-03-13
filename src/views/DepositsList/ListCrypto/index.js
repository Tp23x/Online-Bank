import React from 'react'
import { Box } from '@mui/material';

import DepoListCrypto from './DepoListCrypto'

export default function ListCrypto() {

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ marginTop: 5 }}>
                <DepoListCrypto  />
            </Box>
        </Box>
    )
}
