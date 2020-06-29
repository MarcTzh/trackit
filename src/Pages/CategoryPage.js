import React, {useContext} from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import AddNewCategory from '../Input/AddNewCategory';
import UserContext from '../context/UserContext';
import { Link } from "react-router-dom";

const CATEGORIES_QUERY = gql `
{
    categories {
        id
        name
        userID
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

function CategoryPage(props) {
    const { loading: productLoading, error: productError, data: productData } = useQuery(PRODUCTS_QUERY);
    
    const { loading, error, data } = useQuery(CATEGORIES_QUERY);

    const [removeProduct] = useMutation(REMOVE_MUTATION);

    const [removeCategory] = useMutation(REMOVE_CATEGORIES_MUTATION);

    const { userData } = useContext(UserContext);

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
            return null;
        } 
        )
    } 
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error! :(</p>;
    if (productLoading) return <p>Products Loading...</p>;
    if (productError) return <p>Products Error! :(</p>;
    

    let currUserID;
    if(userData !== undefined && userData.user !== undefined) {
        currUserID = String(userData.user.id);
    }
        
    return (
        <>
        {userData.user ?

        (<Paper style={{ margin: 30 , padding: 30}}>   
        
            <h1>My Categories</h1>
            <List>
                {
                    data.categories.map(
                        (category) => {
                            if(category.userID === currUserID) {
                                // number of products in each category
                                var numOf = 0;
                                productData.products.map((product) => product.category === category.name? numOf += 1: numOf += 0 );

                                return (
                                    <ListItem>
                                        <ListItemText primary={`${category.name}`} secondary={`${numOf} Items`} />
                                        <ListItemSecondaryAction>
                                            <IconButton onClick = { () => removeCategoryAndProduct(category)}>
                                                <ClearIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                );
                            } else {
                                return null;
                            }
                        }
                    )
                }
            </List>
            <AddNewCategory/>
        </Paper>
        ) : (
            <>
            <h2>You are not logged in</h2>
            <Link to="/login">Log in</Link>
            </>
        )}
        </>
    )
} 

export default CategoryPage;