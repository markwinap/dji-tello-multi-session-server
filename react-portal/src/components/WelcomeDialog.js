import React, { useContext, useState, useEffect } from 'react';
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
  const [server, setServer] = useLocalStorage('server_address', 'https://');
  const globalState = useContext(store);
  const { dispatch, state } = globalState;
  const [openEmoji, setOpenEmoji] = useState(false);

  useEffect(() => {
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
    if (server != 'https://') {
      dispatch({
        type: 'set-server',
        value: server,
      });
    }
    return () => {
      //subscription.unsubscribe();
    };
  }, []);

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
            setOpenEmoji(false);
          }}
        />
      </Dialog>
      <Dialog
        open={state?.welcomeDialog}
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
            onClick={() => {
              dispatch({
                type: 'set-welcome-dialog',
                value: false,
              });
            }}
          >
            Connect
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
