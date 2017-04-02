import * as actionTypes from '../actions/actionTypes'

export const snackbarClose = () => ({
  type: actionTypes.SNACKBAR_CLOSE,
})

export const snackbarOpen = payload => ({
  type: actionTypes.SNACKBAR_OPEN,
  payload,
})
