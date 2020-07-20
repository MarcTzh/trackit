import React, {useContext } from 'react';
import Form from '../Input/Form';
import AddNewCategory from '../Input/AddNewCategory';
import Paper from '@material-ui/core/Paper';
import UserContext from '../context/UserContext';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    title: {
        fontSize:44,
        color: "white",
        fontWeight:700,
      },
      subtitle: {
        fontSize:28,
        color: "white",
        fontWeight:500,
      },
      paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        // color: theme.palette.text.secondary,
        background: "#212029",
      },
  }));
  

function AddNew() {
    const { userData } = useContext(UserContext);
    const classes = useStyles();


    return (
        <>
        {userData.user ? (
            <div className={classes.paper} style={{margin: 30 , padding: 30}}>   
            <div>
                {/* <h1>Add a new product to track!</h1> */}
                {/* <h2>Add new category</h2>
                <AddNewCategory/> */}
                <div 
                    className={classes.title}
                    style={{marginBottom: 30}}>
                    Add New Product
                </div>
                <Form />
            </div>
            </div>
        ) : (
            <>
            <h2>You are not logged in</h2>
            <Link to="/login">Log in</Link>
            </>
        )}
        </>)
}

export default AddNew;