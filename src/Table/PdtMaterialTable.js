import React, { useState, useEffect, useContext, forwardRef, useRef, Fragment } from 'react';
// import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
// import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { gql } from 'apollo-boost';
import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks';
import UserContext from '../context/UserContext';
import SortIcon from '@material-ui/icons/Sort';
import DeleteIcon from '@material-ui/icons/Delete';
import RefreshIcon from '@material-ui/icons/Refresh';
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
import NotificationsIcon from '@material-ui/icons/Notifications';
// import Divider from '@material-ui/core/Divider';
import { makeStyles, withTheme } from '@material-ui/core/styles';
import MaterialTable, { MTableToolbar } from 'material-table';
import { TablePagination } from "@material-ui/core";
import { store } from 'react-notifications-component';
import Loading from '../Loaders/Loading';
import { Redirect } from 'react-router';

//tool tip
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';

//url status
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import Grid from '@material-ui/core/Grid';


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
      },
      fab: {
        margin: theme.spacing(2),
      },
      absolute: {
        position: 'relative',
        bottom: theme.spacing(2),
        right: theme.spacing(3),
      },
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
mutation UpdateProduct($id: ID!, $name: String!, $url: String!, $category: String!) {
    updateProduct(id: $id, name: $name, url: $url, category: $category)
}
`;

const ADD_PRICE_AND_DATE_MUTATION = gql `
    mutation addPriceAndDate($id: ID!, $url: String!, $date: String!, $price: Float, $priceArray: [Float]!, $dateArray: [String!]!, $email: String!) {
        addPriceAndDate(id: $id, url: $url, date: $date, price: $price, priceArray: $priceArray, dateArray: $dateArray, email: $email)
    }
`;
let notifications = 0;
//breakdown of notifications
let faultyLinks = 0;
let priceDrops = 0;

 export default function PdtMaterialTable(props) {

    const { loading, error, data } = useQuery(PRODUCTS_QUERY);

    const [removeProduct] = useMutation(REMOVE_MUTATION);

    const [updateProduct] = useMutation(UPDATE_PRODUCT_MUTATION);

    // const [currCat, setCat] = useState();

    const [groupingBoolean, setGroupingBoolean] = useState(false);

    const [urlBoolean, setUrlBoolean] = useState(true);

    // const [displayedPdts, setDisplayedPdts] = useState([]);

    const { userData } = useContext(UserContext);

    const [showNoti, setShowNoti] = useState(false);

    const [displayedPdts, setDisplayedPdts] = useState();

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

    useEffect(() => {
        if(data !== undefined && userData !== undefined) {
            if(!showNoti) {
                setDisplayedPdts(data.products.filter((product) => product.userID === userData.user.id));
            } else {
                setDisplayedPdts(data.products.filter((product) => product.userID === userData.user.id
                                                                && ((product.price == null || product.price === 0)
                                                                    || (product.price <= product.minPrice))));
            }
        }
    }, [showNoti, data, userData])

    const currDate = (today.getTime()).toString(10);

    // useEffect(() => {
    //     // if(userData.user) {
    //     //     userProducts( { variables: { info: userData.user.id }, fetchPolicy: "cache-and-network" })
    //     // }

    //     setProductData(data);

    // }, [data, userData])

    // const tableRef = useRef();

    function handleUpdate(productID, productUrl, productDateArray, productPriceArray) {
        if(userData !== undefined && userData.user !== undefined) {
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
                        email: userData.user.email
                    }, 
                    refetchQueries: [{ query: PRODUCTS_QUERY}] 

                }
            )
        }
    }
    


    if (loading) return <Loading open={true}/>;
    if (error) return <p>Error! :(</p>;

    let currUserID;
 
    if(userData !== undefined && userData.user !== undefined && data !== undefined) {
        currUserID = String(userData.user.id);
        notifications = 0;
        faultyLinks = 0;
        priceDrops = 0;


        for(let j = 0; j< data.products.length; j++) {
            const product = data.products[j];
            if(currUserID === product.userID) {
                // console.log(data[j])
                //check if faulty link
                const price = product.price;
                // console.log(product.name)
                if(price == null || price === 0) {
                // console.log(price)
                faultyLinks++;
                } else {
                    //price drops
                    if(price < product.minPrice) {
                        priceDrops++;
                    }
                }
            }
        }
        //count notifications
        notifications = faultyLinks + priceDrops;
        // console.log(notifications);

    }

    // if (data && data.products) {
    //     console.log("dataproducts in")
    //     setProductPrices(data.products);
    // }

    // const load = () => {
    //     userProducts({ variables: { info: userData.user.id } })
    // }
    const title = <div>
                    <div className={classes.title}>My Products</div>
                    <div className={classes.subtitle}>{priceDrops} Price drops and {faultyLinks} Faulty links</div>
                    {/* <Grid item xs={12}>
                        <div>
                            <h3>test</h3>
                        </div>
                    </Grid> */}
                  </div>;
    

    return (
        <>
            {
                data ? (
                        <MaterialTable
                            // tableRef={tableRef}
                            icons={tableIcons}
                            style={{ backgroundColor: '#211f29'}}
                            title= {title}
                            columns={[
                                { title: 'Name', field: 'name' },
                                { title: 'Category', field: 'category', editable: 'never'},
                                { title: 'Platform', field: 'brand', editable: 'never' },
                                // { title: 'Status', field: 'imageUrl' ,editable: 'never', render: (rowData) => 
                                //     (rowData.price == null || rowData.price === 0)
                                //     //url not working
                                //     ? <div>
                                //         <Tooltip title="URL is dead">
                                //             <IconButton aria-label="delete">
                                //                 <ErrorIcon htmlColor="#dc3646"/>
                                //             </IconButton>
                                //         </Tooltip>
                                //         </div>
                                //     : (rowData.price < rowData.minPrice)
                                //         //price drop
                                //         ? <div>
                                //         <Tooltip title="Price drop">
                                //             <IconButton aria-label="delete">
                                //                 <NotificationsActiveIcon htmlColor="#2e7cff"/>
                                //             </IconButton>
                                //             </Tooltip>
                                //         </div>
                                //         //url working
                                //         : <div>
                                //             <Tooltip title="URL is working">
                                //                 <IconButton aria-label="delete">
                                //                     <CheckCircleIcon htmlColor="#34aa4a"/>
                                //                 </IconButton>
                                //             </Tooltip>
                                //             </div>
                                // },
                                { title: 'Price', field: 'price', type: 'currency', editable: 'never' },
                                { title: 'ID', field: 'id', hidden: true},
                                { title: 'URL', field: 'url', hidden: urlBoolean, editable: 'onUpdate'},
                                { title: 'Price Array', field: 'priceArray', hidden: true},
                                { title: 'Date Array', field: 'dateArray', hidden: true},
                            ]}
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
                            data= {displayedPdts}
                            // data = {userProducts({ variables: { info: userData.user.id } })}
                            // data = {data.products}
                            // data = {new Promise((resolve, reject) => resolve({data: data.products}))}
                            editable={{  
                                onRowUpdate: (newData, oldData) =>
                                new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                        const productID = oldData.id;
                                        console.log("newData: " + newData);
                                        console.log("oldData: " + oldData);
                                        updateProduct(
                                            {
                                                variables: 
                                                {
                                                    id: productID,
                                                    name: newData.name,
                                                    url: newData.url,
                                                    category: newData.category
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
                                    icon: RefreshIcon,
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
                                            <ToggleButton value="Show notifications" aria-label="Show notifications">
                                                <NotificationsIcon onClick ={() => setShowNoti(!showNoti)}/>
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
                                // rowStyle: (rowData) => ({
                                //     //if valid link then do nothing
                                //     backgroundColor: (rowData !== undefined && (rowData.price == null || rowData.price === 0))
                                //         //invalid link
                                //         ? showNoti 
                                //             ? "#FF0000"
                                //             : null
                                //         //price drop
                                //         :(rowData.price < rowData.minPrice)
                                //             ? showNoti
                                //                 ? "#149dfb"
                                //                 : null
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