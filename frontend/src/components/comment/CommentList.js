import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Delete from 'material-ui/svg-icons/action/delete-forever'
import Edit from 'material-ui/svg-icons/editor/border-color'
import Save from 'material-ui/svg-icons/content/save'
import Cancel from 'material-ui/svg-icons/navigation/cancel'
import { connect } from 'react-redux'
import TextFieldGroupMaterialUI from '../common/TextFieldGroupMaterialUI'
import UserAvatar from '../nav/UserAvatar'
import UserPopUpProfile from '../user/UserPopUpProfile'
import * as UIActions from '../../store/actions/UIActions'

export class CommentList extends Component {
  state = {
    editorOpen: false,
    comment: '',
    profileShow: false,
  }

  componentDidMount() {
    this.setState({ comment: this.props.comment })
  }

  openEditor = () => {
    this.setState({ editorOpen: true })
  }

  handleOpen = () => {
    this.props.handleOpenDialog({
      title: 'Delete Confirm',
      content: 'It would be deleted permanently.',
      action: {
        type: this.props.deleteType,
        payload: {
          id: this.props.commentId
        }
      },
      trueBtnText: 'Delete',
    })
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
  handleOpenDialog: payload => dispatch(UIActions.handleOpenDialog(payload)),
})

const mapStateToProps = state => ({
  snackbar: state.snackbar,
  auth: state.auth,
})

export default connect(mapStateToProps, mapDispatchToProps)(CommentList)
