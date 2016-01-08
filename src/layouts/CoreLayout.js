import React from 'react'
import { AppBar, Dialog, FlatButton, Tabs, Tab, TextField } from 'material-ui'

import ThemeDecorator from 'material-ui/lib/styles/theme-decorator'
import ThemeManager from 'material-ui/lib/styles/theme-manager'
import DarkRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme'

// import '../styles/core.scss'

// class CoreLayout extends React.Component {
//   static propTypes = {
//     children: React.PropTypes.element
//   };

//   static childContextTypes = {
//     muiTheme: React.PropTypes.object
//   };

//   constructor () {
//     super()
//     this.state = {
//       muiTheme: ThemeManager.getMuiTheme(DarkRawTheme)
//     }
//   }

//   getChildContext () {
//     return {
//       muiTheme: this.state.muiTheme
//     }
//   }

//   render () {
//     return (
//       <div>
//         {this.props.children}
//       </div>
//     )
//   }
// }

// Note: Stateless/function components *will not* hot reload!
// react-transform *only* works on component classes.
//
// Since layouts rarely change, they are a good place to
// leverage React's new Stateless Functions:
// https://facebook.github.io/react/docs/reusable-components.html#stateless-functions
//
// CoreLayout is a pure function of it's props, so we can
// define it with a plain javascript function...
function CoreLayout ({ children }) {
  const containerStyle = {
    backgroundColor: DarkRawTheme.palette.canvasColor,
    height: '100%'
  }

  const rightButton = <FlatButton label='Sign in' />

  const actions = [
    <FlatButton label='Submit' primary onTouchTap={this.handleClose} />,
    <FlatButton label='Cancel' secondary onTouchTap={this.handleClose} />
  ]

  return (
    <div style={containerStyle}>
      <AppBar title='kidiBox' iconElementRight={rightButton} />
      <Dialog
        modal
        actions={actions}
        contentStyle={{ width: '25%' }}
        open>
        <Tabs>
          <Tab label='Signin'>
            <div>
              <TextField fullWidth hintText='Username' floatingLabelText='Username' />
            </div>
            <div>
              <TextField fullWidth hintText='Username' floatingLabelText='Password' type='password' />
            </div>
          </Tab>
          <Tab label='Register'>
            <div>
              <TextField fullWidth hintText='Username' floatingLabelText='Username' />
            </div>
            <div>
              <TextField fullWidth hintText='Must be 8 characters min' floatingLabelText='Password' type='password' />
            </div>
          </Tab>
        </Tabs>
      </Dialog>
      {children}
    </div>
  )
}

CoreLayout.propTypes = {
  children: React.PropTypes.element
}

export default ThemeDecorator(ThemeManager.getMuiTheme(DarkRawTheme))(CoreLayout)
