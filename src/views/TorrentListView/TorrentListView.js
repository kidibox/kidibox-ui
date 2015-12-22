import React, { PropTypes } from 'react'
import { CircularProgress, List, Styles } from 'material-ui'
import { connect } from 'react-redux'
import TorrentListToolbar from './TorrentListToolbar'
import TorrentListItemView from './TorrentListItemView'
import { actions as torrentListActions } from '../../redux/modules/torrentList'

const { Spacing } = Styles

function sort (sortBy, sortReversed, left, right) {
  const leftValue = left[sortBy]
  const rightValue = right[sortBy]

  if (leftValue < rightValue) {
    return sortReversed ? 1 : -1
  }

  if (leftValue > rightValue) {
    return sortReversed ? -1 : 1
  }

  return 0
}

const mapStateToProps = (state) => {
  const { items, statusFilter, sortBy, sortReversed, isLoading } = state.torrentList

  if (items) {
    let torrents = items
      .filter(torrent => !statusFilter || statusFilter === torrent.state)
      .sort(sort.bind(null, sortBy || 'name', sortReversed))

    return { torrents, isLoading }
  } else {
    return { torrents: [], isLoading }
  }
}

export class TorrentListView extends React.Component {
  static propTypes = {
    history: React.PropTypes.object,
    isLoading: React.PropTypes.bool,
    torrents: PropTypes.array,
    fetchTorrents: PropTypes.func.isRequired
  };

  componentDidMount () {
    const { fetchTorrents } = this.props
    fetchTorrents()
  }

  render () {
    const torrentList = (
      <List style={{ margin: Spacing.desktopGutter }}>
        {this.props.torrents.map(torrent =>
          <TorrentListItemView key={torrent.id} history={this.props.history} {...torrent} />
        )}
      </List>
    )

    const progressBar = (
      <CircularProgress style={{
        display: 'block',
        marginTop: Spacing.desktopGutterMore,
        marginLeft: 'auto',
        marginRight: 'auto'
      }} />
    )

    return (
      <div>
        <TorrentListToolbar />
        { this.props.isLoading ? progressBar : torrentList }
      </div>
    )
  }
}

export default connect(mapStateToProps, torrentListActions)(TorrentListView)
