import React from 'react';
import {Line} from 'react-chartjs-2';
//test
function LineChart(props) {
            
    return (
        <div className='chart'>
            <Line 
                data={props.chartData}
                options={{
                    title: {
                        // display: this.props.displayTitle,
                        display: true,
                        text: props.catValue || "Category not selected",
                        responsive: true,
                        fontColor: "white"
                    },
                    // responsive: true,
                    // maintainAspectRatio: true,
                    legend: {
                        // display: this.props.displayLegend,
                        // position: this.props.legendPosition
                        display: true,
                        position: 'bottom',
                        labels: {
                            fontColor: 'white'
                        }
                    },
                    Axes: {
                        color:  '#000'
                    },
                    borderColor: "#fff",
                    scales: {
                        yAxes: [{
                            ticks: {
                                // Include a dollar sign in the ticks
                                callback: function(value, index, values) {
                                    return '$' + value;
                                },
                                fontColor: 'white',
                            },
                            gridLines: {
                                color: 'gray',
                                lineWidth: 0.35
                            }
                        }],
                        xAxes: [{
                            ticks: {
                                fontColor: 'white'
                            },
                            gridLines: {
                                color: 'gray',
                                lineWidth: 0.15
                            }
                        }],
                    },
                    fontColor: 'white'

                }}

            />
        </div>
    )
    
}
export default LineChart;