import React, { useState, useEffect, useContext } from 'react';
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
import { Link } from "react-router-dom";
import UserContext from '../context/UserContext';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
// import Divider from '@material-ui/core/Divider';
// import { withStyles } from '@material-ui/core/styles';
// import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
// import CheckBoxIcon from '@material-ui/icons/CheckBox';
// import Favorite from '@material-ui/icons/Favorite';
// import FavoriteBorder from '@material-ui/icons/FavoriteBorder';


const PRODUCTS_QUERY = gql `
{
    products {
        id
        name
        price
        category
        url
        userID
    }
}`;

const REMOVE_MUTATION = gql `
    mutation RemoveProduct($id: ID!) {
        removeProduct(id: $id)
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

 function NotificationPage() {

    const { loading, error, data } = useQuery(PRODUCTS_QUERY);

    const [removeProduct] = useMutation(REMOVE_MUTATION);

    const [currCat, setCat] = useState();

    const [displayedPdts, setDisplayedPdts] = useState([]);

    const { userData } = useContext(UserContext);

    const [checked, setChecked] = React.useState(false);

    const handleChange = (event) => {
        // setChecked({checked, [event.target.name]: event.target.checked });
        setChecked(!checked);
      };

    // const [productPrices, setProductPrices] = useState([]);

    const classes = useStyles();


    useEffect(() => {
        if(data) {
            // console.log(displayedPdts)
            setDisplayedPdts(data
                .products
                .filter(
                    (product) => 
                    (currCat === undefined ||
                    currCat === null || 
                    currCat === product.category) 
                    && (checked 
                        // only want to see those products lower than minPrice
                        ? product.minPrice > product.price
                        // can show all products
                        : true)
                )
            )
        }
    }, 
    //page is re-rendered whenever the currCat or data changes
    [currCat, data, checked, userData]);
    

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error! :(</p>;

    return (
        <>
        {userData.user ? (
            <Paper style={{ margin: 30 , padding: 30}}>   
            <h1>Notifications</h1>
            <List>
                <FormGroup row>
                <CategoryOptions callBackFromParent={setCat}/>

                <FormControlLabel
                    control={
                    <Checkbox
                        checked={checked}
                        onChange={handleChange}
                        color="primary"
                    />
                    }
                    label="Show notifications only"
                />
                </FormGroup>

                {//data.products
                displayedPdts //changes with useEffect
                .filter((product) => product.userID === userData.user.id)
                .map((product) => {
                {/* const labelId = `checkbox-list-label-${product.id}`; */}

                return (
                    
                    <ListItem alignItems="flex-start">
                    {/* <ListItemText 
                    id={labelId} 
                    primary={`${product.name}${product.category} ${product.price}`} /> */}
                    <ListItemText
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
        ) : (
            <>
            <h2>You are not logged in</h2>
            <Link to="/login">Log in</Link>
            </>
        )}
        </>
    )
}
    
    

export default NotificationPage;