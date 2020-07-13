import React, {useState, useEffect} from 'react';
import {Doughnut} from 'react-chartjs-2'; //there is also pie and bar

export default function Donut() {
    const [chartData, setChartData] = useState({})
    

    const chart = () => {
        setChartData({
            labels: ['1', '2', '3', '4', '5', '6'],
            datasets: [
                {
                    label: 'Amazon',
                    backgroundColor: [
                        '#CCC',
                        '#36A2EB',
                        '#FFCE56',
                        '#36A2EB',
                        '#FFCE56'
                    ],
                    // hoverBackgroundColor: [
                    //     '#FF6384',
                    //     '#36A2EB',
                    //     '#FFCE56'
                    // ],
                    // borderColor: 'rgb(255, 99, 132)',
                    data: [10,15,20,3,5,7]
                }
            ],
        })
    }
    useEffect(() => {
        chart()
    }, [])

    return (
        <div>
            <h1 align='center'>Categories</h1>
            {/* //options */}
            <div class="canvas-container">
                <Doughnut data={chartData} options={{
                    responsive: true,
                    maintainAspectRatio: true,
                    title: {text:'Product categories', display: true}
                }}/>
            </div>
        </div>
    )
}