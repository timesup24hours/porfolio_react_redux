import { sliceContent } from '../sliceContent'

test('# sliceContent', () => {
  let content = ''
  for(let i = 1; i < 102; i++) {
    content += i
  }
  expect(sliceContent(123, 1)).toBe(false)
  expect(sliceContent('123', 1)).toBe('123')
  expect(sliceContent(content, 1)).toBe('1 ...')
})
