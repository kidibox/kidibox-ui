import React from 'react'
import { List, Styles } from 'material-ui'
import { connect } from 'react-redux'
import TorrentListToolbar from './TorrentListToolbar'
import TorrentListItemView from './TorrentListItemView'
import { actions as torrentListActions } from '../../redux/modules/torrentList'
import { List as ImmutableList } from 'immutable'

const { Spacing } = Styles

const mapStateToProps = (state) => ({
  items: state.torrentList.get('items'),
  searchText: state.torrentList.get('searchText'),
  statusFilter: state.torrentList.get('statusFilter'),
  sortBy: state.torrentList.get('sortBy'),
  sortReversed: state.torrentList.get('sortReversed')
})

export class TorrentListView extends React.Component {
  static propTypes = {
    items: React.PropTypes.instanceOf(ImmutableList).isRequired,
    searchText: React.PropTypes.string,
    statusFilter: React.PropTypes.string,
    sortBy: React.PropTypes.string,
    sortReversed: React.PropTypes.bool
  };

  render () {
    let torrents = this.props.items
      .filter(torrent => !this.props.statusFilter || this.props.statusFilter === torrent.get('state'))
      .sortBy(torrent => torrent.get(this.props.sortBy || 'name'))

    if (this.props.sortReversed) {
      torrents = torrents.reverse()
    }

    return (
      <div>
        <TorrentListToolbar />
        <List style={{ margin: Spacing.desktopGutter }}>
          {torrents.map(torrent =>
            <TorrentListItemView key={torrent.get('id')} torrent={torrent} />
          )}
        </List>
      </div>
    )
  }
}

export default connect(mapStateToProps, torrentListActions)(TorrentListView)
