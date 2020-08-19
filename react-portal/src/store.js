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
  welcomeDialog: true,
  name: `Player`,
  server: 'https://',
  emoji: {
    id: 'sunglasses',
    name: 'Smiling Face with Sunglasses',
    native: '😎',
  },
  status: 'Connected',
  battery: 70,
  messageQueue: [
    {
      name: 'Marco Martinez',
      id: 0,
      command: 'take off',
      process: true,
      emoji: '😀',
    },
    {
      name: 'Sergio Gonzales',
      id: 2,
      command: 'up 200',
      process: true,
      emoji: '😂',
    },
    {
      name: 'Marco Martinez',
      id: 0,
      command: 'land',
      process: false,
      emoji: '😡',
    },
    {
      name: 'Test Martinez',
      id: 3,
      command: 'take off',
      process: true,
      emoji: '🥶',
    },
    {
      name: 'Sergio Gonzales',
      id: 2,
      command: 'up 200',
      process: true,
      emoji: '🤩',
    },
    {
      name: 'Marco Martinez',
      id: 0,
      command: 'land',
      process: false,
      emoji: '🤩',
    },
    {
      name: 'Marco Martinez',
      id: 0,
      command: 'take off',
      process: true,
      emoji: '😸',
    },
    {
      name: 'Sergio Gonzales',
      id: 2,
      command: 'up 200',
      process: true,
      emoji: '👩🏻‍🦰',
    },
    {
      name: 'Marco Martinez',
      id: 0,
      command: 'land',
      process: false,
      emoji: '👩🏻‍🔬',
    },
  ],
};

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'set-status':
        return { ...state, ...{ status: action.value } };
      case 'set-battery':
        return { ...state, ...{ battery: action.value } };
      case 'set-messageQueue':
        return { ...state, ...{ messageQueue: action.value } };
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
