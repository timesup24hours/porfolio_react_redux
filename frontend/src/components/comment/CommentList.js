import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import Delete from 'material-ui/svg-icons/action/delete-forever'
import Edit from 'material-ui/svg-icons/editor/border-color'
import Save from 'material-ui/svg-icons/content/save'
import Cancel from 'material-ui/svg-icons/navigation/cancel'
import { connect } from 'react-redux'
import * as commentActions from '../../store/actions/commentActions'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextFieldGroupMaterialUI from '../common/TextFieldGroupMaterialUI'
import Snackbar from 'material-ui/Snackbar'
import { snackbarClose } from '../../store/actions/snackbarActions'
import UserAvatar from '../nav/UserAvatar'

export class CommentList extends Component {
  state = {
    open: false,
    editorOpen: false,
    comment: ''
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
      this.props.commentEditRequest({ id: this.props.commentId, comment: this.state.comment })
    } 
    this.setState({ editorOpen: false  })
  }

  handleDeleteComment = () => {
    this.props.commentDeleteRequest(this.props.commentId)
    this.handleClose()
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
        <div className='CommentList-user-holder'>
          <div className='CommentList-user-group'>
            <div className='CommentList-avatar'>
              <UserAvatar user={user} />
            </div>
            <div className='CommentList-username-time-group'>
              <div className='CommentList-username'>{user.local.nickname || user.local.username}</div>
              <div className='CommentList-time'>{moment(createdAt).fromNow()}</div>
            </div>
          </div>
        </div>
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
        </div>


          <Dialog
            title="Delete Confirm"
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
            This comment would be deleted permanently.
          </Dialog>


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
  commentId: PropTypes.string.isRequired
}

const mapDispatchToProps = dispatch => ({
  commentDeleteRequest: commentId => dispatch(commentActions.commentDeleteRequest(commentId)),
  commentEditRequest: paypload => dispatch(commentActions.commentEditRequest(paypload)),
  snackbarClose: () => dispatch(snackbarClose())
})

const mapStateToProps = state => ({
  comments: state.comment,
  snackbar: state.snackbar,
  auth: state.auth
})

export default connect(mapStateToProps, mapDispatchToProps)(CommentList)
