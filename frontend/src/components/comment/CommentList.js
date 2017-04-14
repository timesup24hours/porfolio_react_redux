import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import Delete from 'material-ui/svg-icons/action/delete-forever'
import Edit from 'material-ui/svg-icons/editor/border-color'
import Save from 'material-ui/svg-icons/content/save'
import Cancel from 'material-ui/svg-icons/navigation/cancel'
import { connect } from 'react-redux'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextFieldGroupMaterialUI from '../common/TextFieldGroupMaterialUI'
import Snackbar from 'material-ui/Snackbar'
import { snackbarClose } from '../../store/actions/snackbarActions'
import UserAvatar from '../nav/UserAvatar'
import UserPopUpProfile from '../user/UserPopUpProfile'

export class CommentList extends Component {
  state = {
    open: false,
    editorOpen: false,
    comment: '',
    profileShow: false,
  }

  componentDidMount() {
    this.setState({ comment: this.props.comment })
  }

  handleRequestClose = () => {
    this.props.snackbarClose()
  }

  openEditor = () => {
    this.setState({ editorOpen: true })
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleCancel = () => {
    this.setState({ editorOpen: false, comment: this.props.comment })
  }

  handleOnchange = e => {
    this.setState({ comment: e.target.value });
  }

  handleSave = () => {
    if(this.state.comment !== this.props.comment) {
      this.props.editRequest({ id: this.props.commentId, comment: this.state.comment })
    }
    this.setState({ editorOpen: false })
  }

  handleDeleteComment = () => {
    this.props.deleteRequest(this.props.commentId)
    this.handleClose()
  }

  //handle show profileShow
  handleShowProfile = () => {
    this.setState({ profileShow: true })
  }

  //handle hide profileShow
  handleHideProfile = () => {
    this.setState({ profileShow: false })
  }

  render() {
    const { user, loginUserId, createdAt } = this.props
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Delete"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleDeleteComment}
      />,
    ]

    return (
      <div className='CommentList-container'>

        {/* user info and edit group wrapper */}
        <div className='CommentList-user-holder'>

          {/* user info group */}
          <div className='CommentList-user-group'>

            <div className='CommentList-avatar'>
              <UserAvatar user={user} onClick={this.handleShowProfile} />
              {this.state.profileShow ? <UserPopUpProfile user={user} onClick={this.handleHideProfile} /> : null}
            </div>

            <div className='CommentList-username-time-group'>
              <div className='CommentList-username'>{user.local.nickname || user.local.username}</div>
              <div className='CommentList-time'>{moment(createdAt).fromNow()}</div>
            </div>

          </div>{/* user info group */}

          {/* edit group */}
          <div className='CommentList-edit-group pull-right'>
            {loginUserId && loginUserId === user._id && this.state.editorOpen
              ? <div className='CommentList-save' onTouchTap={this.handleSave} key='CommentList-save'>
                  <div><Save/></div>
                </div>
              : null}
            {loginUserId && loginUserId === user._id && !this.state.editorOpen
              ? <div id='CommentList-edit' className='CommentList-edit' onTouchTap={this.openEditor} key='CommentList-edit'>
                  <div><Edit/></div>
                </div>
              : null}
            {loginUserId && loginUserId === user._id && !this.state.editorOpen
              ? <div className='CommentList-delete' onTouchTap={this.handleOpen} key='CommentList-delete'>
                  <div><Delete/></div>
                </div>
              : null}
            {loginUserId && loginUserId === user._id && this.state.editorOpen
              ? <div className='CommentList-cancel' onTouchTap={this.handleCancel} key='CommentList-cancel'>
                  <div><Cancel/></div>
                </div>
              : null}
          </div>{/* edit group */}

        </div>{/* user info and edit group wrapper */}

        {/* comment */}
        <div className='CommentList-comment'>
          { this.state.editorOpen
            ? <div className='CommentList-edit-input'>
                <TextFieldGroupMaterialUI
                  id='CommentList-edit-input'
                  name='comment'
                  value={this.state.comment}
                  type='text'
                  onChange={this.handleOnchange}
                  multiLine={true}
                  rows={4}
                  rowsMax={4}
                  fullWidth={true}
                />
              </div>
            : <div className='CommentList-comment-show'>{this.state.comment}</div>
          }
        </div>{/* comment */}


        <Dialog
          title="Delete Confirm"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          This comment would be deleted permanently.
        </Dialog>



        <Snackbar
          open={this.props.snackbar.open}
          message={this.props.snackbar.message}
          autoHideDuration={5000}
          onRequestClose={this.handleRequestClose}
        />

      </div>
    )
  }

}

CommentList.propTypes = {
  user: PropTypes.object.isRequired,
  comment: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  commentId: PropTypes.string.isRequired,
}

const mapDispatchToProps = dispatch => ({
  snackbarClose: () => dispatch(snackbarClose()),
})

const mapStateToProps = state => ({
  snackbar: state.snackbar,
  auth: state.auth,
})

export default connect(mapStateToProps, mapDispatchToProps)(CommentList)
