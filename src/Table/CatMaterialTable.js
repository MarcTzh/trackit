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

import AddNewCategory from '../Input/AddNewCategory';


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


const CATEGORIES_QUERY = gql `
{
    categories {
        id
        name
        userID
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


const UPDATE_CATEGORY_MUTATION = gql `
mutation UpdateCategory($id: ID!, $name: String!) {
    updateCategory(id: $id, name: $name)
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


 export default function CatMaterialTable(props) {

    const { loading: productLoading, error: productError, data: productData } = useQuery(PRODUCTS_QUERY);
    
    const { loading, error, data } = useQuery(CATEGORIES_QUERY);

    const [removeProduct] = useMutation(REMOVE_MUTATION);

    const [removeCategory] = useMutation(REMOVE_CATEGORIES_MUTATION);

    const [updateCategory] = useMutation(UPDATE_CATEGORY_MUTATION);

    const [updateProduct] = useMutation(UPDATE_PRODUCT_MUTATION);

    // const [groupingBoolean, setGroupingBoolean] = useState(false);

    const [urlBoolean, setUrlBoolean] = useState(true);

    const { userData } = useContext(UserContext);

    const [addPriceAndDate] = useMutation(ADD_PRICE_AND_DATE_MUTATION);

    const classes = useStyles();

    if (loading) return <Loading open={true}/>;
    if (error) return <p>Error! :(</p>;
    if (productLoading) return <Loading open={true}/>;
    if (productError) return <p>Products Error! :(</p>;

    // if (data && data.products) {
    //     console.log("dataproducts in")
    //     setProductPrices(data.products);
    // }

    // const load = () => {
    //     userProducts({ variables: { info: userData.user.id } })
    // }

    const handleData = ()=> {
        let dataset =[];
        for(let i = 0; i < data.categories.length; i++) {
            let category = data.categories[i];
            if(category.userID === userData.user.id) {
                let numOf =0;
                productData.products.map((product) => product.category === category.name? numOf += 1: numOf += 0 );
                dataset.push({name: category.name, amount: numOf, id: category.id});
            }
        }
        console.log("bump");
        console.log(dataset);
        return dataset;
    }

    function removeCategoryAndProduct(cat) {
        removeCategory(
            {
                variables: {
                    id: cat.id},
                refetchQueries: [{ query: CATEGORIES_QUERY}] 
            }
        )
        productData.products.map((product) => {
            if(product.category === cat.name && product.userID === userData.user.id) {
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


    function updateCategoryAndProduct(oldCat, newCat) {
        updateCategory(
            {
                variables: 
                {
                    id: oldCat.id,
                    name: newCat.name,
                },
                refetchQueries: [{ query: CATEGORIES_QUERY}] 
            }
        )
        productData.products.map((product) => {
            if(product.userID === userData.user.id && product.category === oldCat.name ) {
                updateProduct(
                    {
                        variables: 
                        {
                            id: product.id,
                            name: product.name,
                            url: product.url,
                            category: newCat.name
                        },
                        refetchQueries: [{ query: PRODUCTS_QUERY}] 
                    }
                )
            }
            return null;
        } 
        )
    } 

    const title = <div className={classes.title} style={{textAlign: "center"}}>My Categories</div>;
    

    return (
        <>
            {
                data ? (
                    <>
                        <MaterialTable
                            // tableRef={tableRef}
                            icons={tableIcons}
                            style={{ backgroundColor: '#211f29'}}
                            title= {title}
                            columns={[
                                { title: 'Category', field: 'name' },
                                { title: 'Number of Products', field: 'amount', editable: 'never' },
                                { title: 'ID', field: 'id', hidden: true},
                            ]}
                            data= {handleData()}
                            editable={{  
                                onRowUpdate: (newData, oldData) =>
                                new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                        // updateCategoryAndProduct(newData, oldData)
                                    resolve();
                                    }, 300000)
                                })
                            }}
                            actions={[
                                {
                                icon: DeleteIcon,
                                tooltip: 'Delete Product',
                                onClick: (event, rowData) => {removeCategoryAndProduct(rowData)
                                    store.addNotification({
                                            title: "Success:",
                                            message: "Your category and its related products has been deleted",
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
                            
                            // components={{
                            //     Toolbar: props => (
                            //     <div>
                            //         <MTableToolbar {...props} />
                            //         <div style={{padding: '0px 10px'}}>
                            //             <ToggleButtonGroup size = "small" style ={{position:"relative",margin: 5 , padding: 5 }}>
                            //                 <ToggleButton style ={{ colour :"#fff"}} value="Show URL" aria-label="Show URL">
                            //                     <LinkIcon  onClick ={() => setUrlBoolean(!urlBoolean)}/>
                            //                 </ToggleButton>
                            //                 <ToggleButton value="Enable Sort" aria-label="Enable Sort">
                            //                     <SortIcon  onClick ={() => setGroupingBoolean(!groupingBoolean)}/>
                            //                 </ToggleButton>
                            //             </ToggleButtonGroup>
                            //         </div>
                            //     </div>
                            //     ),            
                            // }}
                            
                            options={{
                                actionsColumnIndex: -1,
                                headerStyle: {
                                    backgroundColor: '#212029',
                                },
                                pageSize: 10,
                                pageSizeOptions: [10,15,20],
                            }}
                        />
                        <AddNewCategory/>
                        </>
                ) : (
                    null
                )
            }
         </>
    )
}