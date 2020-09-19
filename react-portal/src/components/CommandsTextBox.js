import React, { useContext, useState, useRef } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { green, red } from '@material-ui/core/colors';
import { TextField, Paper, Grid, Button } from '@material-ui/core';
import { Send } from '@material-ui/icons';
//Store
import { store } from '../store.js';
//Hooks
import useWS from '../hooks/WS';
import useTimer from '../hooks/Timer';
//Custom Components
import SnackNotificaiton from './snackNotificaiton';
//Custom Components
import { commandList, commands, commandsIgnore } from './CMDList';

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
  buttonProgress: {
    color: red[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
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

function validateInput(txt) {
  let res = false;
  const arr = txt.trim().split(' ');
  if (commandsIgnore.includes(arr[0])) {
    return txt;
  }
  const cmd = commands.find((e) => e.cmd === arr[0]);
  if (cmd) {
    arr.shift();
    if (cmd.hasOwnProperty('range')) {
      for (let i of arr) {
        if (cmd.range.includes(i)) {
          return `${cmd.cmd} ${i}`;
          break;
        }
      }
    }
    for (let i of arr) {
      const n = parseInt(i, 10);
      if (n) {
        res = n;
        if (n > cmd.min && n < cmd.max) {
          return `${cmd.cmd} ${n}`;
          break;
        }
      }
    }
  }
  return res;
}

export default function CommandsTextBox(props) {
  const [textBox, setTextBox] = useState('');
  const [snack, setSnack] = useState(false);
  const [snakMessage, setSnakMessage] = useState('');
  const [autoComplete, setAutoComplete] = useState({
    name: '',
  });
  const refWS = useRef(null);
  const classes = useStyles();
  const globalState = useContext(store);
  const { dispatch, state } = globalState;
  const [getWS, setWS, sendWS] = useWS();
  const [setTimer] = useTimer();

  return (
    <React.Fragment>
      <CssBaseline />

      <div className={classes.textInput}>
        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={9}>
            <Paper>
              <Autocomplete
                id="combo-box-demo"
                options={commandList}
                getOptionLabel={(option) => option.name}
                //style={{ width: 300 }}
                value={autoComplete}
                onChange={(event, newValue) => {
                  if (newValue?.name) {
                    setTextBox(newValue.name);
                    setAutoComplete(newValue);
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    variant="outlined"
                    value={textBox}
                    onChange={(e) => setTextBox(e.currentTarget.value)}
                    placeholder="Type Your Command Input"
                  />
                )}
              />
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <ColorButton
              fullWidth
              variant="contained"
              color="primary"
              disabled={!(state?.progress === 100)}
              onClick={() => {
                if (textBox !== '') {
                  const cleanCmd = validateInput(textBox);
                  if (cleanCmd) {
                    setTimer(process.env.REACT_APP_TEXT_TIMEOUT);
                    setWS();
                    sendWS({
                      name: state?.name,
                      emoji: state?.emoji?.native,
                      msg: textBox,
                    });
                  } else {
                    console.log('Invalid Input');
                    setSnakMessage('Invalid Input');
                    setSnack(true);
                  }

                  setTextBox('');
                  setAutoComplete({
                    name: '',
                  });
                } else {
                  setSnakMessage('Empty Input');
                  setSnack(true);
                }
              }}
              //className={classes.buttonSend}
              endIcon={<Send />}
            >
              Send
            </ColorButton>
          </Grid>
        </Grid>
        <SnackNotificaiton
          snack={snack}
          setSnack={setSnack}
          snakMessage={snakMessage}
        />
      </div>
    </React.Fragment>
  );
}
