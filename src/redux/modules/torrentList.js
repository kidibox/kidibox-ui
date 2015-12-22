import { createAction, handleActions } from 'redux-actions'

// ------------------------------------
// Constants
// ------------------------------------
export const TORRENT_LIST_SET_FILTER = 'TORRENT_LIST_SET_FILTER'
export const TORRENT_LIST_TOGGLE_DISPLAY_MODE = 'TORRENT_LIST_TOGGLE_DISPLAY_MODE'
export const TORRENT_LIST_REFRESH = 'TORRENT_LIST_REFRESH'
export const TORRENT_LIST_REFRESH_SUCCEED = 'TORRENT_LIST_REFRESH_SUCCEED'

// ------------------------------------
// Actions
// ------------------------------------
export const setFilter = createAction(TORRENT_LIST_SET_FILTER)
export const toggleDisplayMode = createAction(TORRENT_LIST_TOGGLE_DISPLAY_MODE)
export const refresh = createAction(TORRENT_LIST_REFRESH)
export const refreshSucceed = createAction(TORRENT_LIST_REFRESH_SUCCEED)

// This is a thunk, meaning it is a function that immediately
// returns a function for lazy evaluation. It is incredibly useful for
// creating async actions, especially when combined with redux-thunk!
// NOTE: This is solely for demonstration purposes. In a real application,
// you'd probably want to dispatch an action of COUNTER_DOUBLE and let the
// reducer take care of this logic.
export const refreshTorrents = () => {
  return (dispatch, getState) => {
    dispatch(refresh())
    setTimeout(() => {
      dispatch(refreshSucceed([
        { id: 1, name: 'foo' },
        { id: 2, name: 'bar' }
      ]))
    }, 1000)
  }
}

export const actions = {
  setFilter,
  toggleDisplayMode,
  refreshTorrents
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  activeFilter: '0',
  isLoading: true,
  selectionMode: false,
  torrents: []
}

export default handleActions({
  [TORRENT_LIST_SET_FILTER]: (state, { payload }) => ({ ...state, activeFilter: payload }),
  [TORRENT_LIST_TOGGLE_DISPLAY_MODE]: (state) => ({ ...state, selectionMode: !state.selectionMode }),
  [TORRENT_LIST_REFRESH]: (state, { payload }) => ({ ...state, isLoading: true }),
  [TORRENT_LIST_REFRESH_SUCCEED]: (state, { payload }) => ({ ...state, isLoading: false, torrents: payload })
}, initialState)
