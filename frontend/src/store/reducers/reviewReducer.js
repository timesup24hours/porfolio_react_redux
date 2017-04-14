import * as actionTypes from '../actions/actionTypes'
import { reivewErrorToMessage } from '../../utils'

const initialState = {
  pending: false,
  success: false,
  fail: false,
  errors: {
  },
  error: false,
  currentProductReview: [],
}

const sortByDate = (a, b) => {
  return new Date(a.createdAt) - new Date(b.createdAt)
}

const editReview = (state, id, review) => {
  return state.map((r, i) => {
    if(r._id === id) {
      return {
        ...r,
        review
      }
    }
    return r
  })
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.REVIEW_GET_CURRENT_PRODUCT_REVIEW_REQUEST:
      return {
        ...state,
        pending: true,
        success: false,
        fail: false,
        error: false,
        errors: {},
        currentProductReview: [],
      }
    case actionTypes.REVIEW_EDIT_REQUEST: // for review
    case actionTypes.REVIEW_SUBMIT_REQUEST: // for review
    case actionTypes.REVIEW_DELETE_REQUEST: // for review
      return {
        ...state,
        pending: true,
        success: false,
        fail: false,
        error: false,
        errors: {},
      }
    case actionTypes.REVIEW_SUBMIT_REQUEST_SUCCESS:
      const newArray = state.currentProductReview.concat()
      newArray.unshift(action.payload.review)
      return {
        ...state,
        currentProductReview: newArray,
        pending: false,
        success: true,
        fail: false,
        error: false,
        errors: {}
      }
    case actionTypes.REVIEW_GET_CURRENT_PRODUCT_REVIEW_SUCCESS:
      return {
        ...state,
        currentProductReview: action.payload.review.sort(sortByDate).reverse(),
        pending: false,
        success: true,
        fail: false,
        error: false,
        errors: {},
      }
    case actionTypes.REVIEW_GET_CURRENT_PRODUCT_REVIEW_FAIL:
    case actionTypes.REVIEW_EDIT_REQUEST_FAIL:
    case actionTypes.REVIEW_SUBMIT_REQUEST_FAIL:
    case actionTypes.REVIEW_DELETE_REQUEST_FAIL:
      return {
        ...state,
        pending: false,
        success: false,
        fail: true,
        error: true,
        errors: {
          message: reivewErrorToMessage(action.payload),
          error: action.payload,
          status: action.payload.status,
        },
      }
    case actionTypes.REVIEW_DELETE_REQUEST_SUCCESS:
      return {
        ...state,
        currentProductReview: state.currentProductReview.filter(r => r._id !== action.payload.reviewId),
        pending: false,
        success: true,
        fail: false,
        error: false,
        errors: {},
      }
    case actionTypes.REVIEW_EDIT_REQUEST_SUCCESS:
      return {
        ...state,
        pending: false,
        success: true,
        fail: false,
        error: false,
        errors: {},
        currentProductReview: editReview(state.currentProductReview, action.payload.review._id, action.payload.review.review)
      }
    default:
      return state
  }
}
