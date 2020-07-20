// import React, {useContext} from 'react';
// import { gql } from 'apollo-boost';
// import { useQuery, useMutation } from '@apollo/react-hooks';
// import Paper from '@material-ui/core/Paper';
// import { makeStyles } from '@material-ui/core/styles';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
// import ListItemText from '@material-ui/core/ListItemText';
// import IconButton from '@material-ui/core/IconButton';
// import ClearIcon from '@material-ui/icons/Clear';
// import AddNewCategory from '../Input/AddNewCategory';
// import UserContext from '../context/UserContext';
// import { Link } from "react-router-dom";

// const CATEGORIES_QUERY = gql `
// {
//     categories {
//         id
//         name
//         userID
//     }
// }`;

// const PRODUCTS_QUERY = gql `
// {
//     products {
//         id
//         name
//         price
//         category
//     }
// }`;

// const REMOVE_MUTATION = gql `
//     mutation RemoveProduct($id: ID!) {
//         removeProduct(id: $id)
//     }
// `;

// const REMOVE_CATEGORIES_MUTATION = gql `
//     mutation RemoveCategory($id: ID!) {
//         removeCategory(id: $id)
//     }
// `;

// const useStyles = makeStyles((theme) => ({
//     title: {
//         fontSize:44,
//         color: "white",
//         fontWeight:700,
//       },
//       subtitle: {
//         fontSize:28,
//         color: "white",
//         fontWeight:500,
//       },
//       paper: {
//         padding: theme.spacing(1),
//         textAlign: 'center',
//         // color: theme.palette.text.secondary,
//         background: "#212029",
//       },
// }));

// function CategoryPage(props) {
//     const { loading: productLoading, error: productError, data: productData } = useQuery(PRODUCTS_QUERY);
    
//     const { loading, error, data } = useQuery(CATEGORIES_QUERY);

//     const [removeProduct] = useMutation(REMOVE_MUTATION);

//     const [removeCategory] = useMutation(REMOVE_CATEGORIES_MUTATION);

//     const { userData } = useContext(UserContext);

//     const classes = useStyles();

//     function removeCategoryAndProduct(cat) {
//         removeCategory(
//             {
//                 variables: {
//                     id: cat.id},
//                 refetchQueries: [{ query: CATEGORIES_QUERY}] 
//             }
//         )
//         productData.products.map((product) => {
//             if(product.category === cat.name) {
//                 removeProduct(
//                     {
//                         variables: {
//                             id: product.id
//                         },
//                         refetchQueries: [{ query: PRODUCTS_QUERY}] 
//                     }
//                 )
        
//             }
//             return null;
//         } 
//         )
//     } 
    
//     if (loading) return <Loading open={true}/>;
//     if (error) return <p>Error! :(</p>;
//     if (productLoading) return <Loading open={true}/>;
//     if (productError) return <p>Products Error! :(</p>;
    

//     let currUserID;
//     if(userData !== undefined && userData.user !== undefined) {
//         currUserID = String(userData.user.id);
//     }
        
//     return (
//         <>
//         {userData.user ?

//         (<div className={classes.paper} style={{margin: 30 , padding: 30}}>   
        
//             <div className={classes.title}>My Categories</div>
//             <List>
//                 {
//                     data.categories.map(
//                         (category) => {
//                             if(category.userID === currUserID) {
//                                 // number of products in each category
//                                 var numOf = 0;
//                                 productData.products.map((product) => product.category === category.name? numOf += 1: numOf += 0 );

//                                 return (
//                                     <ListItem>
//                                         <ListItemText primary={`${category.name}`} secondary={`${numOf} Items`} />
//                                         <ListItemSecondaryAction>
//                                             <IconButton onClick = { () => removeCategoryAndProduct(category)}>
//                                                 <ClearIcon />
//                                             </IconButton>
//                                         </ListItemSecondaryAction>
//                                     </ListItem>
//                                 );
//                             } else {
//                                 return null;
//                             }
//                         }
//                     )
//                 }
//             </List>
//             <AddNewCategory/>
//         </div>
//         ) : (
//             <>
//             <h2>You are not logged in</h2>
//             <Link to="/login">Log in</Link>
//             </>
//         )}
//         </>
//     )
// } 

// export default CategoryPage;


import React, {useContext} from 'react';
import { Link } from "react-router-dom";
import UserContext from '../context/UserContext';
import { makeStyles } from '@material-ui/core/styles';
import CatMaterialTable from '../Table/CatMaterialTable';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: '36ch',
    //   backgroundColor: theme.palette.background.paper,
      backgroundColor: "#212029"
    },
    inline: {
      display: 'inline',
    },
    paper: {
        padding: theme.spacing(1),
        // textAlign: 'center',
        // color: theme.palette.text.secondary,
        backgroundColor: "#212029",
        // opacity: 0.95,
      },
  }));

 export default function CategoryPage() {

    const { userData } = useContext(UserContext);

    const classes = useStyles();

    return (
        <>
            {
                userData.user ? (
                    <div className={classes.paper} style={{ margin: 30 , padding: 30}}>
                        <CatMaterialTable userID = {userData.user.id}/>
                    </div>
                ) : (
                    <>
                    <h2>You are not logged in</h2>
                    <Link to="/login">Log in</Link>
                    </>
                )
            }
         </>

    )
}
    