import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import FontIcon from 'material-ui/lib/font-icon'
import IconButton from 'material-ui/lib/icon-button'
import ListItem from 'material-ui/lib/lists/list-item'
import { actions as torrentActions } from '../../redux/modules/torrent'
import { API_BASE } from '../../redux/utils/api'

export class TorrentFileItemView extends React.Component {
  static propTypes = {
    torrentId: PropTypes.number.isRequired,
    fileIndex: PropTypes.number.isRequired,
    fileName: PropTypes.string.isRequired,
    getDownloadToken: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props)
    this.copyLink = this.copyLink.bind(this)
    this.download = this.download.bind(this)
  }

  copyLink () {
    const { torrentId, fileIndex, getDownloadToken } = this.props
    getDownloadToken(torrentId, fileIndex).then(({ token }) => {
      window.prompt('Copy to clipboard: Ctrl+C, Enter', API_BASE + '/download/' + token)
    })
  }

  download () {
    const { torrentId, fileIndex, getDownloadToken } = this.props
    getDownloadToken(torrentId, fileIndex).then(({ token }) => {
      window.location.href = API_BASE + '/download/' + token
    })
  }

  render () {
    const { fileName } = this.props

    return (
      <ListItem
        primaryText={fileName}
        leftIcon={<FontIcon className='material-icons'>insert_drive_file</FontIcon>}
        rightIconButton={
          <div>
            <IconButton
              tooltip='Copy link'
              tooltipPosition='top-center'
              iconClassName='material-icons'
              onTouchTap={this.copyLink}>
              link
            </IconButton>
            <IconButton
              tooltip='Download'
              tooltipPosition='top-center'
              iconClassName='material-icons'
              onTouchTap={this.downloadFile}>
              file_download
            </IconButton>
          </div>
        } />
    )
  }
}

export default connect(null, torrentActions)(TorrentFileItemView)

