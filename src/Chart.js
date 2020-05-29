import React, {useState, useEffect} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';

const Chart = () => {
    const [chartData, setChartData] = useState({})

    const chart = () => {
        setChartData({
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'Product A',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [0, 10, 5, 2, 20, 30, 45]
            }]
        })
    }
    useEffect(() => {
        chart()
    }, [])

    return (
        <div>
            <h1>Category 1</h1>
            {/* //options */}
            <div class="chart-container">
                <Line data={chartData} options={{
                    responsive: true,
                    title: {text:'Category 1', display: true},
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
            <h1>Category 2</h1>
            {/* //options */}
            <div>
                <Line data={chartData}/>
            </div>
        </div>
    )
}
// function Chart() {
//     return (
//         <div> 
//             <h1>My product chart</h1>
//             <canvas id="myChart"></canvas>
//             <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
//             const ctx = document.getElementById('myChart').getContext('2d');
//             const chart = new Chart(ctx, {
//                 // The type of chart we want to create
//                 type: 'line',

//                 // The data for our dataset
//                 data: {
//                     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//                     datasets: [{
//                         label: 'My First dataset',
//                         backgroundColor: 'rgb(255, 99, 132)',
//                         borderColor: 'rgb(255, 99, 132)',
//                         data: [0, 10, 5, 2, 20, 30, 45]
//                     }]
//                 },
//                 // Configuration options go here
//                 options: {}
//             });
//         </div>
        
//     );
// }

export default Chart;