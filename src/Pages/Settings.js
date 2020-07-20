import React, { useState, useContext } from 'react';
// import DiscreteSlider from '../Input/Slider';
// import ChangeAccountDetails from '../Input/ChangeAccountDetails'
import Paper from '@material-ui/core/Paper';
import UserContext from '../context/UserContext';
import { Link } from "react-router-dom";
// import { useHistory } from "react-router-dom";
import EditUser from '../auth/EditUser'
import { makeStyles } from '@material-ui/core/styles';

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
      paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        // color: theme.palette.text.secondary,
        background: "#212029",
      },
  }));

  
function Settings(props) {
    // const history = useHistory();
    const { userData } = useContext(UserContext);
    const classes = useStyles();
    
    return (
        <>
        {userData.user ? (
        <div className={classes.paper} style={{margin: 30 , padding: 30}}>   
            <div className={classes.title}>User settings</div>

            <EditUser />
        </div >
        ) : (
            <>
            <h2>You are not logged in</h2>
            <Link to="/login">Log in</Link>
            </>
        )}
        </>
    )
}

export default Settings;