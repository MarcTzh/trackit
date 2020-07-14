import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import Axios from "axios";
import { store } from 'react-notifications-component';
import GeneralButton from '../Input/GeneralButton';
import GeneralTextField from '../Input/GeneralTextField';
import { makeStyles } from '@material-ui/core/styles';


export default function ForgotPassword() {
  const [email, setEmail] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

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
      const user = { email };
      const loginRes = await Axios.post(
        "http://localhost:5000/users/ForgotPassword",
        user
      );
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/");
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
    store.addNotification({
      title: "Success:",
      message: `Password reset link has been sent to you`,
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
  };
  return (
    <div className="page">
      <h2>Reset Password</h2>
      <GeneralTextField
          placeholder="Email"
          onChange ={(e) => setEmail(e.target.value)}
          value = {email}
        />
        <div style={{marginTop: 15}}> 
          <GeneralButton 
              handleSubmit={submit}
              fullWidth={true}
              text="Send reset link"
          />  
        </div>
    </div>
  );
}