import { setAuthorizationToken } from '../setAuthorizationToken'
import axios from 'axios';

test('# setAuthorizationToken', () => {
  const token = 'test'
  setAuthorizationToken(token)
  expect(axios.defaults.headers['x-access-token']).toBe('test')
  setAuthorizationToken()
  expect(axios.defaults.headers['x-access-token']).toBe(undefined)
})
