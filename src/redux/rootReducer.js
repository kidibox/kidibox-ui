import { combineReducers } from 'redux'
import { routeReducer as router } from 'redux-simple-router'
import auth from './modules/auth'
import counter from './modules/counter'
import torrent from './modules/torrent'
import torrentList from './modules/torrentList'

export default combineReducers({
  auth,
  counter,
  torrent,
  torrentList,
  router
})
