import React, {useState, useEffect} from 'react';
import {Bar} from 'react-chartjs-2'; //there is also pie and bar

export default function BarChart() {
    const [chartData, setChartData] = useState({})

    const chart = () => {
        setChartData({
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'Amazon',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: [200, 210, 215, 212, 220, 230, 225]
                }, {
                    label: 'Shopee',
                    backgroundColor: 'rgb(255, 165, 0)',
                    borderColor: 'rgb(255, 165, 0)',
                    data: [100, 110, 115, 112, 120, 130, 125]
                }
            ]
        })
    }
    useEffect(() => {
        chart()
    }, [])

    return (
        <div>
            <h1 align='center'>Price drops this week</h1>
            {/* //options */}
            <div class="canvas-container">
                <Bar data={chartData} options={{
                    responsive: true,
                    title: {text:'Sony Wireless Headphones', display: true},
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    // autoskip: true,
                                    // maxTicksLimit: 10,
                                    // beginAtZero: true
                                },
                                gridLines: {
                                    display: false
                                }
                            }
                        ],
                        xAxes: [
                            {
                                gridLines : {
                                    display: false
                                }
                            }
                        ]
                    }
                }}/>
            </div>
        </div>
    )
}

