import * as actionTypes from '../actions/actionTypes'

const initialState = {
  open: false,
  message: '',
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.SNACKBAR_OPEN:
      return {
        ...state,
        open: true,
        message: action.payload,
      }
    case actionTypes.SNACKBAR_CLOSE:
      return {
        ...state,
        message: '',
        open: false,
      }
    default:
      return state

  }
}
