import React from 'react';
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
import AddNewCategory from '../Input/AddNewCategory';

const CATEGORIES_QUERY = gql `
{
    categories {
        id
        name
    }
}`;

const PRODUCTS_QUERY = gql `
{
    products {
        id
        name
        price
        category
    }
}`;

const REMOVE_MUTATION = gql `
    mutation RemoveProduct($id: ID!) {
        removeProduct(id: $id)
    }
`;

const REMOVE_CATEGORIES_MUTATION = gql `
    mutation RemoveCategory($id: ID!) {
        removeCategory(id: $id)
    }
`;

function CategoryPage() {
    const { loading: productLoading, error: productError, data: productData } = useQuery(PRODUCTS_QUERY);
    
    const { loading, error, data } = useQuery(CATEGORIES_QUERY);

    const [removeProduct] = useMutation(REMOVE_MUTATION);

    const [removeCategory] = useMutation(REMOVE_CATEGORIES_MUTATION);

    function removeCategoryAndProduct(cat) {
        removeCategory(
            {
                variables: {
                    id: cat.id},
                refetchQueries: [{ query: CATEGORIES_QUERY}] 
            }
        )
        productData.products.map((product) => {
            if(product.category === cat.name) {
                removeProduct(
                    {
                        variables: {
                            id: product.id
                        },
                        refetchQueries: [{ query: PRODUCTS_QUERY}] 
                    }
                )
            }
        } 
        )
    } 

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error! :(</p>;
    if (productLoading) return <p>Loading...</p>;
    if (productError) return <p>Error! :(</p>;
    
    return (
        <Paper>   
        <AddNewCategory/>
        <h1>My Categories</h1>
        <List>
        {data.categories.map((category) => {

            var numOf = 0;
            productData.products.map((product) => product.category === category.name? numOf+=1: numOf += 0 );

            return (
                <ListItem>
            
                <ListItemText primary={`${category.name} ${numOf}`} />
    
                <ListItemSecondaryAction>
                    <IconButton onClick = { () => removeCategoryAndProduct(category)}>
                        <ClearIcon />
                    </IconButton>
                </ListItemSecondaryAction>
    
                </ListItem>
            );
            })}
        </List>
        </Paper>
    );
} 

export default CategoryPage;