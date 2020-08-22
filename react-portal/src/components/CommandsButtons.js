import React, { useContext, useState, useEffect, useRef } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, ButtonGroup } from '@material-ui/core';
import { ErrorOutline } from '@material-ui/icons';
//Store
import { store } from '../store.js';
//Hooks
import useWS from '../hooks/WS';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 500,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  textInput: {
    marginTop: 10,
  },
  buttonSend: {
    marginLeft: 20,
  },
}));

export default function CommandsButtons(props) {
  const { title, status, titleSize, messages, userId } = props;
  const classes = useStyles();
  const globalState = useContext(store);
  const { dispatch, state } = globalState;
  const [getWS, setWS, sendWS] = useWS();

  const send = (cmd) => {
    setWS();
    sendWS({
      name: state?.name,
      emoji: state?.emoji?.native,
      msg: cmd,
    });
  };

  return (
    <React.Fragment>
      <CssBaseline />

      <div className={classes.textInput}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="stretch"
          spacing={2}
        >
          <Grid item xs={12}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="flex-end"
              spacing={2}
            >
              <Grid item xs={6}>
                <ButtonGroup
                  fullWidth
                  size="large"
                  color="default"
                  variant="contained"
                >
                  <Button onClick={() => send('takeoff')}>Takeoff</Button>
                  <Button onClick={() => send('land')}>Land</Button>
                </ButtonGroup>
              </Grid>
              <Grid item xs={6}>
                <ButtonGroup
                  fullWidth
                  size="large"
                  color="default"
                  variant="contained"
                >
                  <Button onClick={() => send('forward 100')}>
                    Rotate CCW
                  </Button>
                  <Button onClick={() => send('forward 100')}>Rotate CW</Button>
                </ButtonGroup>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <ButtonGroup
              fullWidth
              size="large"
              color="primary"
              variant="contained"
            >
              <Button onClick={() => send('forward 100')}>Fwd 100</Button>
              <Button onClick={() => send('back 100')}>Bwd 100</Button>
              <Button onClick={() => send('left 100')}>Left 100</Button>
              <Button onClick={() => send('right 100')}>Rigth 100</Button>
            </ButtonGroup>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              fullWidth
              color="secondary"
              onClick={() => send('emergency')}
              startIcon={<ErrorOutline />}
            >
              Emergency Stop
            </Button>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}
