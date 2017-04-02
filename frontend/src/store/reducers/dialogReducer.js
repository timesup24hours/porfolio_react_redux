import * as actionTypes from '../actions/actionTypes'

const initialState = {
  title: '',
  content: '',
  open: false,
  yesButtonText: 'Yes',
  noButtonText: 'No'
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.DIALOG_OPEN:
      return {
        ...state,
        title: action.payload.title,
        content: action.payload.content,
        yesButtonText: action.payload.yesButtonText || state.yesButtonText,
        noButtonText: action.payload.noButtonText || state.noButtonText,
        open: true,
      }
    case actionTypes.DIALOG_CLOSE:
      return {
        ...state,
        title: '',
        content: '',
        open: false,
        yesButtonText: 'Yes',
        noButtonText: 'No'
      }
    default:
      return state
  }
}
