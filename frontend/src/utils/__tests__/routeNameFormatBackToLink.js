import { routeNameFormatBackToLink } from '../routeNameFormatBackToLink'

test('# routeNameFormatBackToLink', () => {
  const name = 'Test & Test'
  const expectedName = 'test&test'
  const name1 = 'Name'
  const expectedName1 = 'name'
  expect(routeNameFormatBackToLink()).toBe(null)
  expect(routeNameFormatBackToLink(name1)).toBe(expectedName1)
  expect(routeNameFormatBackToLink(name)).toBe(expectedName)
})
