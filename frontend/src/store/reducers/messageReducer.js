import { MESSAGE_SUBMITTING, MESSAGE_SUBMIT_SUCCESS, MESSAGE_SUBMIT_FAIL } from '../actions/actionTypes'

const initialState = {
  pending: false,
  success: false,
  error: false,
  errors: {},
  fail: false,
  messages: []
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case MESSAGE_SUBMITTING:
      return {
        ...state,
        pending: true,
        error: undefined
      }
    case MESSAGE_SUBMIT_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        pending: false,
        success: true,
        fail: false,
        messages: [
          ...state.messages,
          action.payload,
        ],
        error: undefined
      }
    case MESSAGE_SUBMIT_FAIL:
      return {
        ...state,
        pending: false,
        success: false,
        fail: true,
        error: action.payload.response.data
      }
    default:
      return state

  }
}
