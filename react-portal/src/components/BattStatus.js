import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Box, Typography, Icon } from '@material-ui/core';
import {
  AccessAlarm,
  BatteryUnknown,
  BatteryAlert,
  Battery20,
  Battery30,
  Battery50,
  Battery60,
  Battery80,
  Battery90,
  BatteryFull,
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  col: {
    height: '100%',
    backgroundColor: '#272c34;',
  },
  box: {
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
  },
  title: {
    color: 'white',
  },
  titleIcon: {
    color: 'white',
    fontSize: 30,
  },
}));

export default function SimpleContainer(props) {
  const { level, status } = props;
  const classes = useStyles();
  const Batterylevel = ({ level }) => {
    switch (true) {
      case level > 95:
        return <BatteryFull className={classes.titleIcon} />;
      case level > 89:
        return <Battery90 className={classes.titleIcon} />;
      case level > 79:
        return <Battery80 className={classes.titleIcon} />;
      case level > 59:
        return <Battery60 className={classes.titleIcon} />;
      case level > 49:
        return <Battery50 className={classes.titleIcon} />;
      case level > 29:
        return <Battery30 className={classes.titleIcon} />;
      case level > 19:
        return <Battery20 className={classes.titleIcon} />;
      case level > 0:
        return <BatteryAlert className={classes.titleIcon} />;
      default:
        return <BatteryUnknown className={classes.titleIcon} />;
    }
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={0}
      >
        <Grid item xs={4}>
          <Typography className={classes.title} variant="h4" gutterBottom>
            {status}
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Batterylevel level={level} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
