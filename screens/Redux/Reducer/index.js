import { combineReducers } from 'redux';
import contact from './contactReducer';
import user from './userReducer';
import contactLengthCounter from './contactLengthReducer';

const rootReducer = combineReducers({user, contact, contactLengthCounter});

export default rootReducer
