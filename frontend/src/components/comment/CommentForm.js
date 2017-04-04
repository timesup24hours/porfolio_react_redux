import React from 'react'
import TextFieldGroupMaterialUI from '../common/TextFieldGroupMaterialUI'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as commentActions from '../../store/actions/commentActions'
import commentValidator from './commentValidator'
import RaisedButton from 'material-ui/RaisedButton'
import Chip from 'material-ui/Chip'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { errorToMessage } from '../../utils'

export const CommentForm = props => {
  const { comment } = props

  const onChangeField = e => {
    e.preventDefault()
    props.commentSetValue({ [e.target.name]: e.target.value })
    props.commentSetError({ [e.target.name]: undefined })
  }

  const isValid = () => {
    const { errors, isValid } = commentValidator(comment.values)
    if (!isValid) {
      props.commentSetError(errors)
      props.commentSubmitFail()
    }

    return isValid
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (isValid()) {
      props.showLoading()
      props.commentSubmitRequest(comment.values)
      .then(res => {
        if(res.data.success) {
          props.commentResetValues()
          props.commentSubmitSuccess(res.data.comment)
          props.hideLoading()
        }
      })
      .catch(e => {
        console.log(e);
        props.hideLoading()
        props.commentSubmitFail()
        props.commentSetError(errorToMessage(e.response))
      })
    }
  }

  return (
    <div className='CommentForm-container'>
      {comment.error
        ? <div className='CommentForm-general-errors'>
            <Chip backgroundColor='#ff7276'>{comment.errors.login}</Chip>
          </div>
        : null
      }
      <form onSubmit={handleSubmit}>
        <TextFieldGroupMaterialUI
          className='CommentForm-comment'
          error={comment.errors.comment}
          label="Comment"
          onChange={onChangeField}
          value={comment.values.comment}
          name="comment"
          multiLine={true}
          rowsMax={4}
        />
      <div className='CommentForm-button'>
        <RaisedButton label="Comment"  type="submit" disabled={comment.pending || comment.error} />
      </div>
      </form>
    </div>
  )
}

const mapStateToProps = state => ({
  // comment: state.comment,
})

const mapDispatchToProps = dispatch => ({
  commentSubmitting: () => dispatch(commentActions.commentSubmitting()),
  commentSubmitSuccess: res => dispatch(commentActions.commentSubmitSuccess(res)),
  commentSubmitFail: () => dispatch(commentActions.commentSubmitFail()),
  commentSetValue: bindActionCreators(commentActions.commentSetValue, dispatch),
  commentSetError: error => dispatch(commentActions.commentSetError(error)),
  commentSubmitRequest: bindActionCreators(commentActions.commentSubmitRequest, dispatch),
  commentResetValues: () => dispatch(commentActions.commentResetValues()),
  showLoading: () => dispatch(showLoading()),
  hideLoading: () => dispatch(hideLoading()),
})

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm)
