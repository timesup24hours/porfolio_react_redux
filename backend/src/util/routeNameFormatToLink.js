export const routeNameFormatToLink = (name) => {
  if(!name) return null
  if(name.indexOf('&') < 0) return name.toLowerCase()
  return name.split(' & ').map(m => {
    if(m.indexOf(' ')) return m.replace(' ', '_').toLowerCase()
    return m.toLowerCase()
  }).join('&')
}
