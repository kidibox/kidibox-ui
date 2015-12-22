import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'
import { Authenticated } from 'containers/Authenticated'

// NOTE: here we're making use of the `resolve.root` configuration
// option in webpack, which allows us to specify import paths as if
// they were from the root of the ~/src directory. This makes it
// very easy to navigate to files regardless of how deeply nested
// your current file is.
import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import HomeView from 'views/HomeView/HomeView'
import TorrentView from 'views/TorrentView/TorrentView'
import TorrentListView from 'views/TorrentListView/TorrentListView'
import NotFoundView from 'views/NotFoundView/NotFoundView'

export default (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={HomeView} />
    <Route path='/torrents' component={Authenticated(TorrentListView)} />
    <Route path='/torrents/:id' component={Authenticated(TorrentView)} />
    <Route path='/404' component={NotFoundView} />
    <Redirect from='*' to='/404' />
  </Route>
)
