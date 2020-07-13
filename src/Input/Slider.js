import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    width: 700,
  },
  margin: {
    height: theme.spacing(3),
  },
}));

const theme1 = createMuiTheme({
  slider: {
    trackColor: "yellow",
    selectionColor: "green"
  }
})

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
        Choose how often to recieve email notifications if there are price alerts
      </Typography>
      <ThemeProvider theme={theme1}>
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
      </ThemeProvider>
    </div>
  );
}