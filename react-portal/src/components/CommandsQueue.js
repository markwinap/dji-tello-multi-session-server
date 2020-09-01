import React, { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  title: {
    color: 'white',
  },
  gridList: {
    width: '100%',
  },
  newRoot: {
    //height: 'calc(100% - 50px)',
    //backgroundColor: '#e7e7e7',
    width: '100%',
  },
}));

export default function CommandsQueue(props) {
  const { title, titleSize, messages } = props;
  const [renderBox, setRenderBox] = useState(false);
  const classes = useStyles();
  const matches1000 = useMediaQuery('(min-height:1000px)');
  const matches900 = useMediaQuery('(min-height:900px)');
  const matches800 = useMediaQuery('(min-height:800px)');
  const matches700 = useMediaQuery('(min-height:700px)');
  const matches600 = useMediaQuery('(min-height:600px)');

  console.log('#################');
  console.log(matches1000);
  console.log(matches900);
  console.log(matches800);
  console.log(matches700);
  console.log(matches600);

  useEffect(() => {
    return () => {
      //subscription.unsubscribe();
      setRenderBox(true);
    };
  }, []);
  return (
    <React.Fragment>
      <CssBaseline />
      <Typography
        className={classes.title}
        style={{
          height: matches800 ? 600 : 340,
        }}
        variant={titleSize}
        gutterBottom
      >
        {title}
      </Typography>
      {renderBox ? (
        <ScrollToBottom className={classes.newRoot}>
          <List className={classes.gridList}>
            {messages.map((e, i) => (
              <>
                <ListItem
                  key={`l_item_${i}`}
                  selected={e.process}
                  alignItems={e.id === 'flex-start'}
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
      ) : null}
    </React.Fragment>
  );
}
