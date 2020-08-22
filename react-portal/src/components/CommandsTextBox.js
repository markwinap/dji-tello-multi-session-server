import React, { useContext, useState, useEffect, useRef } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { green } from '@material-ui/core/colors';
import { TextField, Paper, Grid, Button } from '@material-ui/core';
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

const commandList = [
  {
    name: 'takeoff',
  },
  {
    name: 'land',
  },
  {
    name: 'emergency',
  },
  {
    name: 'up ',
  },
  {
    name: 'down ',
  },
  {
    name: 'left ',
  },
  {
    name: 'right ',
  },
  {
    name: 'forward ',
  },
  {
    name: 'back ',
  },
  {
    name: 'flip l',
  },
  {
    name: 'flip r',
  },
  {
    name: 'flip f',
  },
  {
    name: 'flip b',
  },
  {
    name: 'cw ',
  },
  {
    name: 'go ',
  },
  {
    name: '#',
  },
];

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

export default function CommandsTextBox(props) {
  const { title, status, titleSize, messages, userId } = props;
  const [textBox, setTextBox] = useState('');
  const [autoComplete, setAutoComplete] = useState({
    name: '',
  });
  const refWS = useRef(null);
  const classes = useStyles();
  const globalState = useContext(store);
  const { dispatch, state } = globalState;
  const [getWS, setWS, sendWS] = useWS();

  useEffect(() => {
    console.log('&&&&&&&&&&&&&&');
    console.log(refWS);
    return () => {
      //subscription.unsubscribe();
    };
  }, [refWS]);

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
              onClick={() => {
                setWS();
                sendWS({
                  name: state?.name,
                  emoji: state?.emoji?.native,
                  msg: textBox,
                });
                setTextBox('');
                setAutoComplete({
                  name: '',
                });
              }}
              //className={classes.buttonSend}
              endIcon={<Send />}
            >
              Send
            </ColorButton>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}
