import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  Dialog,
  FlatButton,
  Tab,
  Tabs,
  TextField
} from 'material-ui'
import { actions as authActions } from 'redux/modules/auth'

export class AuthenticationModal extends React.Component {
  static propTypes = {
    open: PropTypes.bool,
    login: PropTypes.func.isRequired,
    signup: PropTypes.func.isRequired
  };

  onSubmit () {
    const username = this.refs.username.getValue()
    const password = this.refs.password.getValue()
    this.props.login(username, password)
  }

  onCancel () {
    // Redirect?
  }

  render () {
    return (
      <Dialog
        modal
        actions={[
          <FlatButton label='Submit' primary onTouchTap={() => this.onSubmit()} />,
          <FlatButton label='Cancel' secondary onTouchTap={() => this.onCancel()} />
        ]}
        contentStyle={{ width: '25%' }}
        open={this.props.open || false}>
        <Tabs>
          <Tab label='Signin'>
            <div>
              <TextField
                fullWidth
                hintText='Username'
                floatingLabelText='Username'
                ref='username' />
            </div>
            <div>
              <TextField
                fullWidth
                hintText='Username'
                floatingLabelText='Password'
                type='password'
                ref='password' />
            </div>
          </Tab>
          <Tab label='Register'>
            <div>
              <TextField fullWidth hintText='Username' floatingLabelText='Username' />
            </div>
            <div>
              <TextField fullWidth heintText='Email' floatingLabelText='Email' />
            </div>
            <div>
              <TextField fullWidth hintText='Must be 8 characters min' floatingLabelText='Password' type='password' />
            </div>
          </Tab>
        </Tabs>
      </Dialog>
    )
  }
}

export default connect(() => ({}), authActions)(AuthenticationModal)
