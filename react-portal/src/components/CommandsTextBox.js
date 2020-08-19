import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  Box,
  Typography,
  Icon,
  GridList,
  GridListTile,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  TextField,
  Paper,
  InputBase,
  IconButton,
  Grid,
  Button,
} from '@material-ui/core';
import {
  Send,
  Menu,
  Search,
  Directions,
  AccessAlarm,
  BatteryUnknown,
  BatteryAlert,
  Battery20,
  Battery30,
  Battery50,
  Battery60,
  Battery80,
  Battery90,
  BatteryFull,
  ChildCare,
} from '@material-ui/icons';

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
];

export default function CommandsTextBox(props) {
  const { title, status, titleSize, messages, userId } = props;
  const classes = useStyles();

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
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    variant="outlined"
                    placeholder="Type Your Command Input"
                  />
                )}
              />
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              //className={classes.buttonSend}
              endIcon={<Send />}
            >
              Send
            </Button>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}
