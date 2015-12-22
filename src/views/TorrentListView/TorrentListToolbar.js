import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  DropDownMenu,
  FontIcon,
  MenuItem,
  Paper,
  RaisedButton,
  Styles,
  TextField,
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarTitle
} from 'material-ui'
import { actions as torrentListActions } from '../../redux/modules/torrentList'

const { Colors, Spacing } = Styles

const mapStateToProps = (state) => ({
  searchText: state.torrentList.searchText,
  selectionMode: state.torrentList.selectionMode,
  statusFilter: state.torrentList.statusFilter,
  sortReversed: state.torrentList.sortReversed
})

class TorrentListToolbar extends React.Component {
  static propTypes = {
    searchText: PropTypes.string,
    selectionMode: PropTypes.bool,
    statusFilter: PropTypes.string,
    sortReversed: PropTypes.bool,
    setStatusFilter: PropTypes.func.isRequired,
    toggleSelectionMode: PropTypes.func.isRequired,
    toggleSortReversed: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props)
    this.onMenuChange = this.onMenuChange.bind(this)
  }

  onMenuChange (ev, index, value) {
    this.props.setStatusFilter(value)
  }

  render () {
    const toggleSortButtonStyle = this.props.sortReversed
      ? { padding: 0 }
      : { padding: 0, transform: 'rotateX(180deg)' }

    return (
      <Paper style={{ margin: Spacing.desktopGutter }}>
        <Toolbar>
          <ToolbarGroup firstChild float='left'>
            <RaisedButton secondary label='Toggle multi-select' onTouchTap={this.props.toggleSelectionMode} />
            <RaisedButton disabled={!this.props.selectionMode} secondary label='0 selected' labelStyle={{
              verticalAlign: 'super'
            }}>
              <FontIcon className='material-icons' style={{
                color: Colors.white,
                lineHeight: '36px',
                paddingRight: Spacing.desktopGutterMini
              }}>arrow_drop_down</FontIcon>
            </RaisedButton>
          </ToolbarGroup>
          <ToolbarGroup float='right'>
            <TextField hintText='Search' style={{ height: Spacing.desktopToolbarHeight, float: 'left' }} />
            <ToolbarSeparator style={{
              marginLeft: Spacing.desktopGutter,
              marginRight: Spacing.desktopGutter
            }} />
            <ToolbarTitle text='Status' />
            <DropDownMenu
              autoWidth={false}
              value={this.props.statusFilter || null}
              onChange={this.onMenuChange}
              style={{
                marginRight: 0,
                width: '155px'
              }}>
              <MenuItem value={null} primaryText='All Torrents' />
              <MenuItem value='completed' primaryText='Completed' />
              <MenuItem value='running' primaryText='Running' />
              <MenuItem value='stopped' primaryText='Stopped' />
              <MenuItem value='seeding' primaryText='Seeding' />
            </DropDownMenu>
            <ToolbarSeparator style={{
              marginLeft: 0,
              marginRight: Spacing.desktopGutter
            }} />
            <ToolbarTitle text='Sort' />
            <DropDownMenu value='name' style={{ marginRight: 0 }}>
              <MenuItem value='name' primaryText='Name' />
              <MenuItem value='progress' primaryText='Progress' />
              <MenuItem value='createdAt' primaryText='Start date' />
            </DropDownMenu>
            <FontIcon onClick={this.props.toggleSortReversed} className='material-icons' style={toggleSortButtonStyle}>
              sort
            </FontIcon>
            <ToolbarSeparator style={{
              marginLeft: Spacing.desktopGutter
            }} />
            <RaisedButton primary label='New torrent' style={{ marginRight: 0 }} />
          </ToolbarGroup>
        </Toolbar>
      </Paper>
    )
  }
}

export default connect(mapStateToProps, torrentListActions)(TorrentListToolbar)
