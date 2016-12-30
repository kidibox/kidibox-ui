import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import CircularProgress from 'material-ui/lib/circular-progress'
import { Card, CardHeader } from 'material-ui/lib/card'
import List from 'material-ui/lib/lists/list'
import Spacing from 'material-ui/lib/styles/spacing'
import { actions as torrentActions } from '../../redux/modules/torrent'
import TorrentFileItemView from './TorrentFileItemView'
import { API_BASE } from '../../redux/utils/api'

const mapStateToProps = (state) => state.torrent

function toTree (items, parents = []) {
  const [folders, files] = _.partition(items, item => item.paths.length > 1)
  const grouped = _.groupBy(folders, file => file.paths[0])
  const mapped = _.keys(grouped).map(folder => {
    const children = grouped[folder].map(({ paths, ...rest }) => ({ ...rest, paths: _.drop(paths, 1) }))
    const current = [...parents, folder]
    return {
      name: folder,
      folder: true,
      path: current,
      children: toTree(children, current),
      bytesCompleted: _.sumBy(children, 'bytesCompleted'),
      length: _.sumBy(children, 'length')
    }
  })

  return mapped.concat(files.map(({ paths, ...rest }) => ({
    ...rest,
    name: paths[0],
    path: [...parents, paths[0]]
  })))
}

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
    fetchTorrent: PropTypes.func.isRequired,
    getDownloadToken: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props)
    this.copyLink = this.copyLink.bind(this)
    this.downloadFile = this.downloadFile.bind(this)
  }

  componentDidMount () {
    const { fetchTorrent, params } = this.props
    fetchTorrent(params.id)
  }

  componentWillUnmount () {
    this.props.invalidateTorrent()
  }

  copyLink () {
    const { id, getDownloadToken } = this.props
    getDownloadToken(id).then(({ token }) => {
      window.prompt('Copy to clipboard: Ctrl+C, Enter', API_BASE + '/download/' + token)
    })
  }

  downloadFile () {
    const { id, getDownloadToken } = this.props
    getDownloadToken(id).then(({ token }) => {
      window.location.href = API_BASE + '/download/' + token
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

    const { id, name, userName, files } = this.props
    const tree = toTree(files.map(({ name, ...rest }) => ({ paths: name.split('/'), name, ...rest })))

    return (
      <Card initiallyExpanded style={{ margin: Spacing.desktopGutter }}>
        <CardHeader
          title={name}
          subtitle={'uploaded by ' + userName} />
        <List>
          {tree.map((file, index) =>
            <TorrentFileItemView key={index} torrentId={id} {...file} />
          )}
        </List>
      </Card>
    )
  }
}

export default connect(mapStateToProps, torrentActions)(TorrentView)
