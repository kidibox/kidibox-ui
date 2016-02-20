import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import CircularProgress from 'material-ui/lib/circular-progress'
import { Card, CardHeader } from 'material-ui/lib/card'
import { List } from 'material-ui/lib/lists'
import Spacing from 'material-ui/lib/styles/spacing'
import { actions as torrentActions } from '../../redux/modules/torrent'
import TorrentFileItemView from './TorrentFileItemView'

const mapStateToProps = (state) => state.torrent

class TorrentView extends React.Component {
  static propTypes = {
    id: PropTypes.number,
    params: PropTypes.object,
    isLoading: PropTypes.bool,
    name: PropTypes.string,
    userName: PropTypes.string,
    files: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired
    })),
    invalidateTorrent: PropTypes.func.isRequired,
    fetchTorrent: PropTypes.func.isRequired
  };

  componentDidMount () {
    const { fetchTorrent, params } = this.props
    fetchTorrent(params.id)
  }

  componentWillUnmount () {
    this.props.invalidateTorrent()
  }

  render () {
    if (this.props.isLoading) {
      return (
        <CircularProgress style={{
          display: 'block',
          marginTop: Spacing.desktopGutterMore,
          marginLeft: 'auto',
          marginRight: 'auto'
        }} />
      )
    }

    const { id, name, userName, files } = this.props

    return (
      <Card initiallyExpanded style={{ margin: Spacing.desktopGutter }}>
        <CardHeader
          title={name}
          subtitle={'uploaded by ' + userName} />
        <List>
          {files.map((file, index) =>
            <TorrentFileItemView key={index} torrentId={id} fileIndex={index} fileName={file.name} />
          )}
        </List>
      </Card>
    )
  }
}

export default connect(mapStateToProps, torrentActions)(TorrentView)
