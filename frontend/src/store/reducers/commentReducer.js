import * as actionTypes from '../actions/actionTypes'

const initialState = {
  comments: [],
  pending: false,
  success: false,
  fail: false,
  errors: {
  },
  error: false,
  values: {
    comment: ''
  }
}

const sortByDate = (a, b) => {
  return new Date(a.createdAt) - new Date(b.createdAt)
}

const editComment = (state, id, comment) => {
  return state.map((c, i) => {
    if(c._id === id) {
      return {
        ...c,
        comment
      }
    }
    return c
  })
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.COMMENT_SUBMITTING:
    case actionTypes.COMMENT_EDIT_REQUEST:
      return {
        ...state,
        pending: true,
        success: false,
        fail: false,
        error: false,
        errors: {}
      }
    case actionTypes.COMMENT_SUBMIT_SUCCESS:
      const newArray = state.comments.concat()
      newArray.unshift(action.payload)
      return {
        ...state,
        comments: newArray,
        pending: false,
        success: true,
        fail: false,
        error: false,
        errors: {}
      }
    case actionTypes.COMMENT_SUBMIT_FAIL:
      return {
        ...state,
        pending: false,
        success: false,
        fail: true,
        error: true
      }
    case actionTypes.COMMENT_SET_VALUE:
      return {
        ...state,
        error: false,
        values: action.payload
      }
    case actionTypes.COMMENT_SET_ERROR:
      return {
        ...state,
        error: false,
        errors: Object.assign({}, state.errors, action.payload)
      }
    case actionTypes.COMMENT_CLEAR_ERROR:
      return {
        ...state,
        error: false,
        errors: {}
      }
    case actionTypes.COMMENT_RESET_VALUES:
      return {
        ...state,
        values: {
          comment: ''
        }
      }
    case actionTypes.COMMENT_GET_ALL_SUCCESS:
      return {
        ...state,
        comments: action.payload.comments.sort(sortByDate).reverse()
      }
    case actionTypes.COMMENT_DELETE_SUCCESS:
      return {
        ...state,
        comments: state.comments.filter(c => c._id !== action.payload.commentId)
      }
    case actionTypes.COMMENT_EDIT_SUCCESS:
      return {
        ...state,
        pending: false,
        success: true,
        fail: false,
        error: false,
        errors: {},
        comments: editComment(state.comments, action.payload.comment._id, action.payload.comment.comment)
      }
    default:
      return state
  }
}
