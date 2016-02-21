import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { IndexLink } from 'react-router'
import AppBar from 'material-ui/lib/app-bar'
import AppCanvas from 'material-ui/lib/app-canvas'
import FlatButton from 'material-ui/lib/flat-button'
import { discardToken } from '../../redux/modules/auth'
import AuthenticationModal from './AuthenticationModal'

import '../../styles/core.scss'

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
})

export class CoreLayout extends React.Component {
  static propTypes = {
    children: PropTypes.element,
    isAuthenticated: PropTypes.bool,
    discardToken: PropTypes.func.isRequired
  };

  render () {
    const { isAuthenticated, discardToken } = this.props
    return (
      <AppCanvas>
        <div>
          <AppBar
            title={<IndexLink to='/' style={{color: 'white', textDecoration: 'none'}}>kidiBox</IndexLink>}
            iconElementRight={isAuthenticated ? <FlatButton label='Logout' onTouchTap={discardToken} /> : null}
            showMenuIconButton={false} />
        </div>
        {this.props.children}
        <AuthenticationModal />
      </AppCanvas>
    )
  }
}

export default connect(mapStateToProps, { discardToken })(CoreLayout)
