import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import { configureStore, configurePersistor } from './store';
import Router from './router';

import './index.scss';

const store = configureStore();
const persistor = configurePersistor(store);

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Router />
    </PersistGate>
  </Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
);
