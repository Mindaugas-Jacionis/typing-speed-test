import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  allPlayers: [],
  errorMessage: null,
  isFetching: false,
  currentPlayer: null,
  loggedIn: false
});

export default function players(state = initialState, action = {}) {
  const { type, data, id, err, players } = action;

  switch (type) {
    case types.FETCH_ALL:
      return Object.assign({}, state, {
        allPlayers: players || [],
        errorMessage: err || null,
        isFetching: false
      });
    case types.FETCHING:
      return Object.assign({}, state, {
        isFetching: true
      });
    case types.NEW_PLAYER:
      return Object.assign({}, state, {
        currentPlayer: data.id,
        allPlayers: state.allPlayers.concat([data]),
        loggedIn: true
      });
    case types.UPDATE:
      const updateIndex = state.allPlayers.findIndex(val => val.id === id);
      let newAllPlayers = state.allPlayers;
      newAllPlayers[updateIndex] = Object.assign(newAllPlayers[updateIndex], data);

      return Object.assign({}, state, {
        allPlayers: newAllPlayers
      });
    default:
      return state;
  }
}
