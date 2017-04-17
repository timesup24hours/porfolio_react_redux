import React from 'react'
import CommentList from '../comment/CommentList'
import ReviewForm from './ReviewForm'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group' // ES6
import * as actionTypes from '../../store/actions/actionTypes'


const CustomerReview = props => {

  const review = props.review.map(r => {
    return <CommentList
              commentId={r._id}
              key={r._id}
              user={r.user}
              loginUserId={props.auth.user ? props.auth.user._id : ''}
              createdAt={r.createdAt}
              comment={r.review}
              deleteRequest={props.deleteRequest}
              deleteType={actionTypes.REVIEW_DELETE_REQUEST}
              editRequest={props.editRequest}
             />
  })

  return (
    <div className='CustomerReview container'>

      <div className="row">
        <div className="col-sm-12">
          Customer Review ( {props.review.length} )
        </div>
      </div>

      <br/>

      <ReviewForm productId={props.product._id} />

      <div className="row">
        {props.review.length > 0
          ? <ReactCSSTransitionGroup
              transitionName="CommentAnimation"
              transitionEnterTimeout={1000}
              transitionLeaveTimeout={800}>
              {review}
            </ReactCSSTransitionGroup>
          : null}
      </div>

    </div>
  )
}

export default CustomerReview
