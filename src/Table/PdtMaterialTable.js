import React, { useState, useEffect, useContext, forwardRef, useRef, Fragment } from 'react';
// import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
// import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { gql } from 'apollo-boost';
import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks';
import UserContext from '../context/UserContext';
import SortIcon from '@material-ui/icons/Sort';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
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
import LinkIcon from '@material-ui/icons/Link';
// import MoreIcon from '@material-ui/icons/More';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
// import Divider from '@material-ui/core/Divider';
import { makeStyles, withTheme } from '@material-ui/core/styles';
import MaterialTable, { MTableToolbar } from 'material-table';
import { TablePagination } from "@material-ui/core";
import { store } from 'react-notifications-component';
import Loading from '../Loaders/Loading';
import { Redirect } from 'react-router';

//url status
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';


const useStyles = makeStyles((theme) => ({
    title: {
        fontSize:44,
        color: "white",
        fontWeight:700,
      },
      subtitle: {
        fontSize:28,
        color: "white",
        fontWeight:500,
      }
}));

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
        priceArray
        dateArray
        minPrice
    }
}`;

// const USER_PRODUCTS_QUERY = gql `
//     query UserProducts($info: String!) {
//         userProducts(info: $info) {
//             id
//             name
//             price
//             category
//             brand
//             url
//             userID
            
//         }
//     }
// `;

const REMOVE_MUTATION = gql `
    mutation RemoveProduct($id: ID!) {
        removeProduct(id: $id)
    }
`;

const UPDATE_PRODUCT_MUTATION = gql `
mutation UpdateProduct($id: ID!, $name: String!, $url: String!) {
    updateProduct(id: $id, name: $name, url: $url)
}
`;

const ADD_PRICE_AND_DATE_MUTATION = gql `
    mutation addPriceAndDate($id: ID!, $url: String!, $date: String!, $price: Float, $priceArray: [Float]!, $dateArray: [String!]!) {
        addPriceAndDate(id: $id, url: $url, date: $date, price: $price, priceArray: $priceArray, dateArray: $dateArray)
    }
`;


 export default function PdtMaterialTable(props) {

    const { loading, error, data } = useQuery(PRODUCTS_QUERY);

    const [removeProduct] = useMutation(REMOVE_MUTATION);

    const [updateProduct] = useMutation(UPDATE_PRODUCT_MUTATION);

    // const [currCat, setCat] = useState();

    const [groupingBoolean, setGroupingBoolean] = useState(false);

    const [urlBoolean, setUrlBoolean] = useState(true);

    // const [displayedPdts, setDisplayedPdts] = useState([]);

    const { userData } = useContext(UserContext);

    const [addPriceAndDate] = useMutation(ADD_PRICE_AND_DATE_MUTATION);

    // const [userProducts, {loading,error, data }] = useLazyQuery(USER_PRODUCTS_QUERY, {fetchPolicy: "cache-and-network"});

    // const { loading, error, data } = useQuery(USER_PRODUCTS_QUERY, { variables: { info: props.userID } });

    const classes = useStyles();

    // const [productData, setProductData] = useState(null);

    //For dates
    const [today, setToday] = useState(new Date());  

    useEffect(() => {
      const interval = setInterval(() => {
          setToday(new Date());
      }, 1000);
      return () => clearInterval(interval);
    }, []);

    const currDate = (today.getTime()).toString(10);

    // useEffect(() => {
    //     // if(userData.user) {
    //     //     userProducts( { variables: { info: userData.user.id }, fetchPolicy: "cache-and-network" })
    //     // }

    //     setProductData(data);

    // }, [data, userData])

    // const tableRef = useRef();

    function handleUpdate(productID, productUrl, productDateArray, productPriceArray) {
        addPriceAndDate(
            {
                variables: 
                {
                    id: productID,
                    url: productUrl,
                    date: currDate,
                    price: 0,  
                    priceArray:productPriceArray, 
                    dateArray:productDateArray,
                }, 
                refetchQueries: [{ query: PRODUCTS_QUERY}] 

            }
        )
    }


    if (loading) return <Loading open={true}/>;
    if (error) return <p>Error! :(</p>;

    // if (data && data.products) {
    //     console.log("dataproducts in")
    //     setProductPrices(data.products);
    // }

    // const load = () => {
    //     userProducts({ variables: { info: userData.user.id } })
    // }
    const title = <div><div className={classes.title} style={{textAlign: "center"}}>My Products</div>
                    <div className={classes.subtitle}>Click to visit link</div></div>;
    

    return (
        <>
            {
                data ? (
                        <MaterialTable
                            // tableRef={tableRef}
                            icons={tableIcons}
                            style={{ backgroundColor: '#212029'}}
                            title= {title}
                            columns={[
                                { title: 'Name', field: 'name' },
                                { title: 'Category', field: 'category', editable: 'never'},
                                { title: 'Brand', field: 'brand', editable: 'never' },
                                { title: 'Status', field: 'imageUrl' ,editable: 'never', render: (rowData) => 
                                    (rowData.price == null || rowData.price === 0)
                                    //url not working
                                    ? <div style={{paddingLeft: 7}}><ErrorIcon htmlColor="#dc3646"/></div>
                                    : (rowData.price < rowData.minPrice)
                                        //price drop
                                        ? <div style={{paddingLeft: 7}}><NotificationsActiveIcon htmlColor="#2e7cff"/></div>
                                        //url working
                                        : <div style={{paddingLeft: 7}}><CheckCircleIcon htmlColor="#34aa4a"/></div>
                                },
                                { title: 'Price', field: 'price', type: 'currency', editable: 'never' },
                                { title: 'ID', field: 'id', hidden: true},
                                { title: 'URL', field: 'url', hidden: urlBoolean, editable: 'onUpdate'},
                                { title: 'Price Array', field: 'priceArray', hidden: true},
                                { title: 'Date Array', field: 'dateArray', hidden: true},
                            ]}
                            //visit link maybe
                            onRowClick={((evt, selectedRow) => !(selectedRow.price == null || selectedRow.price <= 0) 
                                ? window.location.assign(selectedRow.url) 
                                : store.addNotification({
                                            title: "Error:",
                                            message: "Your product url is faulty",
                                            type: "danger",
                                            insert: "top",
                                            container: "top-right",
                                            animationIn: ["animated", "fadeIn"],
                                            animationOut: ["animated", "fadeOut"],
                                            dismiss: {
                                            duration: 2000,
                                            onScreen: true
                                            }
                                        })
                            )}
                            data= {data.products.filter((product) => product.userID === userData.user.id)}
                            // data = {userProducts({ variables: { info: userData.user.id } })}
                            // data = {data.products}
                            // data = {new Promise((resolve, reject) => resolve({data: data.products}))}
                            editable={{  
                                onRowUpdate: (newData, oldData) =>
                                new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                        const productID = oldData.id;
                                        // console.log(newData);
                                        // console.log(oldData);
                                        updateProduct(
                                            {
                                                variables: 
                                                {
                                                    id: productID,
                                                    name: newData.name,
                                                    url: newData.url
                                                },
                                                refetchQueries: [{ query: PRODUCTS_QUERY}] 
                                            }
                                        )
                                    resolve();
                                    }, 1000)
                                })
                            }}
                            actions={[
                                {
                                    icon: UpdateIcon,
                                    tooltip: 'Update Product',
                                    onClick: (event, rowData) => {
                                        console.log(rowData);
                                        handleUpdate(rowData.id, rowData.url, rowData.dateArray, rowData.priceArray)
                                        store.addNotification({
                                            title: "Success:",
                                            message: "Your product details have been updated",
                                            type: "success",
                                            insert: "top",
                                            container: "top-right",
                                            animationIn: ["animated", "fadeIn"],
                                            animationOut: ["animated", "fadeOut"],
                                            dismiss: {
                                            duration: 2000,
                                            onScreen: true
                                            }
                                        });
                                    }
                                },
                                {
                                icon: DeleteIcon,
                                tooltip: 'Delete Product',
                                onClick: (event, rowData) => {removeProduct(
                                        {
                                            variables: 
                                            {
                                            id: rowData.id},
                                            refetchQueries: [{ query: PRODUCTS_QUERY}] 
                                        }
                                    )
                                    store.addNotification({
                                            title: "Success:",
                                            message: "Your product has been deleted",
                                            type: "success",
                                            insert: "top",
                                            container: "top-right",
                                            animationIn: ["animated", "fadeIn"],
                                            animationOut: ["animated", "fadeOut"],
                                            dismiss: {
                                            duration: 2000,
                                            onScreen: true
                                            }
                                        });
                                    }
                                },  
                            ]}
                            
                            components={{
                                Toolbar: props => (
                                <div>
                                    <MTableToolbar {...props} />
                                    <div style={{padding: '0px 10px'}}>
                                        <ToggleButtonGroup size = "small" style ={{position:"relative",margin: 5 , padding: 5 }}>
                                            <ToggleButton style ={{ colour :"#fff"}} value="Show URL" aria-label="Show URL">
                                                <LinkIcon  onClick ={() => setUrlBoolean(!urlBoolean)}/>
                                            </ToggleButton>
                                            <ToggleButton value="Enable Sort" aria-label="Enable Sort">
                                                <SortIcon  onClick ={() => setGroupingBoolean(!groupingBoolean)}/>
                                            </ToggleButton>
                                        </ToggleButtonGroup>
                                    </div>
                                </div>
                                ),            
                            }}
                            
                            options={{
                                actionsColumnIndex: -1,
                                grouping: groupingBoolean,
                                headerStyle: {
                                    backgroundColor: '#212029',
                                },
                                // to highlight entire row based on url status
                                // rowStyle: rowData => ({
                                //     //if valid link then do nothing
                                //     backgroundColor: (rowData.price == null || rowData.price == 0) ?
                                //         //invalid link
                                //         "#FF0000"
                                //         //price drop
                                //         :(rowData.price < rowData.minPrice)
                                //             ? "#149dfb"
                                //             : null
                                // }),
                                pageSize: 10,
                                pageSizeOptions: [10,15,20],
                            }}
                        />
                ) : (
                    null
                )
            }
         </>
    )
}