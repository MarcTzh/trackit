import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 50,
    fontWeight: 600,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Cards(props) {
  const classes = useStyles();
  // const bull = <span className={classes.bullet}>•</span>;

  return (
    <div>
      <CardContent>
        <Typography className={classes.title} color="#fff" gutterBottom>
        {props.counter}
        </Typography>
        <Typography variant="h2" component="h2">
        {props.text2}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
        {props.text3}
        </Typography>
        <Typography variant="h5" component="h2">
        {props.text}
        </Typography>
      </CardContent>
        {/* <div>
          <CardActions>
            <Button size="large">Learn More</Button>
          </CardActions>
        </div> */}
    </div>
  );
}
