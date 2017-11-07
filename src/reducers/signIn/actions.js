import * as types from './actionTypes';
import { Fire } from '../../utils';

export function signIn(data) {
  Fire.database().ref('players').push(data);

  return {
    type: types.SIGNIN
  }
}
