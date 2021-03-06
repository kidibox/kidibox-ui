/* @flow */

import { get, post } from '../utils/api'

// ------------------------------------
// Constants
// ------------------------------------

export const INVALIDATE_TORRENT = 'torrent/INVALIDATE_TORRENT'
export const REQUEST_TORRENT = 'torrent/REQUEST_TORRENT'
export const RECEIVE_TORRENT = 'torrent/RECEIVE_TORRENT'

// ------------------------------------
// Actions
// ------------------------------------

export const invalidateTorrent = (): Action => ({ type: INVALIDATE_TORRENT })
export const requestTorrent = (): Action => ({ type: REQUEST_TORRENT })
export function receiveTorrent (payload: Object, error: Object|boolean = false): Action {
  return { type: RECEIVE_TORRENT, payload, error }
}

export const fetchTorrent = (torrentId: number): Function => {
  return (dispatch, getState) => {
    dispatch(requestTorrent())
    get('/torrents/' + torrentId)(dispatch, getState)
      .then((json) => { dispatch(receiveTorrent(json)) })
      .catch((error) => { dispatch(receiveTorrent(error, true)) })
  }
}

export const getDownloadToken = (torrentId: number, path: string): Function => {
  return get(`/torrents/${torrentId}/token?path=${encodeURIComponent(path)}`)
}

export const addNewMagnet = (payload: Object): Function => post('/torrents/link', payload)
export const addNewTorrent = (payload: FormData): Function => post('/torrents/file', payload)

export const actions = {
  invalidateTorrent,
  fetchTorrent,
  getDownloadToken
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [INVALIDATE_TORRENT]: (state) => initialState,
  [REQUEST_TORRENT]: (state) => ({ ...state, isLoading: true }),
  [RECEIVE_TORRENT]: (state, { payload, error }) => (error ? { ...state, isLoading: false } : payload)
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  isLoading: true
}

export default function torrentReducer (state: Object = initialState, action: Action): Object {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
