import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import BrandOptions from './BrandOptions';
import CategoryOptions from './CategoryOptions';



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

export default function LayoutTextFields() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        <CategoryOptions/>
        <BrandOptions/>
      </div>
      <div>
        
        <TextField
        //PRODUCT NAME
          id="outlined-full-width"
          // style={{ margin: 8 }}
          placeholder="Product name"
          fullWidth
          margin="normal"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />

        <TextField
        //PRODUCT URL
          // style={{ margin: 8 }}
          placeholder="Product url"
          fullWidth
          margin="normal"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />

        <TextField
          id="outlined-margin-none"
          placeholder="Price"
          margin="normal"
          className={classes.textField}
          variant="outlined"
        />

        <TextField
          id="outlined-margin-none"
          placeholder="Price floor"
          margin="normal"
          className={classes.textField}
          variant="outlined"
        />
        
        <TextField
          id="outlined-margin-none"
          placeholder="Price ceiling"
          margin="normal"
          className={classes.textField}
          variant="outlined"
        />
        

      </div>
    </div>
  );
}
