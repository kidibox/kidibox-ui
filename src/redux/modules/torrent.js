import { createAction, handleActions } from 'redux-actions'
import { get } from '../utils/api'

// ------------------------------------
// Constants
// ------------------------------------

export const INVALIDATE_TORRENT = 'torrent/INVALIDATE_TORRENT'
export const REQUEST_TORRENT = 'torrent/REQUEST_TORRENT'
export const RECEIVE_TORRENT = 'torrent/RECEIVE_TORRENT'
export const RECEIVE_TORRENT_FAILED = 'torrent/RECEIVE_TORRENT_FAILED'

// ------------------------------------
// Actions
// ------------------------------------

export const invalidateTorrent = createAction(INVALIDATE_TORRENT)
export const requestTorrent = createAction(REQUEST_TORRENT)
export const receiveTorrent = createAction(RECEIVE_TORRENT)
export const receiveTorrentsFailed = createAction(RECEIVE_TORRENT_FAILED)

export const fetchTorrent = (torrentId) => {
  return (dispatch, getState) => {
    dispatch(requestTorrent())
    get('/torrents/' + torrentId)(dispatch, getState)
      .then(json => { dispatch(receiveTorrent(json)) })
      .catch(error => { dispatch(receiveTorrentsFailed(error)) })
  }
}

export const getDownloadToken = (torrentId, fileIndex) => {
  return get('/torrents/' + torrentId + '/files/' + fileIndex + '/token')
}

export const actions = {
  invalidateTorrent,
  fetchTorrent,
  getDownloadToken
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  isLoading: true
}

export default handleActions({
  [INVALIDATE_TORRENT]: (state) => initialState,
  [REQUEST_TORRENT]: (state) => ({ ...state, isLoading: true }),
  [RECEIVE_TORRENT]: (state, { payload }) => payload,
  [RECEIVE_TORRENT_FAILED]: (state, { payload }) => ({ ...state, isLoading: false })
}, initialState)
