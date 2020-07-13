import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

export default function GeneralButton(props) {
    const useStyles = makeStyles((theme) => ({
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            marginBottom: theme.spacing(1),
            backgroundColor: "#2e84f8"
        },
    }));
    const classes = useStyles();

    return (
        <Button variant="contained" 
                margin ="big" 
                onClick= {props.handleSubmit}
                fullWidth={props.fullWidth} 
                className={classes.textField}>
            {props.text}
        </Button>
    );
}