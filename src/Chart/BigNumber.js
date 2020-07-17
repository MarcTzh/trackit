import React, {useState, useEffect} from 'react';
// import {Doughnut} from 'react-chartjs-2'; //there is also pie and bar

export default function BigNumber(props) {
    // const [chartData, setChartData] = useState({})
    
    // console.log(props);
    // const chart = () => {
    //     setChartData({
    //         datasets: [
    //             {
    //                 backgroundColor: ['#159dfb'],
    //                 data: [1]
    //             }
    //         ],
    //     })
    // }
    // useEffect(() => {
    //     chart()
    // }, [])

    return (
        <div>
            <h1 align='center'>{props.title}</h1>
            <div class="bigButton">
                <button>test</button>
            </div>
        </div>
    )
}

