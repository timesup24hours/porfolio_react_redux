import * as actionTypes from '../actions/actionTypes'

const initialState = {
  pending: false,
  success: false,
  fail: false,
  errors: {},
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.PAYMENT_REQUEST:
      return {
        ...state,
        pending: true,
        success: false,
        fail: false,
        errors: {},
      }
    case actionTypes.PAYMENT_REQUEST_SUCCESS:
      return {
        ...state,
        pending: false,
        success: true,
        fail: false,
        errors: {},
      }
    case actionTypes.PAYMENT_REQUEST_FAIL:
      return {
        ...state,
        pending: false,
        success: false,
        fail: true,
        errors: {
          error: action.payload,
        },
      }
    default:
      return state
  }

}
