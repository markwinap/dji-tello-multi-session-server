import React, { useContext, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Grid,
  Button,
  ButtonGroup,
  IconButton,
  Switch,
  FormControlLabel,
  FormGroup,
} from '@material-ui/core';
import {
  ErrorOutline,
  KeyboardArrowUp,
  KeyboardArrowRight,
  KeyboardArrowDown,
  KeyboardArrowLeft,
  RotateLeft,
  RotateRight,
} from '@material-ui/icons';

import { orange } from '@material-ui/core/colors';

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
  toggle: {
    textAlign: 'center',
    color: 'white',
    whiteSpace: 'nowrap',
  },
}));

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(orange[500]),
    backgroundColor: orange[500],
    '&:hover': {
      backgroundColor: orange[700],
    },
  },
}))(Button);

export default function CommandsButtons(props) {
  const classes = useStyles();
  const globalState = useContext(store);
  const [toggle, setToggle] = useState(false);
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
          justify="flex-start"
          alignItems="stretch"
          spacing={1}
        >
          <Grid item>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="flex-end"
              spacing={1}
            >
              <Grid item xs={4}>
                <ColorButton
                  fullWidth
                  size="large"
                  color="default"
                  variant="contained"
                  disabled={!(state?.progress === 100)}
                  onClick={() => send('takeoff')}
                >
                  Launch
                </ColorButton>
              </Grid>
              <Grid item xs={4} className={classes.toggle}>
                45
                <Switch
                  checked={toggle}
                  onChange={() => setToggle(!toggle)}
                  name="checkedA"
                />
                90
              </Grid>
              <Grid item xs={4}>
                <ColorButton
                  fullWidth
                  size="large"
                  color="default"
                  variant="contained"
                  disabled={!(state?.progress === 100)}
                  onClick={() => send('land')}
                >
                  Land
                </ColorButton>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="flex-end"
              spacing={1}
            >
              <Grid item xs={4}>
                <Button
                  fullWidth
                  size="large"
                  color="default"
                  variant="contained"
                  disabled={!(state?.progress === 100)}
                  onClick={() => send(`ccw ${toggle ? '90' : '45'}`)}
                  startIcon={<RotateLeft />}
                >
                  {toggle ? '90' : '45'}°
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  fullWidth
                  size="large"
                  color="primary"
                  variant="contained"
                  disabled={!(state?.progress === 100)}
                  onClick={() => send(`forward ${toggle ? '100' : '50'}`)}
                  startIcon={<KeyboardArrowUp />}
                ></Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  fullWidth
                  size="large"
                  color="default"
                  variant="contained"
                  disabled={!(state?.progress === 100)}
                  onClick={() => send(`cw ${toggle ? '90' : '45'}`)}
                  startIcon={<RotateRight />}
                >
                  {toggle ? '90' : '45'}°
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="flex-end"
              spacing={1}
            >
              <Grid item xs={4}>
                <Button
                  fullWidth
                  size="large"
                  color="primary"
                  variant="contained"
                  disabled={!(state?.progress === 100)}
                  onClick={() => send(`left ${toggle ? '100' : '50'}`)}
                  startIcon={<KeyboardArrowLeft />}
                ></Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  fullWidth
                  size="large"
                  color="primary"
                  variant="contained"
                  disabled={!(state?.progress === 100)}
                  onClick={() => send(`back ${toggle ? '100' : '50'}`)}
                  startIcon={<KeyboardArrowDown />}
                ></Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  fullWidth
                  size="large"
                  color="primary"
                  variant="contained"
                  disabled={!(state?.progress === 100)}
                  onClick={() => send(`right ${toggle ? '100' : '50'}`)}
                  startIcon={<KeyboardArrowRight />}
                ></Button>
              </Grid>
            </Grid>
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
