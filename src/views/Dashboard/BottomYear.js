
import Chart from 'react-apexcharts';
import AuthContext from '../../context/AuthProvider';
import React, { useContext, useEffect, useState } from 'react'
import { DateTime } from "luxon";



export default function BottomYear({set}){ 
  const  {Thisyear} = useContext(AuthContext)
  const [thisYear, setThisyear] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const startDate = DateTime.fromJSDate(new Date()).startOf("year").toFormat('yyyy-MM-dd')
    const endDate = DateTime.fromJSDate(new Date()).endOf("year").toFormat('yyyy-MM-dd')
    useEffect(() => {
        Thisyear(set,setThisyear,startDate,endDate)
    }, [set,setThisyear,startDate,endDate])
    // console.log(dashboardSum)
    useEffect(() => {
        if (!thisYear) {
            setIsLoading(true)
        } else {
            setIsLoading(false)
        }
    })
    // console.log(thisYear);
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
            categories: thisYear.map((month)=>
            month.month),
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
            data: thisYear.map((month)=>
            month.sum),
        },
    ]}/>:''}
    
    </>
        
        
    )   
}