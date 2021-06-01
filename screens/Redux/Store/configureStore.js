import {createStore, combineReducers, applyMiddleware} from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import rootReducer from '../Reducer/'
// import thunk from 'redux-thunk';
// import logger from 'redux-logger';
const persistConfig = {
  // configuration object for redux-persist
  key: 'root',
  storage: AsyncStorage, // define which storage to use
  // whitelist: ['user'],
};
 // create a persisted reducer
const configureStore = persistReducer(persistConfig, rootReducer); 
const store = createStore(configureStore);

const persistor = persistStore(store);

export {store, persistor};
