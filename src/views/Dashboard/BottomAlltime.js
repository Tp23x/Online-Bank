
import Chart from 'react-apexcharts';
import AuthContext from '../../context/AuthProvider';
import React, { useContext, useEffect, useState } from 'react'



export default function BottomAlltime({set}){ 
  const  {AllTimes} = useContext(AuthContext)
  const  [alltime, setAlltime] = useState('')
  
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(() => {
        AllTimes(set,setAlltime)
    }, [set,setAlltime])
    // console.log(dashboardSum)
    useEffect(() => {
        if (!alltime) {
            setIsLoading(true)
        } else {
            setIsLoading(false)
        }
    })
    
    
    
    
    
    
    
    
    
    // console.log(alltime);
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
            categories: alltime.map((year)=>
            year.year),
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
            data: alltime.map((month)=>
            month.sum),
        },
    ]}/>:''}
    
    </>
        
        
    )   
}