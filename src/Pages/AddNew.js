import React, {useContext } from 'react';
import Form from '../Input/Form';
import AddNewCategory from '../Input/AddNewCategory';
import Paper from '@material-ui/core/Paper';
import UserContext from '../context/UserContext';
import { Link } from "react-router-dom";

function AddNew() {
    const { userData } = useContext(UserContext);
    return (
        <>
        {userData.user ? (
            <Paper style={{ margin: 30 , padding: 30}}>   
            <div>
                <h1>Add a new product to track!</h1>
                <h2>Add new category</h2>
                <AddNewCategory/>
                <h2>Add your new product below</h2>
                <Form />
            </div>
            </Paper>
        ) : (
            <>
            <h2>You are not logged in</h2>
            <Link to="/login">Log in</Link>
            </>
        )}
        </>)
}

export default AddNew;