// store.js
import React, { createContext, useReducer } from 'react';

const initialState = {
  page: 'main',
  data: [],
  patientNotes: [],
  familyMembers: [],
  patient: {},
  family: {},
  selectedPatient: {},
  selectedPatientNote: {},
  filters: [
    {
      field: 1,
      condition: 1,
      value: '',
      and: false,
      or: false,
    },
  ],
  ws: null,
  welcomeDialog: true,
  name: `Player`,
  server: 'https://',
  emoji: {
    id: 'sunglasses',
    name: 'Smiling Face with Sunglasses',
    native: '😎',
  },
  status: 'Offile',
  battery: -1,
  messageQueue: [],
};

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
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
