/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from 'react';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import useLocalStorage from 'react-use-localstorage';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import {
  TextField,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Grid,
} from '@material-ui/core';

//Store
import { store } from '../store.js';
//Hooks
import useWS from '../hooks/WS';
import useVideo from '../hooks/Video';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 500,
  },
  formControl: {
    minWidth: 120,
  },
}));

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  label: {
    color: '#ffffff',
  },
}))(Button);

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

export default function WelcomeDialog(props) {
  const { title, description } = props;
  const classes = useStyles();
  const [name, setName] = useLocalStorage('player_name', 'Player');
  const [server, setServer] = useLocalStorage('server_address', 0);
  const [emoji, setEmoji] = useLocalStorage(
    'emoji',
    JSON.stringify({
      id: 'sunglasses',
      name: 'Smiling Face with Sunglasses',
      native: '😎',
    })
  );
  const globalState = useContext(store);
  const { dispatch, state } = globalState;
  const [openEmoji, setOpenEmoji] = useState(false);
  const [connectBtn, setConnectBtn] = useState(false);

  const [getWS, setWS, sendWS] = useWS();
  const [setVideo, sendFrame] = useVideo();

  useEffect(() => {
    console.log('WELCOME BOX');
    const e = JSON.parse(emoji);
    if (name === 'Player') {
      const _name = `Player ${getRandomInt(111, 999)}`;
      setName(_name);
      dispatch({
        type: 'set-name',
        value: _name,
      });
    } else {
      dispatch({
        type: 'set-name',
        value: name,
      });
    }
    if (server !== '0') {
      dispatch({
        type: 'set-server',
        value: server,
      });
    }
    if (e.id !== 'sunglasses') {
      dispatch({
        type: 'set-emoji',
        value: e,
      });
    }
    return () => {
      //subscription.unsubscribe();
    };
  }, []);

  const connectWS = () => {
    console.log('Connecting To WS');
    console.log(`${state?.server}?password=${state?.password}`);
    setConnectBtn(true);
    setVideo();
    setWS(`${state?.server}?password=${state?.password}`);
    getWS().addEventListener('open', (e) => {
      console.log('OPEN');
      sendWS({
        name: state?.name,
        emoji: state?.emoji?.native,
        msg: 'Online',
      });
      dispatch({
        type: 'set-status',
        value: true,
      });
      setConnectBtn(false);
      //refWS.current.send(JSON.stringify({ action: 'command', data: 'command' }));
      //setSnackbar(true);
      //setSnackbarMsg('Socket Connected');
    });
    getWS().addEventListener('message', (e) => {
      if (e.data instanceof Blob) {
        sendFrame(e.data);
      } else {
        const _data = JSON.parse(e.data);
        console.log('getWS message', _data);
        if (_data.name === 'bat') {
          dispatch({
            type: 'set-battery',
            value: _data.msg,
          });
        } else {
          dispatch({
            type: 'set-messageQueue',
            value: _data,
          });
        }
      }
    });
    getWS().addEventListener('error', (e) => {
      console.log('Socket Error');
      dispatch({
        type: 'set-status',
        value: false,
      });
      setConnectBtn(false);
      //setSnackbar(true);
      //setSnackbarMsg('Socket Error');
    });
    getWS().addEventListener('close', (e) => {
      console.log('Socket Closed');
      dispatch({
        type: 'set-status',
        value: false,
      });
      setConnectBtn(false);
      //setSnackbar(true);
      //setSnackbarMsg('Socket Closed');
    });
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Dialog
        open={openEmoji}
        onClose={() => setOpenEmoji(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Picker
          emoji={state?.emoji?.id}
          title="Hi!!!"
          emojiTooltip={false}
          onSelect={(e) => {
            console.log(e);

            dispatch({
              type: 'set-emoji',
              value: e,
            });
            setEmoji(JSON.stringify(e));
            setOpenEmoji(false);
          }}
        />
      </Dialog>
      <Dialog
        open={!state?.status}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <IconButton
                aria-label="emoji_icon"
                onClick={() => setOpenEmoji(true)}
              >
                {state?.emoji?.native}
              </IconButton>
              <TextField
                id="user-name"
                label="Name"
                value={state?.name}
                onChange={(e) => {
                  const _name = e.currentTarget.value;
                  console.log(_name);
                  setName(_name);
                  dispatch({
                    type: 'set-name',
                    value: _name,
                  });
                }}
              />
            </Grid>
            <Grid item xs={6}>
              {' '}
              <TextField
                id="server-name"
                label="Server"
                value={state?.server}
                disabled
                fullWidth
                onChange={(e) => {
                  const _server = e.currentTarget.value;
                  console.log(_server);
                  setName(_server);
                  dispatch({
                    type: 'set-server',
                    value: _server,
                  });
                }}
              />
            </Grid>
          </Grid>

          {/*
          <FormControl className={classes.formControl}>
            <InputLabel>Server</InputLabel>
            <Select
              labelId="server"
              id="server"
              autoWidth
              value={state?.server}
              onChange={(e) => {
                const _server = e.target.value;
                console.log(_server);
                dispatch({
                  type: 'set-server',
                  value: _server,
                });
                setServer(_server);
              }}
            >
              {state?.servers.map((e, i) => (
                <MenuItem key={i} value={i}>
                  {e.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
*/}
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="secondary"
            disabled={connectBtn}
            onClick={() => {
              connectWS();
            }}
          >
            Connect
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
