import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { gql } from 'apollo-boost';
import {useMutation } from '@apollo/react-hooks';
import GeneralTextField from '../Input/GeneralTextField';
import GeneralButton from '../Input/GeneralButton';
import UserContext from '../context/UserContext';
import { store } from 'react-notifications-component';



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
      store.addNotification({
        title: "Success!",
        message: "Your product is being processed! Please wait a moment for it to appear on your Products Page",
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
      
  } else {
    store.addNotification({
      title: "Error:",
      message: "Not all required fields are entered",
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

  return (
      <div>
        <GeneralTextField
        //Category NAME
          placeholder="Add New Category"
          onChange ={handleNameChange}
          value = {name}
        />
        <div style={{paddingTop: 10}}>
          <GeneralButton 
          onClick={handleSubmit} 
          fullWidth 
          text="Submit" />
        </div>

      </div>
  );
}
