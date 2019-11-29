export function getViewport() {
  if (document.compatMode == 'BackCompat') {
    return document.body.clientHeight
  } else {
    return document.documentElement.clientHeight
  }
}
export function getViewWidth() {
  return document.documentElement.clientWidth || window.innerWidth || 1024
}
export function getViewHeight() {
  return document.documentElement.clientHeight || window.innerHeight || 768
}

export function getElementTop(element) {
  var actualTop = element.offsetTop
  var current = element.offsetParent

  while (current !== null) {
    actualTop += current.offsetTop
    current = current.offsetParent
  }

  return actualTop
}
