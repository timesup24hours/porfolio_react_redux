import { loginErrorToMessage, signupErrorToMessage, errorToMessage, shopByCategoryErrorToMessage } from '../errorToMessage'

const message = 'some message'


test('# loginErrorToMessage', () => {

  expect(loginErrorToMessage({ status: 401 })).toBe('Wrong credentials. Please, try again !')
  expect(loginErrorToMessage({ status: 0, message })).toBe(message)
})

test('# signupErrorToMessage', () => {

  expect(signupErrorToMessage({ status: 500 })).toBe('Oops, something went wrong. Please, try again !')
  expect(signupErrorToMessage({ status: 409 })).toBe('Username is already taken !')
  expect(signupErrorToMessage({ status: 400 })).toBe('Missing credential !')
  expect(signupErrorToMessage({ status: 0, message })).toBe(message)
})

test('# errorToMessage', () => {

  expect(errorToMessage({ status: 400 })).toBe('Something went wrong, please try again later!')
  expect(errorToMessage({ status: 0, message })).toBe(message)
})

test('# shopByCategoryErrorToMessage', () => {

  expect(shopByCategoryErrorToMessage({ status: 400 })).toBe('No items in this category yet!')
  expect(shopByCategoryErrorToMessage({ status: 500 })).toBe('something went wrong, please try again later!')
  expect(shopByCategoryErrorToMessage({ status: 0, message })).toBe(message)
})
