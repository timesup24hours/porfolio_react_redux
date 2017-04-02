// import Validator from 'validator'
import isEmpty from 'lodash/isEmpty'

export default function commentValidator(data) {
  let errors = {}

  if (isEmpty(data.comment)) {
    errors.comment = 'This field is required'
  }
  if(!localStorage.getItem('user.token')) {
    errors.login = 'Please login !'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
