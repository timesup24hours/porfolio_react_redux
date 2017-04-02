import * as actionTypes from './actionTypes'

export const openDialog = payload => ({
  type: actionTypes.DIALOG_OPEN,
  payload
})

export const closeDialog = payload => ({
  type: actionTypes.DIALOG_CLOSE,
  payload
})
