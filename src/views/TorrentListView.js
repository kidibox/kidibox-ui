import React from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-flexbox-grid'
import {
  Button,
  Dropdown,
  List,
  ListItem,
  ListCheckbox,
  ListSubHeader,
  Switch,
  ProgressBar
} from 'react-toolbox'
import { actions as torrentListActions } from '../redux/modules/torrentList'

const mapStateToProps = (state) => state.torrentList

const TorrentListItem = ({ name, selectionMode }) => {
  if (selectionMode) {
    return <ListCheckbox caption={name} />
  }

  return <ListItem caption={name} />
}

const statusFilterItems = [
  { value: '0', label: 'All' },
  { value: '1', label: 'Downloading' },
  { value: '2', label: 'Seeding' },
  { value: '4', label: 'Paused' }
]

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
    const progressBar = (
      <Row center='xs'>
        <Col>
          <ProgressBar type='circular' />
        </Col>
      </Row>
    )

    const torrentItems = this.props.torrents.map(torrent =>
      <TorrentListItem key={torrent.id} selectionMode={this.props.selectionMode} {...torrent} />
    )

    return (
      <Grid fluid>
        <Row middle='xs'>
          <Col xs>
            <Dropdown
              auto
              onChange={this.props.setFilter}
              source={statusFilterItems}
              value={this.props.activeFilter} />
          </Col>
          <Col xs>
            <Button mini raised accent onClick={this.props.refreshTorrents}>Refresh</Button>
          </Col>
          <Col xs>
            <Switch
              label='Toggle Select'
              checked={this.props.selectionMode}
              onChange={this.props.toggleDisplayMode} />
          </Col>
        </Row>
        <Row>
          <Col xs>
            <List selectable>
              <ListSubHeader caption='Torrents' />
              {this.props.isLoading ? progressBar : torrentItems}
            </List>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default connect(mapStateToProps, torrentListActions)(TorrentListView)
