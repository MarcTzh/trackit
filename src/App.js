import './index.css';
import React from 'react';
import Drawer from './Sidebar/Drawer'
import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Axios from "axios";
// import Header from "./layout/Header";
import Home from "./Pages/Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import UserContext from "./context/UserContext";

//Notifications
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

import "./style.css";

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

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
    <ReactNotification />
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Drawer user={userData} />
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
