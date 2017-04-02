import { MESSAGE_SUBMITTING, MESSAGE_SUBMIT_SUCCESS, MESSAGE_SUBMIT_FAIL } from '../actions/actionTypes'
import axios from 'axios'

export const messageSubmitting = () => ({
  type: MESSAGE_SUBMITTING
})

export const messageSubmitSuccess = payload => ({
  type: MESSAGE_SUBMIT_SUCCESS,
  payload
})

export const messageSubmitFail = payload => ({
  type: MESSAGE_SUBMIT_FAIL,
  payload
})

export function messageSendRequest(data) {
  return dispatch => {
    return axios.post('/api/message', data)
  }
}
