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
                    backgroundColor: ['#9CFFFA', '#623CEA', '#DFB2F4'], //, '#D36135', '#2BD9FE', '#EF476F','#159dfb', '#c83955', '#FFD166', '#17d993'],
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
                    responsive: true,
                    maintainAspectRatio: true,
                    title: {text:props.title, display: false},
                    animationSteps: 60,
                    legend: {
                        display: false,
                        position: "bottom",
                        align: "center",
                        // onClick: null,
                        fontSize: 28,
                        fullWidth:true,
                        labels: {
                            fontColor: '#fff',
                            fontSize:16,
                            padding:15,
                        }
                    },
                    Axes: {
                        color:  '#000'
                    },
                    borderColor: "#fff",
                    scales: {
                        yAxes: [{
                            ticks: {
                                // // Include a dollar sign in the ticks
                                // callback: function(value, index, values) {
                                //     return '$' + value;
                                // },
                                fontColor: 'white',
                                beginAtZero: true
                            },
                            gridLines: {
                                color: 'gray',
                                lineWidth: 0.2
                            }
                        }],
                        xAxes: [{
                            ticks: {
                                fontColor: 'white'
                            },
                            gridLines: {
                                color: 'gray',
                                lineWidth: 0
                            }
                        }],
                    },
                    fontColor: 'white'
                }}/>
            </div>
        </div>
    )
}
