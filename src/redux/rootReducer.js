import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { formReducer, modelReducer } from 'react-redux-form'
import auth from './modules/auth'
import modals from './modules/modals'
import torrent from './modules/torrent'
import torrentList from './modules/torrentList'

export default combineReducers({
  login: modelReducer('login', { username: '', password: '' }),
  loginForm: formReducer('login', { username: '', password: '' }),
  newMagnet: modelReducer('newMagnet', { link: '' }),
  newMagnetForm: formReducer('newMagnet', { link: '' }),
  newTorrent: modelReducer('newTorrent', { file: '' }),
  newTorrentForm: formReducer('newTorrent', { file: '' }),
  auth,
  modals,
  torrent,
  torrentList,
  router
})
