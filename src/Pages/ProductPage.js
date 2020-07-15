import React, { useState, useEffect, useContext, forwardRef, useRef } from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks';
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
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
// import Divider from '@material-ui/core/Divider';
// import MaterialTable from 'material-table';
import NewMaterialTable from '../Table/NewMaterialTable';
//Loading
import Loading from '../Loaders/Loading';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

const PRODUCTS_QUERY = gql `
{
    products {
        id
        name
        price
        category
        brand
        url
        userID
    }
}`;

const USER_PRODUCTS_QUERY = gql `
    query UserProducts($info: String!) {
        userProducts(info: $info) {
            id
            name
            price
            category
            brand
            url
            userID
        }
    }
`;

const REMOVE_MUTATION = gql `
    mutation RemoveProduct($id: ID!) {
        removeProduct(id: $id)
    }
`;

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
        textAlign: 'center',
        // color: theme.palette.text.secondary,
        backgroundColor: "#212029",
        // opacity: 0.95,
      },
  }));

 function ProductPage() {

    // const { loading, error, data } = useQuery(PRODUCTS_QUERY);

    const [removeProduct] = useMutation(REMOVE_MUTATION);

    const [currCat, setCat] = useState();

    const [displayedPdts, setDisplayedPdts] = useState([]);

    const { userData } = useContext(UserContext);

    const [userProducts, {loading,error, data }] = useLazyQuery(USER_PRODUCTS_QUERY, {pollInterval: 500});

    // const { loading, error, data } = useQuery(USER_PRODUCTS_QUERY, { variables: { info: userData.user.id } });

    const classes = useStyles();


    // useEffect(() => {
    //     if(data) {
    //         setDisplayedPdts(data
    //             .products
    //             .filter(
    //                 (product) => 
    //                 currCat === undefined ||
    //                 currCat === null || 
    //                 currCat === product.category
    //             )
    //         )
    //     }
    // }, 
    // //page is re-rendered whenever the currCat or data changes
    // [currCat, data]);

    // const [productPrices, setProductPrices] = useState(null);

    // useEffect(() => {
    //     if(userData.user) {
    //         userProducts( { variables: { info: userData.user.id }, onCompleted: true })
    //         if(data) {
    //             setProductPrices(data)
    //         }
    //     }
        
    // }, [data, userData])

    // const tableRef = useRef();

    if (loading) return <Loading open={true}/>;
    if (error) return <p>Error! :(</p>;

    // if (data && data.products) {
    //     console.log("dataproducts in")
    //     setProductPrices(data.products);
    // }

    // const load = () => {
    //     userProducts({ variables: { info: userData.user.id } })
    // }

    return (
        <>
            {
                userData.user ? (
                    <div>
                    < NewMaterialTable userID = {userData.user.id}/>
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

    // return (
    //     <>
    //     {userData.user ? (
    //         <Paper style={{ margin: 30 , padding: 30}}>   
    //         <h1>My Products</h1>
    //         <List>
    //             <CategoryOptions callBackFromParent={setCat}/>
    //             {//data.products
    //             displayedPdts //changes with useEffect
    //             .filter((product) => product.userID === userData.user.id)
    //             .map((product) => {
    //             {/* const labelId = `checkbox-list-label-${product.id}`; */}

    //             return (
                    
    //                 <ListItem alignItems="flex-start">
    //                 {/* <ListItemText 
    //                 id={labelId} 
    //                 primary={`${product.name}${product.category} ${product.price}`} /> */}
    //                 <ListItemText
    //                 primary={`${product.name}`}
    //                 secondary={
    //                     <React.Fragment>
    //                     <Typography
    //                         component="span"
    //                         variant="body2"
    //                         className={classes.inline}
    //                         color="textPrimary"
    //                     >
    //                         {`${product.category}`}
    //                     </Typography>
    //                     {`  S$${product.price}`}
    //                     </React.Fragment>
    //                 }/>
    //                 <ListItemSecondaryAction>
    //                     <IconButton onClick={
    //                     () => {removeProduct(
    //                     {
    //                         variables: 
    //                         {
    //                         id: product.id},
    //                         refetchQueries: [{ query: PRODUCTS_QUERY}] 
    //                     }
    //                     )
    //                     }}>
    //                     <ClearIcon />
    //                     </IconButton>
    //                 </ListItemSecondaryAction>
    //                 </ListItem>
                    
                    
                    
    //             );
    //             })}
    //         </List>
    //     </Paper>
    //     ) : (
    //         <>
    //         <h2>You are not logged in</h2>
    //         <Link to="/login">Log in</Link>
    //         </>
    //     )}
    //     </>
    // )
}
    
    

export default ProductPage;