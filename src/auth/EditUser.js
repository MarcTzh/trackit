import React, { useState, useContext } from "react";
// import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import Axios from "axios";
import Successbar from '../Snackbars/Successbar';
import Slider from '../Input/Slider';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// import Autocomplete from '@material-ui/lab/Autocomplete';


export default function EditUser() {
    const [newEmail, setNewEmail] = useState(null);
    const [currPassword, setCurrPassword] = useState(null);
    const [newPassword, setNewPassword] = useState(null);
    const [newDisplayName, setNewDisplayName] = useState(null);
    const [notiSettings, setNotiSettings] = useState(null);
    //For notifications
    const [ noti, setNoti ] = useState({
        open: '',
        severity: '',
        message:''
    });
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
  
    const { userData } = useContext(UserContext);
    // const history = useHistory();
    // console.log(userData)
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
            setNoti({
                open: true,
                severity: 'success',
                message: 'Your details have been updated, please log in again'
            });
        } catch (err) {
            if(err.response.data.msg) {
                setNoti({
                    open: true,
                    severity: 'error',
                    message: `${err.response.data.msg}`
                });
            } 
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setNoti({...noti, open: false});
    };
    return (
        <div className="page">
        <Successbar 
            open = {noti.open}
            severity = {noti.severity}
            message = {noti.message}
            handleClose = {handleClose}
        />

        <h2>Edit account information</h2>
        {/* {error && (
            <ErrorNotice message={error} clearError={() => setError(undefined)} />
        )} */}

        <Slider editSliderValue={(value) => setNotiSettings(value)}/>
        <TextField
          id="outlined-full-width"
          // style={{ margin: 8 }}
          placeholder="New email"
          fullWidth
          margin="normal"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange ={(e) => setNewEmail(e.target.value)}
        //   value = "new email"
        />
        <TextField
          id="outlined-full-width"
          // style={{ margin: 8 }}
          placeholder="New email"
          fullWidth
          margin="normal"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange ={(e) => setNewEmail(e.target.value)}
        //   value = "new email"
        />

        <TextField
          id="outlined-full-width"
          // style={{ margin: 8 }}
          placeholder="New password"
          fullWidth
          margin="normal"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange ={(e) => setNewPassword(e.target.value)}
        //   value = "new email"
        />
        
        <TextField
            id="outlined-full-width"
            // style={{ margin: 8 }}
            //   placeholder="New display name"
            placeholder={userData.user.displayName}
            fullWidth
            margin="normal"
            className={classes.textField}
            InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange ={(e) => setNewDisplayName(e.target.value)}
        //   value = "new email"
        />

        <TextField
          id="outlined-full-width"
          // style={{ margin: 8 }}
          placeholder="Current password"
          fullWidth
          margin="normal"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange ={(e) => setCurrPassword(e.target.value)}
        //   value = "new email"
        />
        {/* <form className="form" onSubmit={submit}> */}
            {/* <label htmlFor="login-email">New Email</label>
            <input
            id="login-email"
            type="email"
            onChange={(e) => setNewEmail(e.target.value)}
            />

            <label htmlFor="login-password">New Password</label>
            <input
            type="text"
            onChange={(e) => setNewPassword(e.target.value)}
            /> */}

            {/* <label htmlFor="login-password">Display Name</label>
            <input
            type="text"
            placeholder={userData.user.displayName}
            onChange={(e) => setNewDisplayName(e.target.value)}
            />

            <label htmlFor="login-password">Password</label>
                <input
                id="login-password"
                type="password"
                placeholder="current password"
                onChange={(e) => setCurrPassword(e.target.value)}
            /> */}
            <div style={{paddingTop: 10}}>
            <Button variant="contained" color="secondary" margin ="big" onClick={handleSubmit}
                fullWidth={true} className={classes.textField}>
                Submit 
            </Button>
            </div>
        </div>
    );
}