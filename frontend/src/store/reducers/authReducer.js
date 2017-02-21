import * as actionTypes from '../actions/actionTypes'

const storedUser = localStorage.getItem('user.data')
// parse use from stored string
let user
try {
  user = JSON.parse(storedUser)
} catch (e) {
  // console.error('Error parsing user data', e)
}

const initialState = {
  token: localStorage.getItem('user.token'),
  user,
  status: 'inited'
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGNUP_REQUEST:
      return {
        ...state,
        user: null,
        status: 'pending'
      }
    case actionTypes.LOGIN_REQUEST:
      return {
        ...state,
        user: null,
        status: 'pending'
      }
    case actionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        status: 'done',
        signupSuccess: true,
        redirect: true,
        ...action.payload
      }
    case actionTypes.LOGIN_SUCCESS:
      localStorage.setItem('user.token', action.payload.token)
      localStorage.setItem('user.data', JSON.stringify(action.payload.user))
      return {
        ...state,
        status: 'done',
        redirect: true,
        error: undefined,
        ...action.payload
      }
    case actionTypes.SIGNUP_FAIL:
    case actionTypes.LOGIN_FAIL:
      return {
        ...state,
        status: 'done',
        redirect: false,
        error: action.payload
      }
    case actionTypes.LOGIN_OUT:
      localStorage.removeItem('user.token')
      localStorage.removeItem('user.data')
      return {
        ...state,
        token: null,
        user: null,
        status: 'logout'
      }
    default:
      return state
  }
}
