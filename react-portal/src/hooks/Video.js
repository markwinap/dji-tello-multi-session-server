// Hook
import { useState, useRef, useContext } from 'react';
import JMuxer from 'jmuxer';
//Store
import { store } from '../store.js';
function useVideo() {
  const refJmuxer = useRef(null);
  const globalState = useContext(store);
  const { dispatch, state } = globalState;

  const setVideo = () => {
    refJmuxer.current = new JMuxer({
      node: 'player',
      mode: 'video',
      flushingTime: 0,
      //fps: 30,
      debug: false,
    });
  };
  const sendFrame = async (value) => {
    refJmuxer.current.feed({
      video: new Uint8Array(await new Response(value).arrayBuffer()),
      duration: 500,
    });
  };
  const destroyVideo = () => {
    refJmuxer.current.destroy();
  };
  return [setVideo, sendFrame, destroyVideo];
}

export default useVideo;
