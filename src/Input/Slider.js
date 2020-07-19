import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    // width: 700,
    margin: theme.spacing(3),
  },
  root2: {
    // width: 700,
    margin: theme.spacing(3),
  },
  margin: {
    height: theme.spacing(3),
  },
  title: {
    fontSize:34,
    color: "white",
    fontWeight:700,
  },
  subtitle: {
    fontSize:28,
    color: "white",
    fontWeight:500,
  },
  subtitle2: {
    fontSize:24,
    color: "white",
    fontWeight:200,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    // color: theme.palette.text.secondary,
    background: "#212029",
  },
}));


const marks = [
  {
    value: 0,
    label: 'Off',
  },
  {
    value: 4,
    label: '4 Hours',
  },
  {
    value: 8,
    label: '8 Hours',
  },
  {
    value: 12,
    label: '12 Hours',
  },
  {
    value: 16,
    label: '16 Hours',
  },
  {
    value: 20,
    label: '20 Hours',
  },
  {
    value: 24,
    label: '24 Hours',
  },

];

function valuetext(value) {
  return `${value}`;
}

export default function DiscreteSlider(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography id="discrete-slider-custom" gutterBottom>
        Notification frequency
      </Typography>
      <div className={classes.subtitle2}>Notification frequency</div>
        <Slider
          defaultValue={24}
          getAriaValueText={valuetext}
          aria-labelledby="discrete-slider-custom"
          step={4}
          min={0}
          max={24}
          onChange={props.editSliderValue}
          valueLabelDisplay="auto"
          marks={marks}
        />
    </div>
  );
}