import React, {useState, useEffect, useContext} from 'react';
import Poster2 from "../Images/Poster2.jpg";
import { Link } from "react-router-dom";
import UserContext from '../context/UserContext';
import Paper from '@material-ui/core/Paper';
// const Poster = require('../Images/Poster final.jpg')
// const { React, useEffect, useState } = require('react');
// const { test } = require("../Parser/AutorunScript.js");
// import test from "../Parser/AutorunScript.js";

function Notifications() {
    const { userData } = useContext(UserContext);
    
    return (
        <>
        {userData.user ? (
        <Paper style={{ margin: 30 , padding: 30}}>   
        <div>
            <div className="page">
                <h1>Notifications </h1>
            </div>
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

export default Notifications;