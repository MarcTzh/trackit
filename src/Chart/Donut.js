import React, {useState, useEffect} from 'react';
import {Doughnut} from 'react-chartjs-2'; //there is also pie and bar

export default function Donut() {
    const [chartData, setChartData] = useState({})
    

    const chart = () => {
        setChartData({
            labels: ['Electronics', 'Food', 'Furniture', 'Clothing'
            , 'Lifestyle', 'Cars'],
            datasets: [
                {
                    label: 'Amazon',
                    backgroundColor: ['#159dfb', '#c83955', '#edc011', '#17d993'],
                    // hoverBackgroundColor: [
                    //     '#FF6384',
                    //     '#36A2EB',
                    //     '#FFCE56'
                    // ],
                    // borderColor: 'rgb(255, 99, 132)',
                    data: [10,15,2,3,5,7]
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
                    title: {text:'Product categories', display: false}
                }}/>
            </div>
        </div>
    )
}
