import React, { useContext, useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Box, Typography, Icon } from '@material-ui/core';
import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
import { red } from '@material-ui/core/colors';

//Components
import BattStatus from '../components/BattStatus';
import CommandsQueue from '../components/CommandsQueue';
import CommandsTextBox from '../components/CommandsTextBox';
import CommandsButtons from '../components/CommandsButtons';
//Store
//Store
import { store } from '../store.js';

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
  const globalState = useContext(store);
  const { dispatch, state } = globalState;
  return (
    <React.Fragment>
      <CssBaseline />
      <Box className={classes.box} height="100%" width="100%">
        <Grid className={classes.container} container spacing={2}>
          <Grid item xs={8}></Grid>
          <Grid className={classes.col} item xs={4}>
            <Grid
              className={classes.container}
              direction="column"
              justify="space-between"
              alignItems="stretch"
            >
              <Grid item>
                <BattStatus
                  title={state.status}
                  titleSize="h4"
                  level={state.battery}
                />
              </Grid>
              <Grid item>
                <CommandsQueue
                  messages={state.messageQueue}
                  title="Messages"
                  titleSize="h5"
                  userId={0}
                />
              </Grid>
              <Grid item>
                <CommandsTextBox
                  messages={state.messageQueue}
                  title="Messages"
                  titleSize="h5"
                  userId={0}
                />
              </Grid>
              <Grid item>
                <CommandsButtons
                  messages={state.messageQueue}
                  title="Messages"
                  titleSize="h5"
                  userId={0}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}
