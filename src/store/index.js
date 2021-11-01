import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';

const persistConfig = {
  key: 'foodie',
  storage,
  whitelist: ['user'], // user 会存入缓存
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const configureStore = () =>
  createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(logger, thunk))
  );

export const configurePersistor = (store) => persistStore(store);
