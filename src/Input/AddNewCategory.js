import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { gql } from 'apollo-boost';
import {useMutation } from '@apollo/react-hooks';
import Button from '@material-ui/core/Button';


const CATEGORIES_QUERY = gql `
{
    categories {
        id
        name
    }
}`;

const CREATE_CATEGORY_MUTATION = gql`
  mutation createCategory($name: String!){
  createCategory(name: $name) {
    id
    name
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

function handleNameChange(e) {
  const newName = e.target.value;
  setName(newName);
}

  function handleSubmit() {
    if(name !== '' ){
      createCategory( 
                    {
                        variables: {name: name},
                        refetchQueries: [{ query: CATEGORIES_QUERY}] 
                    }
                 )
                 setName('');
      
    }
}
  return (
      <div>
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

        <div>
          <Button variant="contained" color="secondary" margin ="big" onClick={handleSubmit}>
            Submit 
          </Button>
        </div>

      </div>
  );
}