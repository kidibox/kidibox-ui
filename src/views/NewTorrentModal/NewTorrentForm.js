import React, { Component, PropTypes } from 'react'
import validator from 'validator'
import { connect } from 'react-redux'
import { actions, Field, Form } from 'react-redux-form'
import FlatButton from 'material-ui/lib/flat-button'
import RaisedButton from 'material-ui/lib/raised-button'
import Spacing from 'material-ui/lib/styles/spacing'
import { addNewTorrent } from 'redux/modules/torrent'

const isRequired = (value) => !validator.isNull(value)

export class NewTorrentForm extends Component {
  static propTypes = {
    addNewTorrent: PropTypes.func.isRequired,
    newTorrent: PropTypes.object.isRequired,
    newTorrentForm: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.cancel = this.cancel.bind(this)
    this.openFileDialog = this.openFileDialog.bind(this)
    this.submit = this.submit.bind(this)
  }

  cancel () {
    this.props.reset('newTorrent')
    this.props.handleCancel()
  }

  openFileDialog () {
    this.refs.file.click()
  }

  submit () {
    const { addNewTorrent, handleSubmit, reset, submit } = this.props

    const data = new FormData()
    data.append('file', this.refs.file.files[0])

    submit('newTorrent', addNewTorrent(data).then(() => {
      reset('newTorrent')
      handleSubmit()
    }))
  }

  render () {
    const { newTorrent, newTorrentForm } = this.props
    return (
      <Form
        autoComplete='off'
        model='newTorrent'
        onSubmit={this.submit}
        validators={{
          file: isRequired
        }}>
        {newTorrentForm.errors.message &&
          <div style={{
            color: 'red',
            textAlign: 'center',
            marginTop: Spacing.desktopGutter
          }}>
            {newTorrentForm.errors.message}
          </div>
        }
        <div style={{ marginTop: Spacing.desktopGutter }}>
          <RaisedButton
            label={newTorrent.file ? newTorrent.file.split(/(\\|\/)/g).pop() : 'Select file'}
            onClick={this.openFileDialog}
            style={{ width: '100%' }}>
            <Field model='newTorrent.file'>
              <input
                ref='file'
                name='file'
                type='file'
                accept='.torrent'
                style={{ display: 'none' }} />
            </Field>
          </RaisedButton>
        </div>
        <div style={{textAlign: 'right', marginTop: Spacing.desktopGutter}}>
          <FlatButton
            primary
            type='submit'
            label={newTorrentForm.pending ? 'Adding...' : 'Add'}
            disabled={newTorrentForm.pending} />
          <FlatButton
            onClick={this.cancel}
            type='button'
            label='Cancel' />
        </div>
      </Form>
    )
  }
}

const mapStateToProps = (state) => ({
  newTorrent: state.newTorrent,
  newTorrentForm: state.newTorrentForm
})

export default connect(mapStateToProps, { ...actions, addNewTorrent })(NewTorrentForm)
