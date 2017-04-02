import { bytesToSize } from '../bytesToSize'

test('# bytesToSize', () => {
  expect(bytesToSize(0)).toBe('n/a')
  expect(bytesToSize(1)).toBe('1 Bytes')
  expect(bytesToSize(1024)).toBe('1.0 KB')
  expect(bytesToSize(1048576)).toBe('1.0 MB')
  expect(bytesToSize(1073741824)).toBe('1.0 GB')
  expect(bytesToSize(1099511627776)).toBe('1.0 TB')
})
