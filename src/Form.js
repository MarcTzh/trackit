import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Options from './Options';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
}));

export default function LayoutTextFields() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        <Options/>
      </div>
      <div>
        <TextField
          id="outlined-full-width"
        //   label="Product name"
          style={{ margin: 8 }}
          placeholder="Product name"
        //   helperText="Full width!"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        <TextField
        //   id="outlined-full-width"
        //   label="Product name"
          style={{ margin: 8 }}
          placeholder="Product url"
        //   helperText="Full width!"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        <TextField
        //   label="None"
          id="outlined-margin-none"
          placeholder="Price floor"
          className={classes.textField}
          helperText="Some important text"
          variant="outlined"
        />
        <TextField
        //   label="None"
          id="outlined-margin-none"
          placeholder="Price ceiling"
          className={classes.textField}
          helperText="Some important text"
          variant="outlined"
        />
        <TextField
        //   label="None"
          id="outlined-margin-none"
          defaultValue="Default Value"
          className={classes.textField}
          helperText="Some important text"
          variant="outlined"
        />

      </div>
    </div>
  );
}
