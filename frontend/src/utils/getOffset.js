export const getOffset = (el) => {
  const rect = el.getBoundingClientRect()
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

// example use
// let div = document.querySelector('div')
// let divOffset = offset(div)
// console.log(divOffset.left, divOffset.top)
