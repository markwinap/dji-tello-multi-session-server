import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Box, Typography, Icon } from '@material-ui/core';
import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
import { red } from '@material-ui/core/colors';

//Components
import BattStatus from '../components/BattStatus';

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
  container: {
    height: '100%',
  },
}));

export default function SimpleContainer() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <Box className={classes.box} height="100%" width="100%">
        <Grid className={classes.container} container spacing={2}>
          <Grid item xs={8}></Grid>
          <Grid className={classes.col} item xs={4}>
            <Grid
              className={classes.container}
              container
              direction="column"
              //justify="center"
              alignItems="stretch"
            >
              <Grid item>
                <BattStatus status="Connected" level={70} />
              </Grid>
              <Grid item>
                <BattStatus status="Connected" level={70} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}
