import React, { useContext } from 'react';
import DiscreteSlider from '../Input/Slider';
import ChangeAccountDetails from '../Input/ChangeAccountDetails'
import Paper from '@material-ui/core/Paper';
import UserContext from '../context/UserContext';
import { Link } from "react-router-dom";


function Settings(props) {
    const { userData } = useContext(UserContext);

    function editNotificationPreference (value) {
        //add this to userModel
    }
    return (
        <>
        {userData.user ? (
        <Paper style={{ margin: 15 , padding: 30}}>   
        <div>
            <div style={{ marginTop: -30}}>
                    <h1>User settings</h1>
                    <h2>Edit notification settings</h2>
                    <DiscreteSlider editSliderValue={editNotificationPreference}/>
            </div>
            <div style={{ marginTop: 30}}>
                <h2>Edit account details</h2>
                <ChangeAccountDetails />
            </div>

        </div>
        </Paper>
        ) : (
            <>
            <h2>You are not logged in</h2>
            <Link to="/login">Log in</Link>
            </>
        )}
        </>
    )
}

export default Settings;