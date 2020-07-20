import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';


export default function GeneralTextField(props) {
    
    const useStyles = makeStyles((theme) => ({
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            marginBottom: theme.spacing(1),
            // border: "1px solid gray",
            // backgroundColor: "#4d6d80"
        },
        // input: {
        //     "&::placeholder": {
        //       textOverflow: "ellipsis !important",
        //       color: "white",
        //       fontSize: 14
        //     }
        // },
        // root: {
        // width: '100%',
        // '& > * + *': {
        //     marginTop: theme.spacing(2),
        // },
        // }
    }));

    const classes = useStyles();

    return (
        <TextField
          placeholder={props.placeholder}
          fullWidth
          margin="normal"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          // InputProps={{
          //   classes: {
          //       input: classes.input
          //   }
          //   }}
          variant="outlined"
          onChange ={props.onChange}
          value = {props.value}
          type={props.type}
          error={props.error}
        />
    )

}