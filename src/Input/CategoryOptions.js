import React, {useState, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { gql } from 'apollo-boost';
import { useQuery, } from '@apollo/react-hooks';
import { Link } from "react-router-dom";
import UserContext from '../context/UserContext';

const CATEGORIES_QUERY = gql `
{
    categories {
        id
        name
        userID
    }
}`;

const useStyles = makeStyles((theme) => ({
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  }));

export default function CategoryOptions(props) {
  const categoryOptions = [];
  const [categoryValue, setCategoryValue] = useState(categoryOptions[0]);
  const classes = useStyles();
  const { loading, error, data } = useQuery(CATEGORIES_QUERY);
  const [inputCategoryValue, setInputCategoryValue] = useState('');
  const { userData } = useContext(UserContext);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! :(</p>;
  
    data.categories.filter((category) => 
    category.userID === userData.user.id)
  .map((category) => categoryOptions.push(category.name));

  return (
    <>
      {userData.user ? (
        <div className={classes.textField}>
            <Autocomplete
                categoryValue = {categoryValue}
                onChange = {(event, newValue) => {
                    setCategoryValue(newValue);
                    //for filtering purposes
                    if(props.callBackFromParent) {
                      props.callBackFromParent(newValue); 
                    }
                  }
                }
                inputCategoryValue = {inputCategoryValue}
                onInputChange = {(event, newInputValue) => {
                  setInputCategoryValue(newInputValue);
                }}
                id = "controllable-states-demo"
                options = {categoryOptions}
                style = {{ width: 300 }}
                renderInput = {(params) => <TextField {...params} label="Category" variant="outlined" />}
            />
        </div>
      ) : (
            <>
              <h2>You are not logged in</h2>
              <Link to="/login">Log in</Link>
            </>
          )}
    </>
  );
} 
