import { createAction, handleActions } from 'redux-actions'
import { get } from '../utils/api'

// ------------------------------------
// Constants
// ------------------------------------

export const REQUEST_TORRENTS = 'torrentList/REQUEST_TORRENTS'
export const RECEIVE_TORRENTS = 'torrentList/RECEIVE_TORRENTS'
export const RECEIVE_TORRENTS_FAILED = 'torrentList/RECEIVE_TORRENTS_FAILED'
export const SET_STATUS_FILTER = 'TORRENT_LIST_SET_STATUS_FILTER'
export const TOGGLE_SELECTION_MODE = 'TORRENT_LIST_TOGGLE_SELECTION_MODE'
export const TOGGLE_SORT_REVERSED = 'TORRENT_LIST_TOGGLE_SORT_REVERSED'

// ------------------------------------
// Actions
// ------------------------------------

export const requestTorrents = createAction(REQUEST_TORRENTS)
export const receiveTorrents = createAction(RECEIVE_TORRENTS)
export const receiveTorrentsFailed = createAction(RECEIVE_TORRENTS_FAILED)
export const setStatusFilter = createAction(SET_STATUS_FILTER)
export const toggleSelectionMode = createAction(TOGGLE_SELECTION_MODE)
export const toggleSortReversed = createAction(TOGGLE_SORT_REVERSED)

export const fetchTorrents = () => {
  return (dispatch, getState) => {
    dispatch(requestTorrents())
    get('/torrents')(dispatch, getState)
      .then(json => { dispatch(receiveTorrents(json.torrents)) })
      .catch(error => { dispatch(receiveTorrentsFailed(error)) })
  }
}

export const actions = {
  fetchTorrents,
  setStatusFilter,
  toggleSelectionMode,
  toggleSortReversed
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = { isLoading: true }

export default handleActions({
  [REQUEST_TORRENTS]: (state) => ({ ...state, isLoading: true }),
  [RECEIVE_TORRENTS]: (state, { payload }) => ({ ...state, items: payload, isLoading: false }),
  [RECEIVE_TORRENTS_FAILED]: (state, { payload }) => ({ ...state, isLoading: false }),
  [SET_STATUS_FILTER]: (state, { payload }) => ({ ...state, statusFilter: payload }),
  [TOGGLE_SELECTION_MODE]: state => ({ ...state, selectionMode: !state.selectionMode }),
  [TOGGLE_SORT_REVERSED]: state => ({ ...state, sortReversed: !state.sortReversed })
}, initialState)
