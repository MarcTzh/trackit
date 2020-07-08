import React, { useState, useEffect, useContext, forwardRef, useRef, Fragment } from 'react';
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
import MaterialTable from 'material-table';

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

const UPDATE_PRODUCT_MUTATION = gql `
mutation UpdateProduct($id: ID!, $name: String!) {
    updateProduct(id: $id, name: $name)
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

 export default function NewMaterialTable(props) {

    const { loading, error, data } = useQuery(PRODUCTS_QUERY);

    const [removeProduct] = useMutation(REMOVE_MUTATION);

    const [updateProduct] = useMutation(UPDATE_PRODUCT_MUTATION);

    const [currCat, setCat] = useState();

    const [displayedPdts, setDisplayedPdts] = useState([]);

    const { userData } = useContext(UserContext);

    // const [userProducts, {loading,error, data }] = useLazyQuery(USER_PRODUCTS_QUERY, {fetchPolicy: "cache-and-network"});

    // const { loading, error, data } = useQuery(USER_PRODUCTS_QUERY, { variables: { info: props.userID } });

    const classes = useStyles();

    const [productData, setProductData] = useState(null);

    useEffect(() => {
        // if(userData.user) {
        //     userProducts( { variables: { info: userData.user.id }, fetchPolicy: "cache-and-network" })
        // }

        setProductData(data);

    }, [data, userData])

    // const tableRef = useRef();


    if (loading) return <p>Loading...</p>;
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
                data ? (
                    <Fragment>
                        <MaterialTable
                            // tableRef={tableRef}
                            icons={tableIcons}
                            style={{ margin: 30 , padding: 30}}
                            title="My Products"
                            columns={[
                                { title: 'Name', field: 'name' },
                                { title: 'Category', field: 'category' },
                                { title: 'Price', field: 'price', type: 'currency', editable: 'never' },
                                { title: 'Brand', field: 'brand', },
                                { title: 'ID', field: 'id', hidden: true},
                            ]}
                            data= {data.products.filter((product) => product.userID === userData.user.id)}
                            // data = {userProducts({ variables: { info: userData.user.id } })}
                            // data = {data.products}
                            // data = {new Promise((resolve, reject) => resolve({data: data.products}))}
                            editable={{  
                                onRowUpdate: (newData, oldData) =>
                                new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                        const productID = oldData.id;
                                        console.log(newData);
                                        console.log(oldData);
                                        updateProduct(
                                            {
                                                variables: 
                                                {
                                                    id: productID,
                                                    name: newData.name
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
                                icon: ClearIcon,
                                tooltip: 'Delete Product',
                                onClick: (event, rowData) => {removeProduct(
                                        {
                                            variables: 
                                            {
                                                id: rowData.id
                                            },
                                            refetchQueries: [{ query: PRODUCTS_QUERY}] 
                                        }
                                    )
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
                                    }
                                },  
                            ]}
                            
                            options={{
                                actionsColumnIndex: -1
                            }}
                        />
                    </Fragment>
                        
                ) : (
                    null
                )
            }
         </>

    )

}
    
    
