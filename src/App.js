import './index.css';
import React from 'react';
import Drawer from './Sidebar/Drawer'
import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Axios from "axios";
// import Header from "./layout/Header";
// import Home from "./Pages/Home";
// import Login from "./auth/Login";
// import Register from "./auth/Register";
import UserContext from "./context/UserContext";
import {ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
// import galaxy from "./Images/galaxy.jpg";
// import graybg from "./Images/graybg.jpg";
// import purplebg from "./Images/purplebg.png";

//Notifications
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

import "./style.css";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  title: {
      fontSize:34,
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

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      light: '#fff',
      main: '#fff',
      dark: '#fff'
    },
    secondary: {
      light: '#ffffff',
      main: '#ffffff',
      dark: '#ffffff'
    },
    background: {
      default: "#1D1C24"
    }
  }
});


function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  const [notifications, setNotifications] = useState(0);

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post(
        "http://localhost:5000/users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await Axios.get("http://localhost:5000/users/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();
  }, []);


  return (
    <>
    {/* <div className="background"> */}
    <div>
    <ReactNotification />
      <ThemeProvider theme={theme}>
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Drawer user={userData} />
        </UserContext.Provider>
      </BrowserRouter>
      </ThemeProvider>
      </div>
    </>
  );
}

export default App;
