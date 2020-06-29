import React, {useState, useEffect, useContext} from 'react';
import Poster2 from "../Images/Poster2.jpg";
import { Link } from "react-router-dom";
import UserContext from '../context/UserContext';
import Paper from '@material-ui/core/Paper';
// const Poster = require('../Images/Poster final.jpg')
// const { React, useEffect, useState } = require('react');
// const { test } = require("../Parser/AutorunScript.js");
// import test from "../Parser/AutorunScript.js";

function Home() {
    const [today, setToday] = useState(new Date());
    const { userData } = useContext(UserContext);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setToday(new Date());
        }, 1000);
        return () => clearInterval(interval);
      }, []);
      
    const date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    
    return (
        <>
        {userData.user ? (
        <Paper style={{ margin: 30 , padding: 30}}>   
        <div>
            {/* <h2>{date} {time}</h2> */}
            <div className="page">
                {userData.user ? (
                    <h1>Welcome {userData.user.displayName}</h1>
                ) : (
                    <>
                    <h2>You are not logged in</h2>
                    <Link to="/login">Log in</Link>
                    </>
                )}
            </div>
            <h3>Here is what trackit can do for you</h3>
            <img src={Poster2} alt="Poster2" />
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

export default Home;