// Hook
import { useState, useRef, useContext } from 'react';
//Store
import { store } from '../store.js';
function useWS() {
  const refWS = useRef(null);
  const globalState = useContext(store);
  const { dispatch, state } = globalState;

  const getWS = () => {
    return refWS.current;
  };
  const setWS = (value) => {
    console.log('setWS');
    console.log('setWS', value);
    console.log('setWS', state?.ws);
    console.log('setWS', refWS.current);
    if (state?.ws) {
      refWS.current = state?.ws;
    } else {
      refWS.current = new WebSocket(value);
      dispatch({
        type: 'set-ws',
        value: refWS.current,
      });
    }
  };
  const sendWS = (value) => {
    refWS.current.send(JSON.stringify(value));
  };
  return [getWS, setWS, sendWS];
}

export default useWS;
