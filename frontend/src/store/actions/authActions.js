import { SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAIL, LOGIN_REQUEST, LOGIN_OUT } from './actionTypes'
import axios from 'axios'

export const loginRequestAction = payload => ({
  type: LOGIN_REQUEST,
  payload
})

export const logoutAction = () => ({
  type: LOGIN_OUT
})

export const signupRequestAction = () => ({
  type: SIGNUP_REQUEST
})

export function isUserExistAction(data) {
  return dispatch => {
    return axios.post('/api/isUserExist', data)
  }
}

export const signupSuccess = (payload) => ({
  type: SIGNUP_SUCCESS,
  payload
})

export const signupFail = (payload) => ({
  type: SIGNUP_FAIL,
  payload
})
