import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { actions, createFieldClass, controls } from 'react-redux-form'
import {
  Dialog,
  FlatButton,
  Tab,
  Tabs,
  TextField
} from 'material-ui'
import Spacing from 'material-ui/lib/styles/spacing'
import { post } from 'redux/utils/api'
import { receiveToken } from 'redux/modules/auth'

const MaterialField = createFieldClass({
  'TextField': controls.text
})

function loginAction (data) {
  return (dispatch, getState) => {
    dispatch(actions.asyncSetValidity('login', (_, done) => {
      post('/authenticate', data)(dispatch, getState)
        .then(({ token }) => {
          done({ credentials: true })
          dispatch(receiveToken(token))
          dispatch(actions.setSubmitted('login'))
          dispatch(actions.reset('login'))
        })
        .catch(() => {
          console.log('foo')
          done({ credentials: false })
        })
    }))
  }
}

export class AuthenticationModal extends React.Component {
  static propTypes = {
    open: PropTypes.bool,
    login: PropTypes.object.isRequired,
    loginForm: PropTypes.object.isRequired,
    loginAction: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
    const { login, loginAction } = this.props
    loginAction(login)
  }

  render () {
    const { loginForm } = this.props
    return (
      <Dialog
        modal
        contentStyle={{ width: '25%' }}
        open={this.props.open || false}>
        <Tabs>
          <Tab label='Signin'>
            <form onSubmit={this.handleSubmit}>
              {loginForm.errors.credentials &&
                <div style={{
                  color: 'red',
                  textAlign: 'center',
                  marginTop: Spacing.desktopGutter
                }}>Invalid username or password.</div>
              }
              <MaterialField model='login.username'>
                <TextField
                  fullWidth
                  errorText={''}
                  hintText='Username'
                  floatingLabelText='Username'
                  type='text'
                  errorStyle={{
                    float: 'left'
                  }} />
              </MaterialField>
              <MaterialField model='login.password'>
                <TextField
                  fullWidth
                  errorText={''}
                  hintText='Password'
                  floatingLabelText='Password'
                  type='password'
                  errorStyle={{
                    float: 'left'
                  }} />
              </MaterialField>
              <div style={{textAlign: 'right', marginTop: Spacing.desktopGutter}}>
                <FlatButton
                  primary
                  type='submit'
                  label={loginForm.pending ? 'Submitting...' : 'Submit'}
                  disabled={loginForm.pending} />
              </div>
            </form>
          </Tab>
          <Tab label='Register' />
        </Tabs>
      </Dialog>
    )
  }
}

const mapStateToProps = (state) => ({
  login: state.login,
  loginForm: state.loginForm,
  errors: state.auth.errors || {}
})

export default connect(mapStateToProps, { loginAction })(AuthenticationModal)
