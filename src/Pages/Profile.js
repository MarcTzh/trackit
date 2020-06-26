// import React, {Component} from 'react';
import React, {useState} from 'react';
//updated import
import LineChart from '../Chart/LineChart';
// import BrandOptions from '../Input/BrandOptions';
import CategoryOptions from '../Input/CategoryOptions';
import { Button } from '@material-ui/core';
//graphql stuff
// import { gql } from 'apollo-boost';
// import { useQuery, useMutation } from '@apollo/react-hooks';

function Profile() {

    const [categoryValue, setCategoryValue] = useState();
    
    const [chartData, setChartData] = useState({
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        // datasets: [
        //     {
        //         label: 'Amazon',
        //         backgroundColor: 'rgb(255, 99, 132)',
        //         borderColor: 'rgb(255, 99, 132)',
        //         fill: false,
        //         data: [200, 210, 215, 212, 220, 230, 225]
        //     }, {
        //         label: 'Shopee',
        //         backgroundColor: 'rgb(255, 165, 0)',
        //         borderColor: 'rgb(255, 165, 0)',
        //         fill: false,
        //         data: [200, 200, 215, 202, 210, 220, 215]
        //     }
        // ]
        datasets: []
    });

    function handleClick() {
        return (
            setChartData({}
                // {
                //     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                //     datasets: [
                //         {
                //             label: 'Amazon',
                //             backgroundColor: 'rgb(255, 99, 132)',
                //             borderColor: 'rgb(255, 99, 132)',
                //             fill: false,
                //             data: [200, 210, 215, 212, 220, 230, 225]
                //         }, {
                //             label: 'Shopee',
                //             backgroundColor: 'rgb(255, 165, 0)',
                //             borderColor: 'rgb(255, 165, 0)',
                //             fill: false,
                //             data: [200, 200, 215, 202, 210, 220, 215]
                //         }
                //     ]
                // }
            )
        )
    }

    return (
        <div> 
            <h1 align='center'>My Profile</h1>
            <CategoryOptions callBackFromParent={setCategoryValue} />
            <LineChart chartData={chartData} catValue = {categoryValue}/>
            <Button onClick = {handleClick}> reload</Button>
        </div>
    );
    
}


export default Profile;