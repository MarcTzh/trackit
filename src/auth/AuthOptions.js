import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import { store } from 'react-notifications-component';
import GeneralButton from '../Input/GeneralButton';

export default function AuthOptions(props) {
  const { userData, setUserData } = useContext(UserContext);

  const history = useHistory();

  const register = () => history.push("/register");
  const login = () => history.push("/login");
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
    props.closeDrawer()
    history.push('/')
    store.addNotification({
      title: "Success:",
      message: "You have logged out",
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 1000,
        onScreen: true
      }
    });
  };

  return (
    <div style={{marginTop: 5}}>
      {userData.user ? (
        <GeneralButton 
            onClick={logout}
            fullWidth={false}
            text="Logout"
        />
      ) : (
        <>
          <GeneralButton 
            onClick={register}
            fullWidth={false}
            text="Register"
          />
          <GeneralButton 
            onClick={login}
            fullWidth={false}
            text="Login"
          />
        </>
      )}
    </div>
  );
}