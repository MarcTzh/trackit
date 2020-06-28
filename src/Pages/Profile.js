// import React, {Component} from 'react';
import React, {useState, useContext, useEffect} from 'react';
//updated import
import LineChart from '../Chart/LineChart';
// import BrandOptions from '../Input/BrandOptions';
import CategoryOptions from '../Input/CategoryOptions';
import { Button } from '@material-ui/core';
//graphql stuff
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import UserContext from '../context/UserContext';
import { Link } from "react-router-dom";



const PRODUCTS_QUERY = gql `
{
    products {
        id
        name
        price
        category
        userID
        priceArray
    }
}`;

function Profile() {

    const [categoryValue, setCategoryValue] = useState();

    const { loading, error, data } = useQuery(PRODUCTS_QUERY);

    const { userData } = useContext(UserContext);
    
    const [chartData, setChartData] = useState({
        // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
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
    });

    const handleClick = (product, user) => {
        var dataset = [];
        for (var i = 0; i < product.length; i++) {
            if(product[i].userID === user.id && product[i].category === categoryValue) {
                dataset.push({
                    label: product[i].name,
                    data: product[i].priceArray.map(price => price/100)
                });
            }
        }
        console.log(dataset);
        return(setChartData({
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: dataset
        }))
        
    }

    // useEffect(() => {
    //     if (loading) return <p>Loading...</p>;
    //     if (error) return <p>Error! :(</p>;
    //     handleCatChange(data.products, userData.user);
    // }, 
    // //page is re-rendered whenever the currCat or data changes
    // [categoryValue]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error! :(</p>;


    return (
        <>
        {userData.user ? (
            <div> 
                <h1 align='center'>My Profile</h1>
                <CategoryOptions callBackFromParent={setCategoryValue} />
                <LineChart chartData={chartData} catValue = {categoryValue}/>
                <Button onClick={()=> handleClick(data.products, userData.user) }>load</Button>
            </div>
        ) : (
            <>
            <h2>You are not logged in</h2>
            <Link to="/login">Log in</Link>
            </>
        )
        }
        </>
    );
    
}


export default Profile;