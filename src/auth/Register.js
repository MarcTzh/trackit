import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import Axios from "axios";
import { store } from 'react-notifications-component';
import GeneralButton from '../Input/GeneralButton';
import GeneralTextField from '../Input/GeneralTextField';
import { makeStyles } from '@material-ui/core/styles';

export default function Register() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [displayName, setDisplayName] = useState();

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
      const newUser = { email, password, passwordCheck, displayName };
      await Axios.post("http://localhost:5000/users/register", newUser);
      const loginRes = await Axios.post("http://localhost:5000/users/login", {
        email,
        password,
      });
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/");
      store.addNotification({
        title: "Registration successful:",
        message: `Please log in`,
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
      <h2>Register</h2>
        <GeneralTextField
          placeholder="Email"
          fullWidth
          onChange ={(e) => setEmail(e.target.value)}
          value = {email}
        />
        <GeneralTextField
          placeholder="Password"
          onChange ={(e) => setPassword(e.target.value)}
          value = {password}
        />
        <GeneralTextField
          placeholder="Verify password"
          onChange ={(e) => setPasswordCheck(e.target.value)}
          value = {password}
        />
        <GeneralTextField
          placeholder="Display name"
          onChange ={(e) => setDisplayName(e.target.value)}
        />

        <div style={{marginTop: 15}}> 
          <GeneralButton 
              onClick={submit}
              fullWidth={true}
              text="Submit"
          />
        </div>
    </div>
  );
}