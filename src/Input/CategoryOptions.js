import React, {useState, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { gql } from 'apollo-boost';
import { useQuery, } from '@apollo/react-hooks';
import { Link } from "react-router-dom";
import UserContext from '../context/UserContext';
import Loading from '../Loaders/Loading';


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
      marginBottom: theme.spacing(1),
      justifyContent: "flex-end"
    },

  }));

export default function CategoryOptions(props) {
  const categoryOptions = [];
  const [categoryValue, setCategoryValue] = useState(categoryOptions[0]);
  const classes = useStyles();
  const { loading, error, data } = useQuery(CATEGORIES_QUERY);
  const [inputCategoryValue, setInputCategoryValue] = useState('');
  const { userData } = useContext(UserContext);
  
  if (loading) return <Loading open={true}/>;
  if (error) return <p>Error! :(</p>;
  
    data.categories.filter((category) => 
    category.userID === userData.user.id)
  .map((category) => categoryOptions.push(category.name));

  return (
    <>
      {userData.user ? (
        <div>
            <Autocomplete
                categoryValue = {categoryValue}
                onChange = {(event, newValue) => {
                    setCategoryValue(newValue);
                    //for filtering purposes
                    if(props.callBackFromParent) {
                      props.callBackFromParent(newValue); 
                    }
                    // console.log("onchange" + newValue)
                  }
                }
                inputCategoryValue = {inputCategoryValue}
                onInputChange = {(event, newInputValue) => {
                  // console.log("newInput" + newInputValue)
                  setInputCategoryValue(newInputValue);
                  if(props.callBackFromParent) {
                    setInputCategoryValue(newInputValue);
                      props.callBackFromParent(newInputValue); 
                      // console.log("props" + newInputValue)
                    }
                }}
                // id = "controllable-states-demo"
                options = {categoryOptions}
                className={classes.textField}
                freeSolo
                fullWidth
                renderInput = {(params) => <TextField {...params} margin="normal" label="Category" variant="outlined" />}
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
