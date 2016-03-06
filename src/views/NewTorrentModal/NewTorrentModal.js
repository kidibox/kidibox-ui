import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Dialog from 'material-ui/lib/dialog'
import { Tab, Tabs } from 'material-ui/lib/tabs'
import NewMagnetForm from './NewMagnetForm'
import { hideNewTorrentModal } from 'redux/modules/modals'
import { fetchTorrents } from 'redux/modules/torrentList'

export class NewTorrentModal extends Component {
  static propTypes = {
    open: PropTypes.bool,
    fetchTorrents: PropTypes.func.isRequired,
    hideNewTorrentModal: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.cancel = this.cancel.bind(this)
    this.submit = this.submit.bind(this)
  }

  cancel () {
    this.props.hideNewTorrentModal()
  }

  submit () {
    this.props.hideNewTorrentModal()
    this.props.fetchTorrents()
  }

  render () {
    const { open } = this.props
    return (
      <Dialog
        modal
        contentStyle={{ width: '25%' }}
        open={open || false}>
        <Tabs>
          <Tab label='Magnet'>
            <NewMagnetForm handleSubmit={this.cancel} handleCancel={this.submit} />
          </Tab>
        </Tabs>
      </Dialog>
    )
  }
}

const mapStateToProps = (state) => ({
  open: state.modals.newTorrentModalOpen
})

export default connect(mapStateToProps, { fetchTorrents, hideNewTorrentModal })(NewTorrentModal)
