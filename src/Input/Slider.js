import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
  },
  margin: {
    height: theme.spacing(3),
  },
}));

const marks = [
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
    value: 24,
    label: '24 Hours',
  },
];

function valuetext(value) {
  return `${value}`;
}

export default function DiscreteSlider() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography id="discrete-slider-custom" gutterBottom>
        Custom marks
      </Typography>
      <Slider
        defaultValue={24}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-custom"
        step={4}
        valueLabelDisplay="auto"
        marks={marks}
      />
    </div>
  );
}