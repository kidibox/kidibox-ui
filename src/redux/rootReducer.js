import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import auth from './modules/auth'
import torrent from './modules/torrent'
import torrentList from './modules/torrentList'

export default combineReducers({
  auth,
  torrent,
  torrentList,
  router
})
