import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

import {
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  Paper,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  title: {
    color: 'white',
  },
  gridList: {
    width: '100%',
  },
  newRoot: {
    height: 350,
    //backgroundColor: '#e7e7e7',
    width: '100%',
  },
}));

export default function CommandsQueue(props) {
  const { title, status, titleSize, messages, userId } = props;
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Typography className={classes.title} variant={titleSize} gutterBottom>
        {title}
      </Typography>
      <ScrollToBottom className={classes.newRoot}>
        <List className={classes.gridList}>
          {messages.map((e, i) => (
            <>
              <ListItem
                key={`l_item_${i}`}
                selected={e.process}
                alignItems={e.id == 'flex-start'}
              >
                <ListItemAvatar>
                  <Avatar>{e.emoji ? e.emoji : '😀'}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={e.name} secondary={e.msg} />
              </ListItem>
              <Divider />
            </>
          ))}
        </List>
      </ScrollToBottom>
    </React.Fragment>
  );
}
