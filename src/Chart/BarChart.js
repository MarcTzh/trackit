import React, {useState, useEffect} from 'react';
import {Bar} from 'react-chartjs-2'; //there is also pie and bar

export default function BarChart(props) {
    const [chartData, setChartData] = useState({})
    
    console.log(props);
    const chart = () => {
        setChartData({
            labels: props.label,
            datasets: [
                {
                    backgroundColor: ['#159dfb', '#c83955', '#FFD166', '#17d993', '#9CFFFA', '#2BD9FE', '#623CEA', '#DFB2F4', '#D36135', '#EF476F '],
                    data: props.data
                }
            ],
        })
    }
    useEffect(() => {
        chart()
    }, [])

    return (
        <div>
            <h1 align='center'>{props.title}</h1>
            {/* //options */}
            <div class="canvas-container">
                <Bar data={chartData} options={{
                    // responsive: true,
                    // maintainAspectRatio: true,
                    title: {text:props.title, display: false},
                    animationSteps: 60,
                    legend: {
                        display: true,
                        position: "bottom",
                        align: "center",
                        // onClick: null,
                        fontSize: 30,
                        fullWidth:true,
                        labels: {
                            fontColor: '#fff',
                            fontSize:16,
                            padding:15,
                        }
                    },
                }}/>
            </div>
        </div>
    )
}
