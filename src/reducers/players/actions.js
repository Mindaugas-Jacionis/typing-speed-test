import * as types from './actionTypes';
import { Fire } from '../../utils';

const playersRef = Fire.database().ref('players');

async function fetchAllPlayers() {
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

export function newPlayer(data) {
  const currentPlayer = Fire.database().ref('players').push(data);

  return {
    type: types.NEW_PLAYER,
    data: Object.assign({}, data, { id: currentPlayer.key })
  }
}

export function updatePlayer(data, id) {
  playersRef.child(id).update(data);

  return {
    type: types.UPDATE,
    id,
    data
  }
}
