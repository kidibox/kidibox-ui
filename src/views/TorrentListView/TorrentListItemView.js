import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Checkbox from 'material-ui/lib/checkbox'
import Colors from 'material-ui/lib/styles/colors'
import IconButton from 'material-ui/lib/icon-button'
import IconMenu from 'material-ui/lib/menus/icon-menu'
import LinearProgress from 'material-ui/lib/linear-progress'
import ListItem from 'material-ui/lib/lists/list-item'
import MenuItem from 'material-ui/lib/menus/menu-item'
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert'

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
    status: React.PropTypes.number,
    onDelete: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props)
    this.onClick = this.onClick.bind(this)
    this.onDelete = this.onDelete.bind(this)
  }

  onClick () {
    this.props.history.pushState(null, '/torrents/' + this.props.id)
  }

  onDelete () {
    this.props.onDelete(this.props.id)
  }

  render () {
    const { name, userName, percentDone, status, selectionMode } = this.props

    const checkbox = selectionMode ? <Checkbox /> : null
    const iconButtonElement = (
      <IconButton touch tooltip='Actions'>
        <MoreVertIcon color={Colors.grey400} />
      </IconButton>
    )

    let color
    switch (status) {
      case 0: color = Colors.grey700; break
      case 4: color = Colors.cyan500; break
      case 6: color = Colors.lightGreen500; break
      default: color = Colors.grey100
    }

    const rightIconMenu = !selectionMode ? (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem index={0} primaryText='Pause' />
        <MenuItem index={1} primaryText='Stop' />
        <MenuItem index={2} primaryText='Delete' onTouchTap={this.onDelete} />
      </IconMenu>
    ) : null

    return (
      <div>
        <ListItem
          onTouchTap={this.onClick}
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
