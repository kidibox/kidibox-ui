import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { createModelReducer, createFormReducer } from 'react-redux-form'
import auth from './modules/auth'
import torrent from './modules/torrent'
import torrentList from './modules/torrentList'

export default combineReducers({
  login: createModelReducer('login', { username: '', password: '' }),
  loginForm: createFormReducer('login'),
  auth,
  torrent,
  torrentList,
  router
})
