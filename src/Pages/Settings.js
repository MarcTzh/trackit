import React, { useState, useContext } from 'react';
// import DiscreteSlider from '../Input/Slider';
// import ChangeAccountDetails from '../Input/ChangeAccountDetails'
import Paper from '@material-ui/core/Paper';
import UserContext from '../context/UserContext';
import { Link } from "react-router-dom";
// import { useHistory } from "react-router-dom";
import EditUser from '../auth/EditUser'

function Settings(props) {
    // const history = useHistory();
    const { userData } = useContext(UserContext);
    // const Forgot = () => history.push("/ForgotPassword");
    
    return (
        <>
        {userData.user ? (
            
        <Paper style={{ margin: 15 , padding: 30}}>   
        <div>
            <h1>User settings</h1>

            <EditUser />
        </div>
        </Paper>
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