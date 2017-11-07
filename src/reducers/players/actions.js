import * as types from './actionTypes';
import { Fire } from '../../utils';

async function fetchAllPlayers() {
  const playersRef = Fire.database().ref('players');
  let players = await playersRef.once('value').then(response => {
    return response.val();
  });

  players = Object.keys(players).map(
    (key, i) => Object.assign({}, players[key], {
      id: key
    })
  );

  return players;
}

export const fetchAll = () => {
  return async dispatch => {
    dispatch(fetching());

    try {
      const players = await fetchAllPlayers();
      dispatch(fetchAllSuccess(players));
    } catch (err) {
      dispatch(fetchAllFailure(err));
    }
  };
};

function fetching() {
  return {
    type: types.FETCHING,
  }
}

function fetchAllSuccess(players) {
  return {
    type: types.FETCH_ALL,
    players
  }
}

function fetchAllFailure(err) {
  return {
    type: types.FETCH_ALL,
    err
  }
}
