import React from 'react'
import { connect } from 'react-redux'
import * as reviewActions from '../../store/actions/reviewActions'

const ReviewForm = props => {

  const handleSubmitComment = e => {
    e.preventDefault()

    if(!props.auth.isAuthenticated) {
      document.querySelector('.ReviewForm-error').innerHTML = 'login is required'
      return false
    }

    const review = document.querySelector('#ReviewForm-textarea').value

    props.submitReviewRequest({
      review,
      user: props.auth.user._id,
      productId: props.productId,
    })

    document.querySelector('#ReviewForm-textarea').value = ''
  }

  return (
    <div className='ReviewForm'>
      {props.auth.isAuthenticated
        ? [<div className="row" key='ReviewForm-textarea'>
            <div className="col-sm-12">
              <div className="form-group">
                <lable className='contorl-label' htmlFor='ReviewForm-textarea'>

                </lable>
                <textarea
                  placeholder='write your review'
                  className='form-control'
                  name="ReviewForm-textarea"
                  id="ReviewForm-textarea"
                  cols="30"
                  rows="4">
                </textarea>
                <span className='ReviewForm-error'></span>
              </div>
            </div>
          </div>,

          <div className="row" key='ReviewForm-submit'>
            <div className="col-sm-12 ">
              <div
                className='btn btn-primary pull-right'
                onClick={e => handleSubmitComment(e)}
              >
                Submit
              </div>
            </div>
          </div>]
        : null
      }

    </div>
  )
}
// {props.review.errors && <span className='text-danger'>{props.review.errors.message}</span>}

const mapStateToProps = state => ({
  auth: state.auth,
  review: state.review,
})
const mapDispatchToProps = dispatch => ({
  submitReviewRequest: payload => dispatch(reviewActions.submitReviewRequest(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm)
