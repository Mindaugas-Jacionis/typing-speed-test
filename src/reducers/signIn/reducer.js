import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  isFetching: false,
  errorMessage: false,
  loggedIn: false
});

export default function signIn(state = initialState, action = {}){
  const { type } = action;

  switch (type) {
    case types.FETCH:
      return Object.assign({}, state, {
        isFetching: true
      });
    case types.FETCH_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: false,
        loggedIn: true
      });
    case types.FETCH_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: 'Something went wrong while logging'
      });

    case types.FAKE_LOGIN:
      return Object.assign({}, state, {
        loggedIn: true
      });

    default:
      return state;
  }
}
