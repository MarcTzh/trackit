import React, {useState, useEffect, useContext} from 'react';
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

function Home() {
    // const [today, setToday] = useState(new Date());
    const { userData } = useContext(UserContext);
    const classes = useStyles();
    
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setToday(new Date());
    //     }, 1000);
    //     return () => clearInterval(interval);
    //   }, []);
      
    // const date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
    // const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    
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
              <div className={classes.subtitle}>This is this week's summary</div>
              {/* <img src={Poster2} alt="Poster2" /> */}
              </div>
            
          </Grid>
          <Grid item xs={6} style={{border: "1px solid gray"}}>
            <Paper className={classes.paper}>
                <Donut/>
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