import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

export default function GeneralButton(props) {
    const useStyles = makeStyles((theme) => ({
        button: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            marginBottom: theme.spacing(1),
            backgroundColor: "#3f51b5",
            // backgroundColor: "#3f51b5",
            color: "white",
            '&:hover': {
                backgroundColor: '#32408f',
                color: '#FFF'
            }
        },
    }));
    const classes = useStyles();

    return (
        <Button variant="contained" 
                margin ="big" 
                onClick= {props.onClick}
                fullWidth={props.fullWidth} 
                className={classes.button}>
            {props.text}
        </Button>
    );
}