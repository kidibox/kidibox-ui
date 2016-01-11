import { List, Map } from 'immutable'

import { createAction, handleActions } from 'redux-actions'

// ------------------------------------
// Constants
// ------------------------------------
export const TORRENT_LIST_SET_STATUS_FILTER = 'TORRENT_LIST_SET_STATUS_FILTER'
export const TORRENT_LIST_TOGGLE_SELECTION_MODE = 'TORRENT_LIST_TOGGLE_SELECTION_MODE'
export const TORRENT_LIST_TOGGLE_SORT_REVERSED = 'TORRENT_LIST_TOGGLE_SORT_REVERSED'

// ------------------------------------
// Actions
// ------------------------------------
export const setStatusFilter = createAction(TORRENT_LIST_SET_STATUS_FILTER)
export const toggleSelectionMode = createAction(TORRENT_LIST_TOGGLE_SELECTION_MODE)
export const toggleSortReversed = createAction(TORRENT_LIST_TOGGLE_SORT_REVERSED)

export const actions = {
  setStatusFilter,
  toggleSelectionMode,
  toggleSortReversed
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = Map({
  items: List.of(
    Map({ id: 1, name: 'Foo', userName: 'baz', progress: 30, state: 'running' }),
    Map({ id: 2, name: 'Bar', userName: 'baz', progress: 80, state: 'stopped' })
  )
})

export default handleActions({
  [TORRENT_LIST_SET_STATUS_FILTER]: (state, { payload }) => state.set('statusFilter', payload),
  [TORRENT_LIST_TOGGLE_SELECTION_MODE]: state => state.updateIn(['selectionMode'], value => !value),
  [TORRENT_LIST_TOGGLE_SORT_REVERSED]: state => state.updateIn(['sortReversed'], value => !value)
}, initialState)
