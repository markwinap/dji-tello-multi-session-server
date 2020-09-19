import React from 'react';

import { Snackbar, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import MuiAlert from '@material-ui/lab/Alert';
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function SnackNotificaiton(props) {
  const { snakMessage, snack, setSnack } = props;
  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={snack}
        autoHideDuration={6000}
        onClose={() => setSnack(false)}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{snakMessage}</span>}
      >
        <Alert onClose={(e) => setSnack(false)} severity="error">
          {snakMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
export default SnackNotificaiton;
