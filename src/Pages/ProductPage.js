import React, { useState, useEffect } from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
// import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
// import CommentIcon from '@material-ui/icons/Comment';
import ClearIcon from '@material-ui/icons/Clear';
// import checkPrice from './Parser/AmazonParser';
import CategoryOptions from '../Input/CategoryOptions'
// import AddNewCategory from '../Input/AddNewCategory';

const PRODUCTS_QUERY = gql `
{
    products {
        id
        name
        price
        category
        url
    }
}`;

const REMOVE_MUTATION = gql `
    mutation RemoveProduct($id: ID!) {
        removeProduct(id: $id)
    }
`;


function ProductPage() {

    const { loading, error, data } = useQuery(PRODUCTS_QUERY);

    const [removeProduct] = useMutation(REMOVE_MUTATION);

    const [currCat, setCat] = useState('All');

    const [displayedPdts, setDisplayedPdts] = useState([]);


    useEffect(() => {
        if(data) {
            setDisplayedPdts(data
                .products
                .filter((product) => currCat === 'All'
                || currCat === product.category))
        }
    }, 
    //page is re-rendered whenever the currCat or data changes
    [currCat, data]);

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
                return (
                    <ListItem >
                    <ListItemText id={labelId} primary={`${product.name} ${product.category} $${product.price}`} />
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
    
    

export default ProductPage;