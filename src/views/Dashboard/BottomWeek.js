
import Chart from 'react-apexcharts';
import AuthContext from '../../context/AuthProvider';
import React, { useContext, useEffect, useState } from 'react'
import { DateTime } from "luxon";



export default function BottomWeek({set}){ 
  const  {Thisweek} = useContext(AuthContext)
  const [thisweek, setThisWeek] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const startDate = DateTime.fromJSDate(new Date()).startOf("week").toFormat('yyyy-MM-dd')
    const endDate = DateTime.fromJSDate(new Date()).endOf("week").toFormat('yyyy-MM-dd')
    useEffect(() => {
        Thisweek(set,setThisWeek,startDate,endDate)
    }, [set,setThisWeek,startDate,endDate])
    // console.log(startDate, endDate)
    useEffect(() => {
        if (!thisweek) {
            setIsLoading(true)
        } else {
            setIsLoading(false)
        }
    })
    // console.log(thisweek);
    return( 
    <>
    {!isLoading ? <Chart height= '480'
    type= 'bar'options= {{
        chart: {
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: false,
            }
        },
        colors: "#00ccf2",
        responsive: [
            {
                breakpoint: 480,
                options: {
                    legend: {
                        position: 'bottom',
                        offsetX: -10,
                        offsetY: 0
                    }
                }
            }
        ],
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '50%'
            }
        },
        xaxis: {
            type: 'category',
            categories: thisweek.map((day)=>
            day.day),
            labels: {
                style: {
                    colors: '#000',
                    fontSize: '16px',
                    fontWeight: 'bold',
                }
            }
        },
        legend: {
            show: true,
            fontSize: '14px',
            fontFamily: `'Roboto', sans-serif`,
            position: 'bottom',
            offsetX: 20,
            labels: {
                useSeriesColors: false
            },
            markers: {
                width: 16,
                height: 16,
                radius: 5
            },
            itemMargin: {
                horizontal: 15,
                vertical: 8
            }
        },
        fill: {
            type: 'solid'
        },
        dataLabels: {
            enabled: false
        },
        grid: {
            show: true
        }
    }}
    series ={ [
        {
            name: 'ผลรวม',
            data: thisweek.map((month)=>
            month.sum),
        },
    ]}/>:''}
    
    </>
        
        
    )   
}