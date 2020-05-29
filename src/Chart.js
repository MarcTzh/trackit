import React, {useState, useEffect} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';

const Chart = () => {
    const [chartData, setChartData] = useState({})

    const chart = () => {
        setChartData({
            labels: ['day1', 'day2', 'day3', 'day4'],
            datasets: [{
                label: 'Prices of Product A',
                data: [10,11,12,13,11,12],
                backgroundColor: [
                    'rgba(75.192,192,0.6)'
                ],
                borderWidth: 4
            }]
        })
    }
    useEffect(() => {
        chart()
    }, [])
    return (
        <div>
            <h1>Dank</h1>
            <Line data={chartData}/>
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