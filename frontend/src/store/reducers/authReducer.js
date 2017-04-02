import * as actionTypes from '../actions/actionTypes'
import { setAuthorizationToken } from '../../utils'
import isEmpty from 'lodash/isEmpty';

const storedUser = localStorage.getItem('user.data')

// parse use from stored string
let user
try {
  user = JSON.parse(storedUser)
} catch (e) {
  console.error('Error parsing user data', e)
}

if(localStorage.getItem('user.token')) {
  setAuthorizationToken(localStorage.getItem('user.token'))
}

const initialState = {
  token: localStorage.getItem('user.token'),
  user,
  status: 'inited',
  isAuthenticated: !isEmpty(user),
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGNUP_REQUEST:
      return {
        ...state,
        user: null,
        status: 'pending',
      }
    case actionTypes.LOGIN_REQUEST:
      return {
        ...state,
        user: null,
        status: 'pending',
      }
    case actionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        status: 'done',
        signupSuccess: true,
        redirect: true,
        ...action.payload,
      }
    case actionTypes.LOGIN_SUCCESS:
    case actionTypes.USER_INFO_CHANGE_SUCCESS:
      localStorage.setItem('user.token', action.payload.token)
      localStorage.setItem('user.data', action.payload.user)
      setAuthorizationToken(action.payload.token)
      return {
        ...state,
        isAuthenticated: true,
        status: 'done',
        redirect: true,
        error: undefined,
        token: localStorage.getItem('user.token'),
        user: JSON.parse(action.payload.user),
        // user: action.payload.user,
      }
    case actionTypes.SIGNUP_FAIL:
    case actionTypes.LOGIN_FAIL:
    case actionTypes.USER_INFO_CHANGE_FAIL:
      return {
        ...state,
        status: 'done',
        redirect: false,
        error: action.payload,
      }
    case actionTypes.LOGIN_OUT:
      localStorage.removeItem('user.token')
      localStorage.removeItem('user.data')
      setAuthorizationToken()
      return {
        ...state,
        token: null,
        user: null,
        status: 'logout',
        isAuthenticated: false,
      }
    default:
      return state
  }
}
