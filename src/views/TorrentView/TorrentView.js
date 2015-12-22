import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  Card,
  CardHeader,
  CircularProgress,
  FontIcon,
  IconButton,
  List,
  ListItem,
  Styles
} from 'material-ui'
import { actions as torrentActions } from '../../redux/modules/torrent'
import { API_BASE } from '../../redux/utils/api'

const { Spacing } = Styles

const mapStateToProps = (state) => state.torrent

class TorrentView extends React.Component {
  static propTypes = {
    id: PropTypes.number,
    params: PropTypes.object,
    isLoading: PropTypes.bool,
    name: PropTypes.string,
    userName: PropTypes.string,
    files: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.required,
      length: PropTypes.number.required
    })),
    invalidateTorrent: PropTypes.func.isRequired,
    fetchTorrent: PropTypes.func.isRequired,
    getDownloadToken: PropTypes.func.isRequired
  };

  componentDidMount () {
    const { fetchTorrent, params } = this.props
    fetchTorrent(params.id)
  }

  componentWillUnmount () {
    this.props.invalidateTorrent()
  }

  downloadFile (fileIndex) {
    const { id, getDownloadToken } = this.props
    getDownloadToken(id, fileIndex).then(({ token }) => {
      window.location.href = API_BASE + '/download/' + token
    })
  }

  copyLink (fileIndex) {
    const { id, getDownloadToken } = this.props
    getDownloadToken(id, fileIndex).then(({ token }) => {
      window.prompt('Copy to clipboard: Ctrl+C, Enter', API_BASE + '/download/' + token)
    })
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

    const { name, userName, files } = this.props

    return (
      <Card initiallyExpanded style={{ margin: Spacing.desktopGutter }}>
        <CardHeader
          title={name}
          subtitle={'uploaded by ' + userName} />
        <List>
          {files.map((file, index) =>
            <ListItem
              key={index}
              primaryText={file.name}
              leftIcon={<FontIcon className='material-icons'>insert_drive_file</FontIcon>}
              rightIconButton={
                <div>
                <IconButton
                  tooltip='Copy link'
                  tooltipPosition='top-center'
                  iconClassName='material-icons'
                  onTouchTap={() => this.copyLink(index)}>
                  link
                </IconButton>
                <IconButton
                  tooltip='Download'
                  tooltipPosition='top-center'
                  iconClassName='material-icons'
                  onTouchTap={() => this.downloadFile(index)}>
                  file_download
                </IconButton>
                </div>
              } />
          )}
        </List>
      </Card>
    )
  }
}

export default connect(mapStateToProps, torrentActions)(TorrentView)
