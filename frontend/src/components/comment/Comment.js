import React, { Component } from 'react'
import CommentForm from './CommentForm'
import CommentList from './CommentList'
import { connect } from 'react-redux'
import * as commentActions from '../../store/actions/commentActions'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group' // ES6

class Comment extends Component {

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
                comment={m.comment} />
    })

    return(
      <div className='Comment-container'>
        <CommentForm/>
        {Comments.length > 0
          ? <ReactCSSTransitionGroup
              transitionName="CommentAnimation"
              transitionEnterTimeout={1000}
              transitionLeaveTimeout={800}>
              {Comments}
            </ReactCSSTransitionGroup>
          : <div className='Comment-noComment'>No Comment!</div>}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  comment: state.comment,
})
const mapDispatchToProps = dispatch => ({
  commentGetAllRequest: () => dispatch(commentActions.commentGetAllRequest()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Comment)
