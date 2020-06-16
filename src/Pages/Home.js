import React, {useState, useEffect} from 'react';
import Poster from "../Images/Poster final.jpg";
// const Poster = require('../Images/Poster final.jpg')
// const { React, useEffect, useState } = require('react');
// const { test } = require("../Parser/AutorunScript.js");
// import test from "../Parser/AutorunScript.js";

function Home() {
    const [today, setToday] = useState(new Date());
    
    useEffect(() => {
        const interval = setInterval(() => {
            setToday(new Date());
        }, 1000);
        return () => clearInterval(interval);
      }, []);
    const date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    
    return (
        <div>
            <h1>Welcome User</h1>
            <h2>{date} {time}</h2>
            <h3>Here is what trackit can do for you</h3>
            <img src={Poster} alt="Poster" />
        </div>
    );
}

export default Home;