const toTitleCase = (str) => {
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
}

export const routeParamsFormatToName = (param) => {
  if(!param) return null
  if(param.indexOf('&'))
    return param.split('&').map(p => {
      if(p.indexOf('_')) return toTitleCase(p.replace('_', ' '))
      return toTitleCase(p)
    }).join(' & ')
  return param
}
