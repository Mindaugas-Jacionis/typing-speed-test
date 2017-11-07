import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  isFetching: false,
  errorMessage: false,
  loggedIn: false
});

export default function signIn(state = initialState, action = {}) {
  const { type } = action;

  switch (type) {
    case types.SIGNIN:
      return Object.assign({}, state, {
        loggedIn: true
      });

    default:
      return state;
  }
};
