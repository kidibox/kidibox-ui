import { combineReducers } from 'redux'
import { routeReducer as router } from 'redux-simple-router'
import counter from './modules/counter'
import torrentList from './modules/torrentList'

export default combineReducers({
  counter,
  torrentList,
  router
})
