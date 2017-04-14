import * as actionTypes from './actionTypes'

export const submitReviewRequest = payload => ({
  type: actionTypes.REVIEW_SUBMIT_REQUEST,
  payload
})

export const getProductReviewRequest = payload => ({
  type: actionTypes.REVIEW_GET_CURRENT_PRODUCT_REVIEW_REQUEST,
  payload,
})

export const reviewtDeleteRequest = payload => ({
  type: actionTypes.REVIEW_DELETE_REQUEST,
  payload,
})

export const reviewtEditRequest = payload => ({
  type: actionTypes.REVIEW_EDIT_REQUEST,
  payload,
})
