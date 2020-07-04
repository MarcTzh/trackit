import React, { useContext } from 'react';
import DiscreteSlider from '../Input/Slider';
// import ChangeAccountDetails from '../Input/ChangeAccountDetails'
import Paper from '@material-ui/core/Paper';
import UserContext from '../context/UserContext';
import { Link } from "react-router-dom";
// import { useHistory } from "react-router-dom";
import EditUser from '../auth/EditUser'

function Settings(props) {
    // const history = useHistory();
    const { userData } = useContext(UserContext);
    // const Forgot = () => history.push("/ForgotPassword");
    
    function editNotificationPreference (value) {
        //add this to userModel
    }
    return (
        <>
        {userData.user ? (
        <Paper style={{ margin: 15 , padding: 30}}>   
        <div>
            <h1>User settings</h1>
            {/* <h2>Edit notification settings</h2>
            <DiscreteSlider editSliderValue={editNotificationPreference}/> */}
            {/* <ChangeAccountDetails /> */}
            <EditUser />
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