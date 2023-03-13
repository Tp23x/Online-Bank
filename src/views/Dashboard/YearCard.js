import React from 'react'
import Chart from 'react-apexcharts';
import MainCard from './MainCard';
import ContentCard from './ContentCard';
import { DateTime } from "luxon";
import { Typography } from '@mui/material';
const chartData = {
    type: 'line',
    width: '100%',
    height: 135,
    options: {
        stroke: {
            curve: "smooth"
        },
        chart: {
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: false,
            }
        },
        fill: {
            type: "solid",
        },
        colors: ['#fff'],
        markers: {
            size: 0
        },
        xaxis: {
            labels: {
                show: false,
            }
        },
        yaxis: {
            labels: {
                show: false,
                align: 'right',
                minWidth: 0,
                maxWidth: 160,
                style: {
                    colors: '#fff',
                    fontSize: '12px',
                    fontWeight: 400,
                    cssClass: 'apexcharts-yaxis-label',
                },
            }
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
            name: "TEAM A",
            data: [0.5, 0.7, 1, 1.3, 1.7]
        },

    ]

};
// const data = { title: 'This Year', number: '1.82M' }
const title= 'This Year'


export default function YearCard({set}) {
    const startDate = DateTime.fromJSDate(new Date()).startOf("year").toFormat('yyyy-MM-dd')
    const endDate = DateTime.fromJSDate(new Date()).endOf("year").toFormat('yyyy-MM-dd')
    return (
        <MainCard color={'#7d00b5'}>
            <Chart {...chartData} />
            <ContentCard siteID={set} startDate={startDate} endDate={endDate} title={title}/>
            {/* <ContentCard data={data} /> */}
            {/* <Typography>{DateTime.fromJSDate(new Date()).startOf("year").toFormat('yyyy-MM-dd')}</Typography>
            <Typography>{DateTime.fromJSDate(new Date()).endOf("year").toFormat('yyyy-MM-dd')}</Typography> */}
        </MainCard>
    )
}
