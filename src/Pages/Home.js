import React, {useState, useEffect, useContext} from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import Loading from '../Loaders/Loading';
// import Poster2 from "../Images/Poster2.jpg";
import { Link } from "react-router-dom";
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
// import GeneralButton from '../Input/GeneralButton';
import { castArray } from 'lodash';
// import Cards from '../Dashboard/Cards';


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
      fontSize:60,
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
        userID
        minPrice
        brand
    }
}`;

let catArray = [];
let pdtCountArray = [];
let brandsArray =[];
let brandsCountArray =[];
let notifications = 0;
//breakdown of notifications
let faultyLinks = 0;
let priceDrops = 0;

function Home() {

    // const [donutChartData, setDonutChartData] = useState({})

    const { userData } = useContext(UserContext);

    const classes = useStyles();

    const { loading: productLoading, error: productError, data: productData } = useQuery(PRODUCTS_QUERY);
    
    const { loading, error, data } = useQuery(CATEGORIES_QUERY);

    if (loading) return <Loading open={true}/>;
    if (error) return <p>Error! :( Please reload the page or try again later.</p>;
    if (productLoading) return <Loading open={true}/>;
    if (productError) return <p>Error! :( Please reload the page or try again later.</p>;
    
    let currUserID;
    //for numbers on the dashboard
    let pdtCounter=0;

      
    if(userData !== undefined && userData.user !== undefined) {
      currUserID = String(userData.user.id);
      catArray =[];
      pdtCountArray =[];
      brandsArray =[];
      brandsCountArray =[];
      notifications = 0;
      faultyLinks = 0;
      priceDrops = 0;

      for(let i = 0; i < data.categories.length; i++) {
        if(currUserID === data.categories[i].userID) {
          catArray.push(data.categories[i].name)
          // console.log("catArray: [" + catArray + "]")
        }
      }

      for(let m= 0; m < catArray.length; m ++){
        pdtCountArray.push(0);
      }

      for(let j = 0; j<productData.products.length; j++) {
        
        if(currUserID === productData.products[j].userID) {

          // for brands chart
          let index = brandsArray.indexOf(productData.products[j].brand)
          if(index === -1) {
            // not inside list of brands
            brandsArray.push(productData.products[j].brand);
            brandsCountArray.push(1);
          } else {
            brandsCountArray[index] = brandsCountArray[index] + 1;
          }

          // for categories chart
          for(let k= 0; k < catArray.length; k ++){
            const product= productData.products[j];
            if(product.category === catArray[k]) {
              pdtCountArray[k] = pdtCountArray[k] + 1
              pdtCounter++;
              //check if faulty link
              const price = product.price;
              console.log(product.name)
              if(price == null || price === 0) {
                // console.log(price)
                faultyLinks++;
              } else {
                //price drops
                if(price < product.minPrice) {
                  priceDrops++;
                  console.log("drop: " + product.name)
                }
              }
            }
          }

        }        
      }
      //count notifications
      notifications = faultyLinks + priceDrops;
      console.log(brandsArray);
      console.log(brandsCountArray)
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
                    <div className={classes.title}>Welcome {userData.user.displayName}</div>
                ) : null }
            </div>
            <div style={{paddingBottom: 10}} className={classes.subtitle}>Your product summary</div>
            {/* <img src={Poster2} alt="Poster2" /> */}
          </div>
          
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.card}>
            <Cards counter={pdtCounter} text={"Products"}/>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.card}>
            <Cards counter={catArray.length} text={"Categories"}/>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.card}>
            <Cards counter={notifications} text={"Notifications"} text3={`${priceDrops} Price drops and ${faultyLinks} Faulty links`}/>
          </Paper>
        </Grid>
        <Grid item xs={6} >
          <Paper className={classes.card}>
            {
              data?
                (<Donut label={catArray} data ={pdtCountArray} title = "Product's categories"/>)
                : (null)
            }
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.card}>
            {/* <BarChart /> */}
            {
              data?
                (<BarChart label={brandsArray} data ={brandsCountArray} title = "Platforms"/>)
                : (null)
            }
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

export default Home;