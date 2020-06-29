import React, { useState, useEffect,useContext } from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import ReplayIcon from '@material-ui/icons/Replay';
import CategoryOptions from '../Input/CategoryOptions'
import { Link } from "react-router-dom";
import UserContext from '../context/UserContext';

// DATEARRAY NOT SHOWING

const PRODUCTS_QUERY = gql `
{
    products {
        id
        name
        price
        category
        url
        userID
        priceArray
        dateArray
    }
}`;

const REMOVE_MUTATION = gql `
    mutation RemoveProduct($id: ID!) {
        removeProduct(id: $id)
    }
`;

const ADD_PRICE_AND_DATE_MUTATION = gql `
    mutation addPriceAndDate($id: ID!, $url: String!, $date: String!, $price: Int!, $priceArray: [Int!]!, $dateArray: [String!]!) {
        addPriceAndDate(id: $id, url: $url, date: $date, price: $price, priceArray: $priceArray, dateArray: $dateArray)
    }
`;

 function UpdateProduct() {

    const { loading, error, data } = useQuery(PRODUCTS_QUERY);

    const [removeProduct] = useMutation(REMOVE_MUTATION);

    const [addPriceAndDate] = useMutation(ADD_PRICE_AND_DATE_MUTATION);

    const [currCat, setCat] = useState();

    const [displayedPdts, setDisplayedPdts] = useState([]);

    const { userData } = useContext(UserContext);

    // const [productPrices, setProductPrices] = useState([]);

    useEffect(() => {
        if(data && userData && userData.user) {
            setDisplayedPdts(data
                .products
                .filter(
                    (product) => product.userID === userData.user.id && currCat === undefined || currCat === null || currCat === product.category)
                )
        }
    }, 
    //page is re-rendered whenever the currCat or data changes
    [currCat, data, userData]);


    //For dates
    const [today, setToday] = useState(new Date());  
    useEffect(() => {
      const interval = setInterval(() => {
          setToday(new Date());
      }, 1000);
      return () => clearInterval(interval);
    }, []);

    const currDate = (today.getTime()).toString(10);

    function handleUpdate(product) {
        addPriceAndDate(
            {
                variables: 
                {
                    id: product.id,
                    url: product.url,
                    date: currDate,
                    price: 0,  
                    priceArray:product.priceArray, 
                    dateArray:product.dateArray,
                }
            }
        )
        
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error! :(</p>;

    return (
        <>
        {userData.user ? (
            <Paper>   
            <h1>Manual Update Products</h1>
            <List>
                <CategoryOptions callBackFromParent={setCat}/>
                { displayedPdts //changes with useEffect
                    .map((product) => {
                        const labelId = `checkbox-list-label-${product.id}`;

                        return (
                            <ListItem >
                                <ListItemText 
                                id={labelId} 
                                primary={`${product.name} ${product.category} ${product.dateArray}`} />
                                    <ListItemSecondaryAction>
                                        <IconButton onClick={
                                            () => {handleUpdate(product)
                                            }}>
                                            <ReplayIcon />
                                        </IconButton>
                                        <IconButton onClick={
                                            () => {removeProduct(
                                            {
                                                variables: 
                                                {
                                                id: product.id},
                                                refetchQueries: [{ query: PRODUCTS_QUERY}] 
                                            }
                                            )
                                            }}>
                                            <ClearIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                            </ListItem>
                        );
                    }
                    )
                }
            </List>
        </Paper>
        ) :(
            <>
            <h2>You are not logged in</h2>
            <Link to="/login">Log in</Link>
            </>
        )}
        </>
    )
}
    
    

export default UpdateProduct;