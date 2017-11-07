import { combineReducers } from 'redux';
import signIn from './signIn/reducer';
import players from './players/reducer';


export default combineReducers({
  signIn,
  players
});
