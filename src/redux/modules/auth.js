import { post } from '../utils/api'

// ------------------------------------
// Constants
// ------------------------------------

export const SIGNUP_REQUEST = 'auth/SIGNUP_REQUEST'
export const SIGNUP_SUCCESS = 'auth/SIGNUP_SUCCESS'

export const LOGIN_REQUEST = 'auth/LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS'

export const LOGOUT = 'auth/LOGOUT'

// ------------------------------------
// Actions
// ------------------------------------

const doLogout = (): Action => ({ type: LOGOUT })

export const requestSignup = (): Action => ({ type: SIGNUP_REQUEST })
export const receiveSignup = (payload: Object, error: Boolean): Action => ({ type: SIGNUP_SUCCESS, payload, error })

export const requestLogin = (): Action => ({ type: LOGIN_REQUEST })
export const receiveLogin = (payload: Object, error: Boolean): Action => ({ type: LOGIN_SUCCESS, payload, error })

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
      .catch((err) => dispatch(receiveSignup(err)))
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
      .catch(() => {
        const errors = {
          username: 'This field is required',
          password: 'This field is required'
        }
        dispatch(receiveLogin(errors, true))
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
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [LOGOUT]: (state: Object) => ({
    ...state,
    isFetching: false,
    isAuthenticated: false,
    token: null
  }),
  [LOGIN_REQUEST]: (state: Object) => ({
    ...state,
    isFetching: true,
    isAuthenticated: false
  }),
  [LOGIN_SUCCESS]: (state: Object, { payload, error }) => ({
    ...state,
    isFetching: false,
    isAuthenticated: !error,
    token: error ? undefined : payload.token,
    errors: error ? payload : undefined
  })
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  isFetching: false,
  isAuthenticated: !!_getToken(),
  token: _getToken()
}

export default function authReducer (state: Object = initialState, action: Action): Object {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
