import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const options = ['to', 'be', 'updated', 'Audio devices'];

const useStyles = makeStyles((theme) => ({
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  }));

export default function CategoryOptions() {
  const [value, setValue] = useState(options[0]);
  const [inputValue, setInputValue] = useState('');
  const classes = useStyles();

  return (
    <div className={classes.textField}>
        <Autocomplete
            value={value}
            onChange={(event, newValue) => {
            setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
            }}
            id="controllable-states-demo"
            options={options}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Category" variant="outlined" />}
        />
    </div>
  );
}
