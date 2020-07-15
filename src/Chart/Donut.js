import React, {useState, useEffect} from 'react';
import {Doughnut} from 'react-chartjs-2'; //there is also pie and bar

export default function Donut() {
    const [chartData, setChartData] = useState({})
    

    const chart = () => {
        setChartData({
            labels: ['Electronics', 'Food', 'Chairs', 'Clothing'
            , 'Lifestyle', 'Cars', 'Houses', 'Watches', 'Tables', 'Gaming'],
            datasets: [
                {
                    label: 'Amazon',
                    backgroundColor: ['#159dfb', '#c83955', '#FFD166', '#17d993', '#9CFFFA', '#2BD9FE', '#623CEA', '#DFB2F4', '#D36135', '#EF476F '],
                    // hoverBackgroundColor: [
                    //     '#FF6384',
                    //     '#36A2EB',
                    //     '#FFCE56'
                    // ],
                    // borderColor: 'rgb(255, 99, 132)',
                    data: [3,2,2,3,5,7,3,4,2,5]
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
                    // responsive: true,
                    // maintainAspectRatio: true,
                    title: {text:'Product categories', display: false}
                }}/>
            </div>
        </div>
    )
}
