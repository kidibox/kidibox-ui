import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  AppBar,
  AppCanvas,
  FlatButton// ,
} from 'material-ui'
import { actions as authActions } from '../../redux/modules/auth'
import AuthenticationModal from './AuthenticationModal'

import '../../styles/core.scss'

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
})

export class CoreLayout extends React.Component {
  static propTypes = {
    children: PropTypes.element,
    isAuthenticated: PropTypes.bool,
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
  };

  onSubmit () {
    this.props.login('kid', 'C0mplexPwd')
  }

  render () {
    const { isAuthenticated, login, logout } = this.props
    return (
      <AppCanvas>
        <div>
          <AppBar
            title='kidiBox'
            iconElementRight={
              isAuthenticated
                ? <FlatButton label='Logout' onTouchTap={logout} />
                : <FlatButton label='Sign in' onTouchTap={login} />
            }
            showMenuIconButton={false} />
        </div>
        {this.props.children}
        <AuthenticationModal />
      </AppCanvas>
    )
  }
}

export default connect(mapStateToProps, authActions)(CoreLayout)
