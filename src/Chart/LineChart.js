import React, {Component} from 'react';
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
                        text: props.catValue
                    },
                    legend: {
                        // display: this.props.displayLegend,
                        // position: this.props.legendPosition
                        display: true,
                        position: 'bottom'
                    }
                }}

            />
        </div>
    )
    
}
export default LineChart;