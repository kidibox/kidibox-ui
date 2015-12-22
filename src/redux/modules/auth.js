import { createAction, handleActions } from 'redux-actions'
import { post } from '../utils/api'

// ------------------------------------
// Constants
// ------------------------------------

export const SIGNUP_REQUEST = 'auth/SIGNUP_REQUEST'
export const SIGNUP_SUCCESS = 'auth/SIGNUP_SUCCESS'
export const SIGNUP_FAILURE = 'auth/SIGNUP_FAILURE'

export const LOGIN_REQUEST = 'auth/LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'auth/LOGIN_FAILURE'

export const LOGOUT = 'auth/LOGOUT'

// ------------------------------------
// Actions
// ------------------------------------

const doLogout = createAction(LOGOUT)

export const requestSignup = createAction(SIGNUP_REQUEST)
export const receiveSignup = createAction(SIGNUP_SUCCESS)
export const invalidSignup = createAction(SIGNUP_FAILURE)

export const requestLogin = createAction(LOGIN_REQUEST)
export const receiveLogin = createAction(LOGIN_SUCCESS)
export const invalidLogin = createAction(LOGIN_FAILURE)

const _getToken = () => {
  return localStorage.getItem('token')
}

const _storeToken = (token) => {
  localStorage.token = token
}

const _removeToken = () => {
  localStorage.removeItem('token')
}

export const signup = (username, password) => {
  return (dispatch, getState) => {
    dispatch(requestSignup())
    post('/register', { username, password })
      .then((json) => dispatch(receiveSignup(json)))
      .catch((err) => dispatch(invalidSignup(err)))
  }
}

export const login = (username, password) => {
  return (dispatch, getState) => {
    dispatch(requestLogin())

    post('/authenticate', { username, password })(dispatch, getState)
      .then(({ token }) => {
        _storeToken(token)
        dispatch(receiveLogin({ token }))
      })
      .catch((err) => {
        dispatch(invalidLogin(err))
        // dispatch(notify.emit({
        //   type: 'danger',
        //   title: 'Invalid Credentials',
        //   message: err.msg
        // }))
      })
  }
}

export const logout = () => {
  return (dispatch, getState) => {
    _removeToken()
    dispatch(doLogout())
  }
}

export const actions = {
  signup,
  logout,
  login
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  isFetching: false,
  isAuthenticated: false,
  user: {},
  token: null
}

export default handleActions({
  [LOGOUT]: (state) => ({
    ...state,
    ...initialState
  }),
  [LOGIN_REQUEST]: (state) => ({
    ...state,
    isFetching: true,
    isAuthenticated: false
  }),
  [LOGIN_SUCCESS]: (state, { payload }) => ({
    ...state,
    isFetching: false,
    isAuthenticated: true,
    token: payload.token
  }),
  [LOGIN_FAILURE]: (state, { payload }) => ({
    ...state,
    isFetching: false,
    isAuthenticated: false,
    message: payload
  })
}, { ...initialState, token: _getToken(), isAuthenticated: !!_getToken() })
