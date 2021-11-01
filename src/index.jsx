import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './store';
import Router from './router';

import './index.scss';

const store = configureStore();

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <Router />
  </Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
);
