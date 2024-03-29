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
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Loading from '../Loaders/Loading';

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
    mutation addPriceAndDate($id: ID!, $url: String!, $date: String!, $price: Float, $priceArray: [Float]!, $dateArray: [String!]!, $email: String!) {
        addPriceAndDate(id: $id, url: $url, date: $date, price: $price, priceArray: $priceArray, dateArray: $dateArray, email: $email)
    }
`;

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: '36ch',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
  }));

 function UpdateProduct() {

    const { loading, error, data } = useQuery(PRODUCTS_QUERY);

    const [removeProduct] = useMutation(REMOVE_MUTATION);

    const [addPriceAndDate] = useMutation(ADD_PRICE_AND_DATE_MUTATION);

    const [currCat, setCat] = useState();

    const [displayedPdts, setDisplayedPdts] = useState([]);

    const { userData } = useContext(UserContext);

    const classes = useStyles();

    // const [productPrices, setProductPrices] = useState([]);

    useEffect(() => {
        if(data && userData && userData.user) {
            setDisplayedPdts(data
                .products
                .filter(
                    (product) => (product.userID === userData.user.id) 
                        && (currCat === undefined || currCat === null || currCat === product.category))
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
        if(userData !== undefined && userData.user !== undefined) {
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
                        email: userData.email,
                    }
                }
            )
        }
    }

    if (loading) return <Loading open={true}/>;
    if (error) return <p>Error! :(</p>;

    return (
        <>
        {userData.user ? (
            <Paper style={{ backgroundColor: '#27293d', margin: 30 , padding: 30}}>   
            <h1>Product list</h1>
            <List>
                <CategoryOptions callBackFromParent={setCat}/>
                { displayedPdts //changes with useEffect
                    .map((product) => {
                        const labelId = `checkbox-list-label-${product.id}`;

                        return (
                            <ListItem >
                                <ListItemText 
                                id={labelId} 
                                primary={`${product.name}`} 
                                secondary={
                                    <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.inline}
                                        color="textPrimary"
                                    >
                                        {`${product.category}`}
                                    </Typography>
                                    {`  S$${product.price}`}
                                    </React.Fragment>
                                }/>
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