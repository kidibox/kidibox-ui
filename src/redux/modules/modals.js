/* @flow */

// ------------------------------------
// Constants
// ------------------------------------

export const SHOW_NEW_TORRENT_MODAL = 'modals/SHOW_NEW_TORRENT_MODAL'
export const HIDE_NEW_TORRENT_MODAL = 'modals/HIDE_NEW_TORRENT_MODAL'

// ------------------------------------
// Actions
// ------------------------------------

export const showNewTorrentModal = (): Action => ({ type: SHOW_NEW_TORRENT_MODAL })
export const hideNewTorrentModal = (): Action => ({ type: HIDE_NEW_TORRENT_MODAL })

export const actions = {
  showNewTorrentModal,
  hideNewTorrentModal
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [SHOW_NEW_TORRENT_MODAL]: (state) => ({ ...state, newTorrentModalOpen: true }),
  [HIDE_NEW_TORRENT_MODAL]: (state) => ({ ...state, newTorrentModalOpen: false })
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  newTorrentModalOpen: false
}

export default function torrentReducer (state: Object = initialState, action: Action): Object {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
