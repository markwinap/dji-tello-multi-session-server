import React, { useContext, useState, useEffect, useRef } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {
  Box,
  Typography,
  Icon,
  LinearProgress,
  Container,
} from '@material-ui/core';
import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
import { red } from '@material-ui/core/colors';

//Components
import BattStatus from '../components/BattStatus';
import CommandsQueue from '../components/CommandsQueue';
import CommandsTextBox from '../components/CommandsTextBox';
import CommandsButtons from '../components/CommandsButtons';
import WelcomeDialog from '../components/WelcomeDialog';

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
    //paddingTop: 5,
    paddingLeft: 10,
    //paddingRight: 10,
    //paddingBottom: 5,
    //width: '100%',
    //height: '100%',
  },
  container: {
    width: '100%',
    height: '100%',
    paddingLeft: 10,
  },
  video: {
    width: '100%',
    height: '100%',
  },
}));

export default function SimpleContainer() {
  const classes = useStyles();
  const globalState = useContext(store);
  const { dispatch, state } = globalState;

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const password = urlParams.get('password');
    const server = urlParams.get('server');
    dispatch({
      type: 'set-password',
      value: password,
    });
    dispatch({
      type: 'set-server',
      value: `wss://${server}`,
    });
    fetch('./config.json')
      .then((response) => response.json())
      .then((data) => {
        console.log('loaded config file');
        dispatch({
          type: 'set-servers',
          value: data.servers,
        });
        dispatch({
          type: 'set-strings',
          value: data.strings,
        });
      });

    return () => {
      //subscription.unsubscribe();
    };
  }, []);

  return (
    <>
      <CssBaseline />
      <WelcomeDialog
        title={`${
          state?.strings?.welcomeTitle
            ? state?.strings?.welcomeTitle
            : 'Welcome to Tello drone test app!'
        }`}
        description={`${
          state?.strings?.welcomeTitle
            ? state?.strings?.welcomeDescription
            : 'Change your name, emoji, and set the correct server!'
        }`}
      />

      <Grid
        className={classes.container}
        container
        direction="row"
        justify="center"
        alignItems="stretch"
        spacing={1}
      >
        <Grid item lg={9} md={9} xs={12}>
          <video
            className={classes.video}
            controls
            autoPlay
            id="player"
            //ref={refVideo}
          ></video>
        </Grid>
        <Grid item lg={3} md={3} xs={12}>
          <Grid item>
            <LinearProgress
              color="secondary"
              variant="determinate"
              value={state?.progress}
            />
            <Grid
              className={classes.container}
              direction="column"
              justify="space-between"
              alignItems="stretch"
            >
              {/*
              <Grid item>
                <BattStatus
                  title={state.status ? 'Online' : 'Offline'}
                  titleSize="h4"
                  level={state.battery}
                />
              </Grid>
  */}
            </Grid>

            <Grid item>
              <CommandsButtons />
            </Grid>

            <Grid item>
              <CommandsTextBox />
            </Grid>

            <Grid item>
              <Paper
                style={{
                  backgroundColor: '#f7f7f7',
                }}
              >
                <CommandsQueue
                  messages={state.messageQueue}
                  title=""
                  titleSize="h5"
                  userId={0}
                />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
