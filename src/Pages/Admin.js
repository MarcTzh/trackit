import React, {useState, useEffect, useContext} from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Loading from '../Loaders/Loading';
import UserContext from '../context/UserContext';
import Paper from '@material-ui/core/Paper';
import ComplexGrid from '../Dashboard/ComplexGrid';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Cards from '../Dashboard/Cards';
import Donut from '../Chart/Donut';
import Pie from '../Chart/Pie';
import BigNumber from '../Chart/BigNumber';
// import Chart from '../Chart/Chart';
import BarChart from '../Chart/BarChart';
import * as styles from '../style.css'
import GeneralButton from '../Input/GeneralButton';
import { castArray } from 'lodash';
// import Cards from '../Dashboard/Cards';
import { store } from 'react-notifications-component';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    card: {
      padding: theme.spacing(1),
      textAlign: 'center',
      // color: theme.palette.text.secondary,
      backgroundColor: "#212029",
      // opacity: 0.95,
      border: "1px solid gray"
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      // color: theme.palette.text.secondary,
      backgroundColor: "#212029",
      // opacity: 0.95,
    },
    title: {
      fontSize:76,
      color: "white",
      fontWeight:700,
    },
    subtitle: {
      fontSize:28,
      color: "white",
      fontWeight:500,
    }
  }));

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
    brand
    url
    userID
    priceArray
    dateArray
    minPrice
}
}`;

const ADD_PRICE_AND_DATE_MUTATION = gql `
    mutation addPriceAndDate($id: ID!, $url: String!, $date: String!, $price: Float, $priceArray: [Float]!, $dateArray: [String!]!, $email: String!) {
        addPriceAndDate(id: $id, url: $url, date: $date, price: $price, priceArray: $priceArray, dateArray: $dateArray, email: $email)
    }
`;

function Admin() {

    const { userData } = useContext(UserContext);


    const classes = useStyles();

    const { loading: productLoading, error: productError, data: productData } = useQuery(PRODUCTS_QUERY);
    
    const { loading, error, data } = useQuery(CATEGORIES_QUERY);

    const [addPriceAndDate] = useMutation(ADD_PRICE_AND_DATE_MUTATION);

    //For dates
    const [today, setToday] = useState(new Date());  

    useEffect(() => {
      const interval = setInterval(() => {
          setToday(new Date());
      }, 1000);
      return () => clearInterval(interval);
    }, []);

    const currDate = (today.getTime()).toString(10);

    if (loading) return <Loading open={true}/>;
    if (error) return <p>Error! :( Please reload the page or try again later.</p>;
    if (productLoading) return <Loading open={true}/>;
    if (productError) return <p>Error! :( Please reload the page or try again later.</p>;
      let catArray =[];
      let pdtCountArray =[];
      let currUserID;
      //for numbers on the dashboard
      let pdtCounter=0;
      let catCounter=0;
      let notifications=0;

    //TODO: JIYU
    function refreshProducts() {

      for(let n = 0; n < productData.products.length; n++) {
        let product = productData.products[n];
        addPriceAndDate(
          {
              variables: 
              {
                  id: product.id,
                  url: product.url,
                  date: currDate,
                  price: 0,  
                  priceArray:product.priceArray, 
                  dateArray:product.dateArray,
                  email: userData.user.email
              }, 
              refetchQueries: [{ query: PRODUCTS_QUERY}] 
          }
        )
      }


        if(userData !== undefined && userData.user !== undefined) {
            for(let j = 0; j<productData.products.length; j++) {
                pdtCounter++;
                for(let k= 0; k < catArray.length; k ++){
                    if(currUserID === productData.products[j].userID && productData.products[j].category === catArray[k]) {
                        pdtCountArray[k] = pdtCountArray[k] + 1
                    }
                }
            }
            store.addNotification({
                title: "Please wait",
                message: "Products are being updated",
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
        } else {
            store.addNotification({
                title: "Error:",
                message: "You are logged out",
                type: "warning",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                  duration: 1000,
                  onScreen: true
                }
              });
        }
    }

    if(userData !== undefined && userData.user !== undefined) {
        // console.log(productData); //products
        // console.log(data); //categories
        currUserID = String(userData.user.id);
        catArray =[];
        pdtCountArray =[];

      for(let i = 0; i < data.categories.length; i++) {
        if(currUserID === data.categories[i].userID) {
          catArray.push(data.categories[i].name)
          catCounter++;
        }
      }

      for(let m= 0; m < catArray.length; m ++){
        pdtCountArray.push(0);
      }

      for(let j = 0; j<productData.products.length; j++) {
        pdtCounter++;
        for(let k= 0; k < catArray.length; k ++){
          if(currUserID === productData.products[j].userID && productData.products[j].category === catArray[k]) {
              pdtCountArray[k] = pdtCountArray[k] + 1
          }
        }
      }
              
    }

    return (
      <>
      {userData.user ? (
      <Paper className={classes.paper} style={{ margin: 30 , padding: 30 }}>   
      {/* <div className={classes.root}> */}
      <div className="background-darkblue">
  
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <div>
            {/* <h2>{date} {time}</h2> */}
            <div className="page">
                {userData.user ? (
                    <div className={classes.title}>Admin dashboard</div>
                ) : null }
            </div>
            <div style={{paddingBottom: 10}} className={classes.subtitle}>Database functions</div>
            {/* <img src={Poster2} alt="Poster2" /> */}
          </div>
          
        </Grid>
        <Grid item xs={12}>
            <div style={{marginTop: 15}}>
                <GeneralButton 
                    onClick={refreshProducts}
                    fullWidth={true}
                    text="Refresh all products in database"
                />
            </div>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.card}>
            <Cards counter={pdtCounter} text={"Products"}/>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.card}>
            <Cards counter={catCounter} text={"Categories"}/>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.card}>
            <Cards counter={notifications} text={"Notifications"}/>
          </Paper>
        </Grid>
        
       

      </Grid>
    </div>
        </Paper>
      
                  
      ) : (
          <>
          <h2 style={{textAlign:"center"}}>You are not logged in</h2>
          
          {/* <div style={{marginTop: 15}}>
            <GeneralButton 
                handleSubmit={login}
                fullWidth={true}
                text="Log in"
            />
          </div> */}
          </>
      )}
      </>
  )
}

export default Admin;