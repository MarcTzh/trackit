import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';

class LineChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: props.chartData
        } 
    }
    
    //default properties that can be overriden as properties in profile.js
    static defaultProps = {
        displayTitle: true,
        displayLegend: true,
        legendPosition: 'bottom',
    }
            
    render() {
        return (
            <div className='chart'>
                <Line 
                    data={this.state.chartData}
                    options={{
                        title: {
                            display: this.props.displayTitle,
                            text: 'Category 1'
                        },
                        legend: {
                            display: this.props.displayLegend,
                            position: this.props.legendPosition
                        }
                    }}

                />
            </div>
        )
    }
}

export default LineChart;