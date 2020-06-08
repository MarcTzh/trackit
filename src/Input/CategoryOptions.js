import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const categoryOptions = ['Electronics', 'Clothing', 'Food', 'Lifestyle'];

const useStyles = makeStyles((theme) => ({
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  }));

export default function CategoryOptions() {
  const [categoryValue, setCategoryValue] = useState(categoryOptions[0]);
  const [inputCategoryValue, setInputCategoryValue] = useState('');
  const classes = useStyles();

  return (
    <div className={classes.textField}>
        <Autocomplete
            categoryValue={categoryValue}
            onChange={(event, newValue) => {
            setCategoryValue(newValue);
            }}
            inputCategoryValue={inputCategoryValue}
            onInputChange={(event, newInputValue) => {
            setInputCategoryValue(newInputValue);
            }}
            id="controllable-states-demo"
            options={categoryOptions}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Category" variant="outlined" />}
        />
    </div>
  );
}
