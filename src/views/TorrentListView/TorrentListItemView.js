import React from 'react'
import { connect } from 'react-redux'
import { Map } from 'immutable'
import {
  Checkbox,
  IconButton,
  IconMenu,
  LinearProgress,
  ListItem,
  MenuItem,
  Styles
} from 'material-ui'
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert'

const { Colors } = Styles

const mapStateToProps = (state) => ({
  selectionMode: state.torrentList.get('selectionMode')
})

class TorrentListItemView extends React.Component {
  static propTypes = {
    selectionMode: React.PropTypes.bool,
    torrent: React.PropTypes.instanceOf(Map).isRequired
  };

  render () {
    const checkbox = this.props.selectionMode ? <Checkbox /> : null
    const iconButtonElement = (
      <IconButton touch tooltip='Actions'>
        <MoreVertIcon color={Colors.grey400} />
      </IconButton>
    )

    const rightIconMenu = !this.props.selectionMode ? (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem index={0} primaryText='Pause' />
        <MenuItem index={1} primaryText='Stop' />
        <MenuItem index={2} primaryText='Delete' />
      </IconMenu>
    ) : null

    return (
      <div>
        <ListItem
          primaryText={this.props.torrent.get('name')}
          secondaryText={this.props.torrent.get('userName')}
          leftCheckbox={checkbox}
          rightIconButton={rightIconMenu} />
        <LinearProgress mode='determinate' value={this.props.torrent.get('progress')} />
      </div>
    )
  }
}

export default connect(mapStateToProps)(TorrentListItemView)
