import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
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
  selectionMode: state.torrentList.selectionMode
})

class TorrentListItemView extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    percentDone: PropTypes.number.isRequired,
    selectionMode: PropTypes.bool,
    history: React.PropTypes.object,
    status: React.PropTypes.number
  };

  render () {
    const { id, name, userName, percentDone, status, selectionMode, history } = this.props

    const checkbox = selectionMode ? <Checkbox /> : null
    const iconButtonElement = (
      <IconButton touch tooltip='Actions'>
        <MoreVertIcon color={Colors.grey400} />
      </IconButton>
    )

    let color
    switch (status) {
      case 0: color = Colors.grey500; break
      case 4: color = Colors.cyan500; break
      case 6: color = Colors.lightGreen500; break
      default: color = Colors.grey700
    }

    const rightIconMenu = !selectionMode ? (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem index={0} primaryText='Pause' />
        <MenuItem index={1} primaryText='Stop' />
        <MenuItem index={2} primaryText='Delete' />
      </IconMenu>
    ) : null

    return (
      <div>
        <ListItem
          onTouchTap={() => history.pushState(null, '/torrents/' + id)}
          primaryText={name}
          secondaryText={userName}
          leftCheckbox={checkbox}
          rightIconButton={rightIconMenu} />
        <LinearProgress mode='determinate' max={1} value={percentDone} color={color} />
      </div>
    )
  }
}

export default connect(mapStateToProps)(TorrentListItemView)
