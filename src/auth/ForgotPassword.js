import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import Axios from "axios";
import { store } from 'react-notifications-component';



export default function ForgotPassword() {
  const [email, setEmail] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

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
      <form className="form" onSubmit={submit}>
        <label htmlFor="login-email">Email</label>
        <input
          id="login-email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}