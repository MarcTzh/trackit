import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import UserContext from "../context/UserContext";
import Axios from "axios";
import { store } from 'react-notifications-component';
import GeneralButton from '../Input/GeneralButton';
import GeneralTextField from '../Input/GeneralTextField';

export default function ResetPassword(props) {
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();

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

//   console.log(props);

  const submit = async (e) => {
    e.preventDefault();

    try {
      const data = {
          newPass: password,
          confirmNewPass: passwordCheck,
          resetLink: props.match.params.token
      };
      await Axios.post("http://localhost:5000/users/ResetPassword", data,);
      const loginRes = await Axios.post("http://localhost:5000/users/ResetPassword", {
        data,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      alert('Your password has been reset, please login')
      history.push("/login");
      store.addNotification({
        title: "Success:",
        message: `Password has been reset`,
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
      <h2>Please enter your new password</h2>
        <GeneralTextField
          placeholder="Password"
          onChange ={(e) => setPassword(e.target.value)}
          type="password"
        />
        <GeneralTextField
          placeholder="Re-type password"
          onChange ={(e) => setPasswordCheck(e.target.value)}
          type="password"
        />

        <div style={{marginTop: 15}}>
          <GeneralButton 
              handleSubmit={submit}
              fullWidth={true}
              text="Submit"
          />
        </div>
    </div>
  );
}