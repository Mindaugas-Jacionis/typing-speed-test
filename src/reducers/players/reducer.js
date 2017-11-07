import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  allPlayers: [],
  errorMessage: null,
  isFetching: false
});

export default function signIn(state = initialState, action = {}) {
  const { type } = action;

  switch (type) {
    case types.FETCH_ALL:
      return Object.assign({}, state, {
        allPlayers: action.players || [],
        errorMessage: action.err || null,
        isFetching: false
      });
    case types.FETCHING:
      return Object.assign({}, state, {
        isFetching: true
      });
    default:
      return state;
  }
}
