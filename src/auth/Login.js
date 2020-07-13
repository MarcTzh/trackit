import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import Axios from "axios";
import { store } from 'react-notifications-component';
import GeneralButton from '../Input/GeneralButton';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();
  const Forgot = () => history.push("/ForgotPassword");

  const useStyles = makeStyles((theme) => ({
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));

  const classes = useStyles();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = { email, password };
      const loginRes = await Axios.post(
        "http://localhost:5000/users/login",
        loginUser
      );
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/");
      store.addNotification({
        title: "Login successful:",
        message: "Welcome!",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 2000,
          onScreen: true
        }
      });
    } catch (err) {
      if(err.response.data.msg) {
        store.addNotification({
          title: "Error:",
          message: `${err.response.data.msg}`,
          type: "danger",
          insert: "top",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 2000,
            onScreen: true
          }
      });
      }
    }
  };
  return (
    <div className="page">
      <h2>Log in</h2>
      <TextField
        //PRODUCT URL
          // style={{ margin: 8 }}
          placeholder="Email"
          fullWidth
          margin="normal"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange ={(e) => setEmail(e.target.value)}
          value = {email}
          type="email"
        />
      
      <TextField
          placeholder="Password"
          fullWidth
          margin="normal"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange ={(e) => setPassword(e.target.value)}
          value = {password}
          type="password"
        />
        <div style={{marginTop: 15}}> 
          <GeneralButton 
              handleSubmit={submit}
              fullWidth={true}
              text="Log in"
          />  
        </div>
        <div style={{marginTop: 15}}> 
          <GeneralButton 
              handleSubmit={Forgot}
              fullWidth={true}
              text="Forgot password"
          />  
        </div>
    </div>
  );
}