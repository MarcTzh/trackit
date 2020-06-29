import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));


export default function ChangeAccountDetails(props) {
  const classes = useStyles();
  function handleSubmit() {
    //TODO
  }
  return (
    <form className={classes.root} noValidate autoComplete="off">
      
      <div>
        {/* <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Hello World"
          variant="outlined"
        /> */}
        
        {/* <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          fullWidth
        /> */}

      <TextField
        //Change name
          id="outlined-full-width"
          // style={{ margin: 8 }}
          placeholder="Change name"
          fullWidth
          margin="normal"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          // onChange ={handleNameChange}
          // value = {name}
        />
        <TextField
        //Change displayname
          id="outlined-full-width"
          // style={{ margin: 8 }}
          placeholder="Change display name"
          fullWidth
          margin="normal"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          // onChange ={handleNameChange}
          // value = {name}
        />
        <TextField
        //Change email
          id="outlined-full-width"
          // style={{ margin: 8 }}
          placeholder="Change email"
          fullWidth
          margin="normal"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          // onChange ={handleNameChange}
          // value = {name}
        />
        <TextField
        //Change pw
          id="outlined-full-width"
          // style={{ margin: 8 }}
          placeholder="Change password"
          fullWidth
          margin="normal"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          // onChange ={handleNameChange}
          // value = {name}
        />
        <Button variant="contained" color="secondary" margin ="big" onClick={handleSubmit}>
            Submit 
          </Button>
        {/* <TextField
          id="outlined-read-only-input"
          label="Read Only"
          defaultValue="Hello World"
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
        <TextField
          id="outlined-number"
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        <TextField id="outlined-search" label="Search field" type="search" variant="outlined" />
        <TextField
          id="outlined-helperText"
          label="Helper text"
          defaultValue="Default Value"
          helperText="Some important text"
          variant="outlined"
        /> */}
      </div>
    </form>
  );
}