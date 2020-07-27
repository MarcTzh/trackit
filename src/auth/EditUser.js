import React, { useState, useContext } from "react";
// import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import Axios from "axios";
import Slider from '../Input/Slider';
import { makeStyles } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';
import GeneralButton from '../Input/GeneralButton';
import GeneralTextField from '../Input/GeneralTextField';
import { store } from 'react-notifications-component';
// import App from '../App';

export default function EditUser() {
    const [newEmail, setNewEmail] = useState(null);
    const [currPassword, setCurrPassword] = useState(null);
    const [newPassword, setNewPassword] = useState(null);
    const [newDisplayName, setNewDisplayName] = useState(null);
    const [notiSettings, setNotiSettings] = useState(null);

    const useStyles = makeStyles((theme) => ({
        title: {
            fontSize:44,
            color: "white",
            fontWeight:700,
          },
          subtitle: {
            padding: theme.spacing(2),
            marginTop: 15,
            marginBottom: 5,
            fontSize:28,
            color: "white",
            fontWeight:500,
          },
          subtitle2: {
            padding: theme.spacing(2),
            marginTop: 5,
            marginBottom: -15,
            fontSize:20,
            color: "white",
            fontWeight:200,
          },
          paper: {
            padding: theme.spacing(1),
            textAlign: 'center',
            // color: theme.palette.text.secondary,
            background: "#212029",
          },
      }));
      
    const classes = useStyles();
  
    const { userData } = useContext(UserContext);

    const id = userData.user.id;
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = {
                id,
                newEmail,
                currPassword,
                newPassword,
                newDisplayName,
                notiSettings,
            };
            const loginRes = await Axios.post(
                "http://localhost:5000/users/EditUser",
                user
            );
            localStorage.setItem("auth-token", loginRes.data.token);
            // console.log("err")
            store.addNotification({
                title: "Success:",
                message: "Your details have been updated, please log in again",
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
                console.log("err")
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
        <div>
            <div className={classes.subtitle}>Edit Account Details</div>

            <div className={classes.subtitle2}>Notification Settings</div>
            <Slider editSliderValue={(value) => setNotiSettings(value)}/>
            
            <div className={classes.subtitle2}>Edit Email</div>
            <GeneralTextField
            placeholder="New Email"
            onChange ={(e) => setNewEmail(e.target.value)}
            type="email"
            //   value = "new email"
            />

            <div className={classes.subtitle2}>Edit Password</div>
            <GeneralTextField
            placeholder="New Password"
            onChange ={(e) => setNewPassword(e.target.value)}
            //   value = "new email"
            />
            
            <div className={classes.subtitle2}>Edit Display Name</div>
            <GeneralTextField
            placeholder={userData.user.displayName}
            onChange ={(e) => setNewDisplayName(e.target.value)}
            type="email"
            //   value = "new email"
            />

            <div className={classes.subtitle2}>Enter Current Password</div> 
            <GeneralTextField
            placeholder="Current Password"
            variant="outlined"
            onChange ={(e) => setCurrPassword(e.target.value)}
            type="password"
            //   value = "new email"
            />
            <div style={{paddingTop: 15}}>
            <GeneralButton onClick={handleSubmit}
                fullWidth={true} text="Submit" />
            </div>
        </div>
    );
}