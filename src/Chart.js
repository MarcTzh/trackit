import React, {useState, useEffect} from 'react';
import {Line} from 'react-chartjs-2'; //there is also pie and bar

const Chart = () => {
    const [chartData, setChartData] = useState({})

    const chart = () => {
        setChartData({
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'Amazon',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [200, 210, 215, 212, 220, 230, 225]
            }, {
                label: 'Shoppee',
                backgroundColor: 'rgb(255, 165, 0)',
                borderColor: 'rgb(255, 165, 0)',
                data: [100, 110, 115, 112, 120, 130, 125]}
        ]
        })
    }
    useEffect(() => {
        chart()
    }, [])

    return (
        <div>
            <h1 align='center'>Electronics</h1>
            {/* //options */}
            <div class="chart-container">
                <Line data={chartData} options={{
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