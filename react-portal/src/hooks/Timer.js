// Hook
import { useState, useRef, useContext } from 'react';
//Store
import { store } from '../store.js';
function useTimer() {
  const timmer = useRef(null);
  const globalState = useContext(store);
  const { dispatch, state } = globalState;

  let time = 0;
  let timer = null;

  const getPercentage = () => {};
  const setTimer = (t) => {
    time = t / 100;
    timer = setInterval(() => {
      dispatch({
        type: 'set-progress',
        value: Math.floor((time / 30) * 100),
      });
      if (time === 0) {
        clearInterval(timer);
        dispatch({
          type: 'set-progress',
          value: 100,
        });
      }
      time--;
    }, 100);
  };
  return [setTimer];
}

export default useTimer;
