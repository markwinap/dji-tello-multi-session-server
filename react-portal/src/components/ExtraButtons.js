import React, { useContext, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
import { Sync } from '@material-ui/icons';

import { orange } from '@material-ui/core/colors';

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
            <Button
              variant="outlined"
              fullWidth
              color="secondary"
              onClick={() => window.location.reload()}
              startIcon={<Sync />}
            >
              Refresh
            </Button>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}
