// store.js
import React, { createContext, useReducer } from 'react';

const initialState = {
  progress: 100,
  ws: null,
  welcomeDialog: true, //true
  status: false, //false
  strings: {},
  password: '',
  name: `Player`,
  server: 'wss://',
  servers: [],
  emoji: {
    id: 'sunglasses',
    name: 'Smiling Face with Sunglasses',
    native: '😎',
  },
  battery: -1,
  messageQueue: [],
};

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'set-password':
        return { ...state, ...{ password: action.value } };
      case 'set-strings':
        return { ...state, ...{ strings: action.value } };
      case 'set-servers':
        return { ...state, ...{ servers: action.value } };
      case 'set-progress':
        return { ...state, ...{ progress: action.value } };
      case 'set-ws':
        return { ...state, ...{ ws: action.value } };
      case 'set-status':
        return { ...state, ...{ status: action.value } };
      case 'set-battery':
        return { ...state, ...{ battery: action.value } };
      case 'set-messageQueue':
        let messageQueue = [...state.messageQueue];
        messageQueue.push(action.value);
        return { ...state, ...{ messageQueue } };
      case 'set-emoji':
        return { ...state, ...{ emoji: action.value } };
      case 'set-server':
        return { ...state, ...{ server: action.value } };
      case 'set-name':
        return { ...state, ...{ name: action.value } };
      case 'set-welcome-dialog':
        return { ...state, ...{ welcomeDialog: action.value } };
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
