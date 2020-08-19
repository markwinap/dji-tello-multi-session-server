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
  ButtonGroup,
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

export default function CommandsButtons(props) {
  const { title, status, titleSize, messages, userId } = props;
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />

      <div className={classes.textInput}>
        <Grid
          container
          direction="column"
          justify="space-between"
          alignItems="stretch"
          spacing={2}
        >
          <Grid item>
            <Paper>sdsds</Paper>
          </Grid>
          <Grid item>
            <ButtonGroup
              fullWidth
              //size="large"
              color="primary"
              variant="contained"
            >
              <Button>Forward 100</Button>
              <Button>Backward 100</Button>
              <Button>Left 100</Button>
              <Button>Rigth 100</Button>
            </ButtonGroup>
          </Grid>
          <Grid item>
            <Button variant="contained" fullWidth color="secondary">
              Secondary
            </Button>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}
