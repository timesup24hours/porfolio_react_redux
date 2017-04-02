import { routeParamsFormatToName } from '../routeParamsFormatToName'

test('# routeParamsFormatToName', () => {
  const routeName = 'name'
  const expectedRouteName = 'Name'
  const routeName1 = 'test&test'
  const expectedRouteName1 = 'Test & Test'
  expect(routeParamsFormatToName()).toBe(null)
  expect(routeParamsFormatToName(routeName)).toBe(expectedRouteName)
  expect(routeParamsFormatToName(routeName1)).toBe(expectedRouteName1)
})
