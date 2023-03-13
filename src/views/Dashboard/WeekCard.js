import React from 'react'
import Chart from 'react-apexcharts';
import MainCard from './MainCard';
import ContentCard from './ContentCard';
import { DateTime } from "luxon";
import { Typography } from '@mui/material';


const chartData = {
    type: 'line',
    height: 120,
    options: {
        chart: {
            sparkline: {
                enabled: true
            }
        },
        dataLabels: {
            enabled: false
        },
        colors: ['#fff'],
        fill: {
            type: 'solid',
            opacity: 1
        },
        stroke: {
            curve: 'smooth',
            width: 3
        },
        yaxis: {
            min: 0,
            max: 100
        },
        tooltip: {
            shared: false,
            intersect: true,
            x: {
              show: false
            }
          },
    },
    series: [
        {
            data: [35, 44, 9, 54, 45, 66, 41, 69]
        }
    ]
};
const title= 'This Week'

export default function WeekCard({set}) {
    const startDate = DateTime.fromJSDate(new Date()).startOf("week").toFormat('yyyy-MM-dd')
    const endDate = DateTime.fromJSDate(new Date()).endOf("week").toFormat('yyyy-MM-dd')
    return (
        <MainCard color={'#39d5cf'}>
            <Chart {...chartData} />
            <ContentCard siteID={set} startDate={startDate} endDate={endDate} title={title}/>
            {/* <ContentCard data={data} /> */}
            {/* <Typography>{DateTime.fromJSDate(new Date()).startOf("week").toFormat('yyyy-MM-dd')}</Typography>
            <Typography>{DateTime.fromJSDate(new Date()).endOf("week").toFormat('yyyy-MM-dd')}</Typography> */}
        </MainCard>
    )
}
