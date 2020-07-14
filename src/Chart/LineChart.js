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
                        text: props.catValue,
                        responsive: true,
                        fontColor: "#fff"
                    },
                    // responsive: true,
                    // maintainAspectRatio: true,
                    legend: {
                        // display: this.props.displayLegend,
                        // position: this.props.legendPosition
                        display: true,
                        position: 'bottom'
                    },
                    Axes: {
                        color:  '#000'
                    }

                }}

            />
        </div>
    )
    
}
export default LineChart;