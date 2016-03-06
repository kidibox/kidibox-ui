import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { Authenticated } from 'containers/Authenticated'
// option in webpack, which allows us to specify import paths as if
// they were from the root of the ~/src directory. This makes it
// very easy to navigate to files regardless of how deeply nested
// your current file is.
import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import TorrentView from 'views/TorrentView/TorrentView'
import TorrentListView from 'views/TorrentListView/TorrentListView'

export default (store) => (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={Authenticated(TorrentListView)} />
    <Route path='/torrents/:id' component={Authenticated(TorrentView)} />
  </Route>
)
