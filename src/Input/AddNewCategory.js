import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { gql } from 'apollo-boost';
import {useMutation } from '@apollo/react-hooks';
import Button from '@material-ui/core/Button';
import UserContext from '../context/UserContext';
import Successbar from '../Snackbars/Successbar';


const CATEGORIES_QUERY = gql `
{
    categories {
        id
        name
    }
}`;

const CREATE_CATEGORY_MUTATION = gql`
  mutation createCategory($name: String!, $userID: String!){
  createCategory(name: $name, userID: $userID) {
    id
    name
    userID
  }
}
`;

const useStyles = makeStyles((theme) => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export default function AddNewCategory() {
  const classes = useStyles();
  const [createCategory] = useMutation(CREATE_CATEGORY_MUTATION);
  const [name, setName] = useState('');
  const { userData } = useContext(UserContext);

  const [ noti, setNoti ] = useState({
    open: '',
    severity: '',
    message: ''
  });


  function handleNameChange(e) {
    const newName = e.target.value;
    setName(newName);
  }

  function handleSubmit() {
    if(name !== '' ){
      createCategory( 
                    {
                        variables: {name: name, userID: userData.user.id},
                        refetchQueries: [{ query: CATEGORIES_QUERY}] 
                    }
                 )
      setName('');
      setNoti(
      {
        open: true,
        severity: "success",
        message: 'Your product is being processed! Please wait a moment for it to appear on your Products Page'
        }
      );
  } else {
    setNoti(
      {
        open: true,
        severity: "error",
        message: 'Not all required fields are entered'
      }
    );
  }
}
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setNoti({...noti, open: false});
  };


  return (
      <div>
        <Successbar 
          message = {noti.message}
          severity = {noti.severity}
          open = {noti.open}
          handleClose={handleClose}
        />
        <TextField
        //Category NAME
          id="outlined-full-width"
          // style={{ margin: 8 }}
          placeholder="Add New Category"
          fullWidth
          margin="normal"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange ={handleNameChange}
          value = {name}
        />

        <div style={{paddingTop: 10}}>
          <Button variant="contained" color="secondary" margin ="big" onClick={handleSubmit} 
          fullWidth className={classes.textField}>
            Submit 
          </Button>
        </div>

      </div>
  );
}
