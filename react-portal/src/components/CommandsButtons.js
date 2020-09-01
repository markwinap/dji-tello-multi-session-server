import React, { useContext } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, ButtonGroup } from '@material-ui/core';
import { ErrorOutline } from '@material-ui/icons';
//Store
import { store } from '../store.js';
//Hooks
import useWS from '../hooks/WS';
import useTimer from '../hooks/Timer';

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
  buttonMargin: {
    marginBottom: 10,
  },
}));

export default function CommandsButtons(props) {
  const classes = useStyles();
  const globalState = useContext(store);
  const { dispatch, state } = globalState;
  const [getWS, setWS, sendWS] = useWS();
  const [setTimer] = useTimer();

  const send = (cmd) => {
    setTimer(process.env.REACT_APP_TEXT_TIMEOUT);
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
                  <Button
                    disabled={!(state?.progress === 100)}
                    onClick={() => send('takeoff')}
                  >
                    Launch
                  </Button>
                  <Button
                    disabled={!(state?.progress === 100)}
                    onClick={() => send('land')}
                  >
                    Land
                  </Button>
                </ButtonGroup>
              </Grid>
              <Grid item xs={6}>
                <ButtonGroup
                  fullWidth
                  size="medium"
                  color="default"
                  variant="contained"
                  className={classes.buttonMargin}
                >
                  <Button
                    disabled={!(state?.progress === 100)}
                    onClick={() => send('up 100')}
                  >
                    Up
                  </Button>
                  <Button
                    disabled={!(state?.progress === 100)}
                    onClick={() => send('cw 90')}
                  >
                    Rotate CW 90°
                  </Button>
                </ButtonGroup>
                <ButtonGroup
                  fullWidth
                  size="medium"
                  color="default"
                  variant="contained"
                >
                  <Button
                    disabled={!(state?.progress === 100)}
                    onClick={() => send('down 100')}
                  >
                    Down
                  </Button>
                  <Button
                    disabled={!(state?.progress === 100)}
                    onClick={() => send('ccw 90')}
                  >
                    Rotate CCW 90°
                  </Button>
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
              <Button
                disabled={!(state?.progress === 100)}
                onClick={() => send('forward 100')}
              >
                Fwd
              </Button>
              <Button
                disabled={!(state?.progress === 100)}
                onClick={() => send('back 100')}
              >
                Bwd
              </Button>
              <Button
                disabled={!(state?.progress === 100)}
                onClick={() => send('left 100')}
              >
                Left
              </Button>
              <Button
                disabled={!(state?.progress === 100)}
                onClick={() => send('right 100')}
              >
                Right
              </Button>
            </ButtonGroup>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              fullWidth
              color="secondary"
              onClick={() => send('emergency')}
              disabled={!(state?.progress === 100)}
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
