import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";

import Slider from '../Input/Slider';


export default function EditUser() {
    const [newEmail, setNewEmail] = useState(null);
    const [currPassword, setCurrPassword] = useState(null);
    const [newPassword, setNewPassword] = useState(null);
    const [newDisplayName, setNewDisplayName] = useState(null);
    const [notiSettings, setNotiSettings] = useState(null);
    const [error, setError] = useState();
  
    const { userData } = useContext(UserContext);
    // const history = useHistory();
    // console.log(userData)
    const id = userData.user.id;
    const submit = async (e) => {
        e.preventDefault();
        alert('Your details have been updated, please login again')
        try {
            const user = {
                id,
                newEmail,
                currPassword,
                newPassword,
                newDisplayName,
                notiSettings,
            };
            console.log(user);
            const loginRes = await Axios.post(
                "http://localhost:5000/users/EditUser",
                user
            );
            localStorage.setItem("auth-token", loginRes.data.token);
        } catch (err) {
        err.response.data.msg && setError(err.response.data.msg);
        }
    };

    function editSliderValue(value) {
        setNotiSettings(value)
    }
    return (
        <div className="page">
        <h2>Edit account information</h2>
        {error && (
            <ErrorNotice message={error} clearError={() => setError(undefined)} />
        )}

        <Slider editSliderValue={editSliderValue}/>
        <form className="form" onSubmit={submit}>
            <label htmlFor="login-email">New Email</label>
            <input
            id="login-email"
            type="email"
            onChange={(e) => setNewEmail(e.target.value)}
            />

            <label htmlFor="login-password">New Password</label>
            <input
            type="text"
            onChange={(e) => setNewPassword(e.target.value)}
            />

            <label htmlFor="login-password">Display Name</label>
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
            />

            <input type="submit" value="Submit" />
        </form>
        </div>
    );
}