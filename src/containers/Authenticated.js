import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import AuthenticationModal from '../layouts/CoreLayout/AuthenticationModal'

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
})

export function Authenticated (Component) {
  class Authenticated extends React.Component {
    static propTypes = {
      isAuthenticated: PropTypes.bool
    };

    render () {
      if (this.props.isAuthenticated === true) {
        return <Component {...this.props} />
      }

      return <AuthenticationModal open />
    }
  }

  return connect(mapStateToProps)(Authenticated)
}
