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
import Chart from '../Chart/Chart';
import BarChart from '../Chart/BarChart';
import * as styles from '../style.css'
import GeneralButton from '../Input/GeneralButton';
import { castArray } from 'lodash';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
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
    }
}`;

function Home() {

    const [donutChartData, setDonutChartData] = useState({})

    const { userData } = useContext(UserContext);

    const classes = useStyles();

    const { loading: productLoading, error: productError, data: productData } = useQuery(PRODUCTS_QUERY);
    
    const { loading, error, data } = useQuery(CATEGORIES_QUERY);

    if (loading) return <Loading open={true}/>;
    if (error) return <p>Error! :( Please reload the page or try again later.</p>;
    if (productLoading) return <Loading open={true}/>;
    if (productError) return <p>Error! :( Please reload the page or try again later.</p>;


      let catArray =[];
      let pdtCountArray =[];

    let currUserID;
    if(userData !== undefined && userData.user !== undefined) {
        currUserID = String(userData.user.id);
        
         catArray =[];
         pdtCountArray =[];

        for(let i = 0; i < data.categories.length; i++) {
          if(currUserID === data.categories[i].userID) {
            catArray.push(data.categories[i].name)
          }
        }

        for(let m= 0; m < catArray.length; m ++){
          pdtCountArray.push(0);
        }

        for(let j = 0; j<productData.products.length; j++) {
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
                      <div className={classes.title}>Welcome {userData.user.displayName}</div>
                  ) : null }
              </div>
              <div className={classes.subtitle}>This week's summary</div>
              {/* <img src={Poster2} alt="Poster2" /> */}
              </div>
            
          </Grid>
          <Grid item xs={6} style={{border: "1px solid gray"}}>
            <Paper className={classes.paper}>{
              data?
                (<Donut  label={catArray} data ={pdtCountArray} title = "Product's categories"/>)
                : (null)
            }
            </Paper>
          </Grid>
          <Grid item xs={6} style={{border: "1px solid gray"}}>
            <Paper className={classes.paper}>
              <BarChart />
            </Paper>
          </Grid>
          {/* <Grid item xs={12}>
            <Paper className={classes.paper}>Test</Paper>
          </Grid> */}
          {/* <ComplexGrid/>
          <ComplexGrid/>
          <ComplexGrid/> */}
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