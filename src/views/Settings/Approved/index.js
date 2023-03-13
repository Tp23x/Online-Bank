import React from 'react'
import { Box} from '@mui/material';
import DetailApprove from './DetailApprove';



export default function Approved() {


    return (
        <Box sx={{ width: '100%' }}>
                {/* <Box sx={{ display: 'flex', gridAutoRows: "auto" }}>
                    <Typography variant='h4'>รายการข้อมูลยอดเงินอนุมัติ</Typography>
                </Box> */}
               <DetailApprove/>
        </Box>
    )
}
