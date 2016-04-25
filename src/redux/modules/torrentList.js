/* @flow */

import { get, del } from '../utils/api'

// ------------------------------------
// Constants
// ------------------------------------

export const REQUEST_TORRENTS = 'torrentList/REQUEST_TORRENTS'
export const RECEIVE_TORRENTS = 'torrentList/RECEIVE_TORRENTS'
export const SET_STATUS_FILTER = 'TORRENT_LIST_SET_STATUS_FILTER'
export const TOGGLE_SELECTION_MODE = 'TORRENT_LIST_TOGGLE_SELECTION_MODE'
export const TOGGLE_SORT_REVERSED = 'TORRENT_LIST_TOGGLE_SORT_REVERSED'
export const REMOVE_TORRENT = 'torrentList/REMOVE_TORRENT'

// ------------------------------------
// Actions
// ------------------------------------

export const requestTorrents = (): Action => ({ type: REQUEST_TORRENTS })
export function receiveTorrents (payload: Object, error: Object|boolean = false): Action {
  return { type: RECEIVE_TORRENTS, payload, error }
}
export const setStatusFilter = (payload: Number): Action => ({ type: SET_STATUS_FILTER, payload })
export const toggleSelectionMode = (payload: Number): Action => ({ type: TOGGLE_SELECTION_MODE, payload })
export const toggleSortReversed = (): Action => ({ type: TOGGLE_SORT_REVERSED })

export const fetchTorrents = (): Function => {
  return (dispatch, getState) => {
    dispatch(requestTorrents())
    get('/torrents')(dispatch, getState)
      .then((json) => { dispatch(receiveTorrents(json.torrents)) })
      .catch((error) => { dispatch(receiveTorrents(error, true)) })
  }
}

export const removeTorrent = (torrentId: number): Function => {
  return (dispatch, getState) => {
    del('/torrents/' + torrentId)(dispatch, getState)
      .then(() => dispatch({type: REMOVE_TORRENT, torrentId}))
  }
}

export const actions = {
  fetchTorrents,
  setStatusFilter,
  toggleSelectionMode,
  toggleSortReversed,
  removeTorrent
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [REQUEST_TORRENTS]: (state: Object) => ({ ...state, isLoading: true }),
  [RECEIVE_TORRENTS]: (state: Object, { payload, error }) => {
    if (error) {
      return { ...state, isLoading: false }
    }

    return { ...state, items: payload, isLoading: false }
  },
  [SET_STATUS_FILTER]: (state: Object, { payload }) => ({ ...state, statusFilter: payload }),
  [TOGGLE_SELECTION_MODE]: (state: Object) => ({ ...state, selectionMode: !state.selectionMode }),
  [TOGGLE_SORT_REVERSED]: (state: Object) => ({ ...state, sortReversed: !state.sortReversed }),
  [REMOVE_TORRENT]: (state: Object, { torrentId }) => {
    return { ...state, items: state.items.filter((item) => item.id !== torrentId) }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = { isLoading: true }

export default function torrentListReducer (state: Object = initialState, action: Action): Object {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
