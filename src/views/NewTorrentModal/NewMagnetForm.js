import React, { Component, PropTypes } from 'react'
import validator from 'validator'
import { connect } from 'react-redux'
import { actions, controls, createFieldClass, Form } from 'react-redux-form'
import FlatButton from 'material-ui/lib/flat-button'
import TextField from 'material-ui/lib/text-field'
import Spacing from 'material-ui/lib/styles/spacing'
import { addNewMagnet } from 'redux/modules/torrent'

const MaterialField = createFieldClass({
  'TextField': controls.text
})

const isRequired = (value) => !validator.isNull(value)

export class NewMagnetForm extends Component {
  static propTypes = {
    addNewMagnet: PropTypes.func.isRequired,
    newMagnet: PropTypes.object.isRequired,
    newMagnetForm: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.submit = this.submit.bind(this)
  }

  submit () {
    const { addNewMagnet, handleSubmit, newMagnet, submit } = this.props
    submit('newMagnet', addNewMagnet(newMagnet).then(handleSubmit))
  }

  render () {
    const { newMagnetForm, handleCancel } = this.props
    return (
      <Form
        autoComplete='off'
        model='newMagnet'
        onSubmit={this.submit}
        validators={{
          link: isRequired
        }}>
        {newMagnetForm.errors.message &&
          <div style={{
            color: 'red',
            textAlign: 'center',
            marginTop: Spacing.desktopGutter
          }}>
            {newMagnetForm.errors.message}
          </div>
        }
        <MaterialField model='newMagnet.link'>
          <TextField
            name='link'
            fullWidth
            errorText={newMagnetForm.fields.link.valid ? '' : 'This field is required'}
            hintText='Magnet link'
            floatingLabelText='Magnet link'
            type='text'
            errorStyle={{
              float: 'left'
            }} />
        </MaterialField>
        <div style={{textAlign: 'right', marginTop: Spacing.desktopGutter}}>
          <FlatButton
            primary
            type='submit'
            label={newMagnetForm.pending ? 'Adding...' : 'Add'}
            disabled={newMagnetForm.pending} />
          <FlatButton
            onClick={handleCancel}
            type='button'
            label='Cancel' />
        </div>
      </Form>
    )
  }
}

const mapStateToProps = (state) => ({
  newMagnet: state.newMagnet,
  newMagnetForm: state.newMagnetForm
})

export default connect(mapStateToProps, { ...actions, addNewMagnet })(NewMagnetForm)
