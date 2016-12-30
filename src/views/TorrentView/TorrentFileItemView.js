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
    name: PropTypes.string.isRequired,
    path: PropTypes.array.isRequired,
    children: PropTypes.array,
    getDownloadToken: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props)
    this.copyLink = this.copyLink.bind(this)
    this.downloadFile = this.downloadFile.bind(this)
  }

  copyLink () {
    const { torrentId, path, getDownloadToken } = this.props
    getDownloadToken(torrentId, path.join('/')).then(({ token }) => {
      window.prompt('Copy to clipboard: Ctrl+C, Enter', API_BASE + '/download/' + token)
    })
  }

  downloadFile () {
    const { torrentId, path, getDownloadToken } = this.props
    getDownloadToken(torrentId, path.join('/')).then(({ token }) => {
      window.location.href = API_BASE + '/download/' + token
    })
  }

  render () {
    const { torrentId, name, children, path, getDownloadToken } = this.props

    return (
      <ListItem
        disabled={!children}
        initiallyOpen
        insetChildren
        primaryText={name}
        nestedLevel={path.length - 1}
        leftIcon={<FontIcon className='material-icons'>{children ? 'folder' : 'insert_drive_file'}</FontIcon>}
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
        }
        nestedItems={(children || []).map((file, index) =>
          <TorrentFileItemView key={index} torrentId={torrentId} {...file} getDownloadToken={getDownloadToken} />
        )} />
    )
  }
}

export default connect(null, torrentActions)(TorrentFileItemView)

