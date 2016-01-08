import React from 'react'
import {
  // Table,
  // TableBody// ,
  // TableRow,
  // TableRowColumn
} from 'material-ui'
import { connect } from 'react-redux'
import TorrentListToolbar from './TorrentListToolbar'
import { actions as torrentListActions } from '../redux/modules/torrentList'

const mapStateToProps = (state) => state.torrentList

export class TorrentListView extends React.Component {
  static propTypes = {
    activeFilter: React.PropTypes.string.isRequired,
    isLoading: React.PropTypes.bool.isRequired,
    torrents: React.PropTypes.array.isRequired,
    selectionMode: React.PropTypes.bool.isRequired,
    setFilter: React.PropTypes.func.isRequired,
    refreshTorrents: React.PropTypes.func.isRequired,
    toggleDisplayMode: React.PropTypes.func.isRequired
  };

  render () {
    console.log(this.props.torrents)
    return (
      <div>
        <TorrentListToolbar />
      </div>
    )
  }
}

export default connect(mapStateToProps, torrentListActions)(TorrentListView)
