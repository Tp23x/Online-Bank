import React from 'react'
import Chart from 'react-apexcharts';
import MainCard from './MainCard';
import ContentCard from './ContentCard';
import { Typography } from '@mui/material';
import { DateTime } from "luxon";


const chartData = {
    type: 'line',
    height: 120,
    options: {
        chart: {
            sparkline: {
                enabled: true
            },
            stacked: false

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
const title= 'Today'

export default function TodayCard({set}) {

    // console.log(set)
    const startDate = DateTime.fromJSDate(new Date()).startOf("day").toFormat('yyyy-MM-dd')
    const endDate = DateTime.fromJSDate(new Date()).endOf("day").toFormat('yyyy-MM-dd')
    return (
        <MainCard color={'#2d62ed'}>
            <Chart {...chartData} />
            <ContentCard siteID={set} startDate={startDate} endDate={endDate} title={title}/>
            {/* <Typography>{DateTime.fromJSDate(new Date()).startOf("day").toFormat('yyyy-MM-dd')}</Typography>
            <Typography>{DateTime.fromJSDate(new Date()).endOf("day").toFormat('yyyy-MM-dd')}</Typography> */}
        </MainCard>
    )
}
