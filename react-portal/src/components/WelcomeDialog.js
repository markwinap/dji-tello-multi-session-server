import React, { useContext, useState, useEffect, useRef } from 'react';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import useLocalStorage from 'react-use-localstorage';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import {
  TextField,
  Paper,
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from '@material-ui/core';
import { Send } from '@material-ui/icons';

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
  const { title, description, status, titleSize, messages, userId } = props;
  const classes = useStyles();
  const [name, setName] = useLocalStorage('player_name', 'Player');
  const [server, setServer] = useLocalStorage(
    'server_address',
    'ws://192.168.1.211:8080'
  );
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

  useEffect(() => {
    const e = JSON.parse(emoji);
    if (name == 'Player') {
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
    if (server !== 'https://') {
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
    setConnectBtn(true);
    setWS(state?.server);
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
      const _data = JSON.parse(e.data);
      console.log(_data);
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
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
          <IconButton
            aria-label="emoji_icon"
            onClick={() => setOpenEmoji(true)}
          >
            {state?.emoji?.native}
          </IconButton>
          <TextField
            id="standard-basic"
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
          <TextField
            id="standard-basic"
            label="Server"
            value={state?.server}
            onChange={(e) => {
              const _server = e.currentTarget.value;
              console.log(_server);
              setServer(_server);
              dispatch({
                type: 'set-server',
                value: _server,
              });
            }}
          />
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
