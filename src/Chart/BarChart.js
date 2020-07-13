import React, {useState, useEffect} from 'react';
import {Bar} from 'react-chartjs-2'; //there is also pie and bar

export default function BarChart() {
    const [chartData, setChartData] = useState({})

    const chart = () => {
        setChartData({
            labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
            datasets: [
                {
                    label: 'Amazon',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
                }, {
                    label: 'Shopee',
                    backgroundColor: 'rgb(255, 165, 0)',
                    borderColor: 'rgb(255, 165, 0)',
                    data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
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

