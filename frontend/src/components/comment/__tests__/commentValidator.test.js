import commentValidator from '../commentValidator'

test('# commentValidator', () => {
  let data = {
    comment: ''
  }
  let errors = {
    comment: 'This field is required',
    login: 'Please login !'
  }
  let returnObj = {
    errors,
    isValid: false
  }
  expect(commentValidator(data)).toEqual(returnObj)
  data = {
    comment: 'test'
  }
  errors = {
    login: 'Please login !'
  }
  returnObj = {
    errors,
    isValid: false
  }
  expect(commentValidator(data)).toEqual(returnObj)
  localStorage.setItem('user.token', 'test')
  errors = {
  }
  returnObj = {
    errors,
    isValid: true
  }
  expect(commentValidator(data)).toEqual(returnObj)
})
