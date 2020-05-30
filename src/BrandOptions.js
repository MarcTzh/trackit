import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const brandOptions = ['Amazon', 'e-commerce 2', 'e-commerce 3'];

const useStyles = makeStyles((theme) => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

export default function BrandbrandOptions() {
  const [brandValue, setBrandValue] = useState(brandOptions[0]);
  const [inputBrandValue, setInputBrandValue] = useState('');
  const classes = useStyles();

  return (
    <div>
      {/* <div>{`brandValue: ${brandValue !== null ? `'${brandValue}'` : 'null'}`}</div>
      <div>{`inputBrandValue: '${inputBrandValue}'`}</div> */}
      <br />
      <div className={classes.textField}>
        <Autocomplete
          brandValue={brandValue}
          onChange={(event, newValue) => {
            setBrandValue(newValue);
          }}
          inputBrandValue={inputBrandValue}
          onInputChange={(event, newInputValue) => {
            setInputBrandValue(newInputValue);
          }}
          id="controllable-states-demo"
          options={brandOptions}
          style={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Brand" variant="outlined" />}
        />
      </div>
    </div>
  );
}
