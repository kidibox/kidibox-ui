/* @flow */

// ------------------------------------
// Constants
// ------------------------------------

export const DISCARD_TOKEN = 'auth/DISCARD_TOKEN'
export const RECEIVE_TOKEN = 'auth/RECEIVE_TOKEN'

// ------------------------------------
// Actions
// ------------------------------------

export const discardToken = (): Action => {
  localStorage.removeItem('token')
  return { type: DISCARD_TOKEN }
}

export const receiveToken = (token: string): Action => {
  localStorage.setItem('token', token)
  return { type: RECEIVE_TOKEN, payload: { token } }
}

export const actions = {
  discardToken,
  receiveToken
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [DISCARD_TOKEN]: (state: Object) => ({
    ...state,
    isAuthenticated: false,
    token: null
  }),
  [RECEIVE_TOKEN]: (state: Object, { payload: { token } }) => ({
    ...state,
    isAuthenticated: true,
    token
  })
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  isFetching: false,
  isAuthenticated: !!localStorage.getItem('token'),
  token: localStorage.getItem('token')
}

export default function authReducer (state: Object = initialState, action: Action): Object {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
