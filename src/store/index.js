import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
// import { configureStore as configure } from '@reduxjs/toolkit';

import rootReducer from '../reducers';
import api from '../api';

const persistConfig = {
  key: 'foodie',
  storage,
  whitelist: ['user'], // user 会存入缓存
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const configureStore = () =>
  createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api), logger))
  );

// 这段代码会在运行时报错，没空研究
// export const configureStore = () =>
//   configure({
//     reducer: persistedReducer,
//     enhancers: composeWithDevTools(applyMiddleware(logger, thunk)), // or applyMiddleware(thunk.withExtraArgument(api))
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware({
//         thunk: {
//           extraArgument: api,
//         },
//       }),
//   });

export const configurePersistor = (store) => persistStore(store);
