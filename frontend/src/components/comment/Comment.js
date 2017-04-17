import React, { Component } from 'react'
import CommentForm from './CommentForm'
import CommentList from './CommentList'
import { connect } from 'react-redux'
import * as commentActions from '../../store/actions/commentActions'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group' // ES6
import CircularProgress from 'material-ui/CircularProgress'
import * as actionTypes from '../../store/actions/actionTypes'

export class Comment extends Component {

  static propType = {
    auth: React.PropTypes.object,
    comment: React.PropTypes.object,
  }

  componentDidMount() {
    this.props.commentGetAllRequest()
  }

  render() {
    const Comments = this.props.comment.comments.map(m => {
      return <CommentList
                commentId={m._id}
                key={m._id}
                user={m.user}
                loginUserId={this.props.auth.user ? this.props.auth.user._id : ''}
                createdAt={m.createdAt}
                comment={m.comment}
                deleteRequest={this.props.commentDeleteRequest}
                deleteType={actionTypes.COMMENT_DELETE_REQUEST}
                editRequest={this.props.commentEditRequest}
             />
    })

    return(
      <div className='Comment-container clearfix'>
        <CommentForm comment={this.props.comment} />
        {Comments.length > 0
          ? <ReactCSSTransitionGroup
              transitionName="CommentAnimation"
              transitionEnterTimeout={1000}
              transitionLeaveTimeout={800}>
              {Comments}
            </ReactCSSTransitionGroup>
          : this.props.comment.pending
            ? <div className='Comment-noComment'>
                <CircularProgress size={50} thickness={3}/>
              </div>
            : <div className='Comment-noComment'>No Comment!</div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  comment: state.comment,
})
const mapDispatchToProps = dispatch => ({
  commentDeleteRequest: commentId => dispatch(commentActions.commentDeleteRequest(commentId)),
  commentEditRequest: paypload => dispatch(commentActions.commentEditRequest(paypload)),
  commentGetAllRequest: () => dispatch(commentActions.commentGetAllRequest()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Comment)
