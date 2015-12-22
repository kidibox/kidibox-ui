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
    signup: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
  };

  constructor (props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit () {
    const username = this.refs.username.getValue()
    const password = this.refs.password.getValue()
    this.props.login(username, password)
  }

  render () {
    const { errors } = this.props
    return (
      <Dialog
        modal
        actions={<FlatButton label='Submit' primary onTouchTap={this.onSubmit} />}
        contentStyle={{ width: '25%' }}
        open={this.props.open || false}>
        <Tabs>
          <Tab label='Signin'>
            <div>
              <TextField
                fullWidth
                errorText={errors.username || ''}
                hintText='Username'
                floatingLabelText='Username'
                ref='username'
                errorStyle={{
                  float: 'left'
                }} />
            </div>
            <div>
              <TextField
                fullWidth
                errorText={errors.password || ''}
                hintText='Username'
                floatingLabelText='Password'
                type='password'
                ref='password'
                errorStyle={{
                  float: 'left'
                }} />
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

const mapStateToProps = (state) => ({
  errors: state.auth.errors || {}
})

export default connect(mapStateToProps, authActions)(AuthenticationModal)
