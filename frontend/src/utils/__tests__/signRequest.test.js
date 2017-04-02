import { signRequest } from '../signRequest'

test('# signRequest', () => {
  localStorage.setItem('user.token', 'test')
  const req = { test: 'value' }
  const expectedReq = {
    ...req,
    headers: { 'x-access-token': 'test' },
  }

  expect(signRequest(req)).toEqual(expectedReq)
})
