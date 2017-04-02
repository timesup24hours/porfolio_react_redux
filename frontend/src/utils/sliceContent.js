export const sliceContent = (content, num) => {
  if(typeof content !== 'string') return false
  if(content.length > 100) return content.slice(0, num) + ' ...'
  return content
}
