import React, { useState, useEffect } from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import CategoryOptions from '../Input/CategoryOptions'

// DATEARRAY NOT SHOWING

const PRODUCTS_QUERY = gql `
{
    products {
        id
        name
        price
        category
        url
        priceArray
        dateArray
    }
}`;

const REMOVE_MUTATION = gql `
    mutation RemoveProduct($id: ID!) {
        removeProduct(id: $id)
    }
`;

 function UpdateProduct() {

    const { loading, error, data } = useQuery(PRODUCTS_QUERY);

    const [removeProduct] = useMutation(REMOVE_MUTATION);

    const [currCat, setCat] = useState();

    const [displayedPdts, setDisplayedPdts] = useState([]);

    // const [productPrices, setProductPrices] = useState([]);

    useEffect(() => {
        if(data) {
            setDisplayedPdts(data
                .products
                .filter((product) => currCat === undefined || currCat === null
                || currCat === product.category))
        }
    }, 
    //page is re-rendered whenever the currCat or data changes
    [currCat, data]);


    //For dates
    const [today, setToday] = useState(new Date());  
    useEffect(() => {
      const interval = setInterval(() => {
          setToday(new Date());
      }, 1000);
      return () => clearInterval(interval);
    }, []);
  const dateAndTime = (today.getFullYear() - 2000)*100000000 + today.getMonth() * 1000000 + today.getDate() * 10000 + today.getHours()*100 + today.getMinutes();    

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error! :(</p>;

    return (
        <Paper>   
            <h1>My Products</h1>
            <List>
                <CategoryOptions callBackFromParent={setCat}/>
                {//data.products
                displayedPdts //changes with useEffect
                .map((product) => {
                const labelId = `checkbox-list-label-${product.id}`;
                const url = product.url;
                //const currPrice = await checkPrice(url);
                //const currPrice = product.currPrice;
                const currPrice = '';

                return (
                    <ListItem >
                    <ListItemText 
                    id={labelId} 
                    primary={`${product.name} ${product.category} ${currPrice} ${product.dateArray}`} />
                    <ListItemSecondaryAction>
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
                })}
            </List>
        </Paper>
    )
}
    
    

export default UpdateProduct;