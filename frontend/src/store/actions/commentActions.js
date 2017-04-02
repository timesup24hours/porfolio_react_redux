import * as actionTypes from './actionTypes'
import axios from 'axios'

export const commentSubmitting = () => ({
  type: actionTypes.COMMENT_SUBMITTING
})

export const commentSubmitSuccess = payload => ({
  type: actionTypes.COMMENT_SUBMIT_SUCCESS,
  payload
})

export const commentSubmitFail = () => ({
  type: actionTypes.COMMENT_SUBMIT_FAIL
})

export const commentSetValue = payload => ({
  type: actionTypes.COMMENT_SET_VALUE,
  payload
})

export const commentSetError = payload => ({
  type: actionTypes.COMMENT_SET_ERROR,
  payload
})

export const commentResetValues = () => ({
  type: actionTypes.COMMENT_RESET_VALUES
})

export const commentSubmitRequest = payload =>
  dispatch => axios.post('/api/comment', payload)

export const commentGetAllRequest = () => ({
  type: actionTypes.COMMENT_GET_ALL_REQUEST
})

export const commentDeleteRequest = payload => ({
  type: actionTypes.COMMENT_DELETE_REQUEST,
  payload: {
    id: payload
  }
})

export const commentEditRequest = payload => ({
  type: actionTypes.COMMENT_EDIT_REQUEST,
  payload
})
