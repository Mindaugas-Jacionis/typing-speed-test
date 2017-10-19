import * as types from './actionTypes';

export function signIn(data) {
  return {
    types: [types.FETCH, types.FETCH_SUCCESS, types.FETCH_FAILURE],
    api: (api) => api('/signin', Object.assign({}, data, { method: 'POST' }))
  }
}

export function fakeSignIn() {
  return {
    type: types.FAKE_LOGIN
  }
}
