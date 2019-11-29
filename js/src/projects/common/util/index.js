export function addFavicon(icon) {
  // console.log('add js')
  if (icon) {
    const head = document.querySelector('head')
    const el = document.createElement('link')
    //el.type = 'image/x-icon'
    el.rel = 'SHORTCUT ICON'
    el.href = icon
    head.appendChild(el)
  }
}

export function addLinks(url, type = 'js') {
  return new Promise((res, rej) => {
    addJsFiles(url, type, res, rej)
  }).catch(err => {
    console.error('js加载错误!' + err)
  })
}

function addJsFiles(URL, FileType, resolve, reject) {
  var oHead = document.getElementsByTagName('HEAD').item(0)
  var addheadfile
  if (FileType == 'js') {
    addheadfile = document.createElement('script')
    addheadfile.type = 'text/javascript'
    addheadfile.src = URL
    addheadfile.onload = function() {
      resolve('load success!')
    }
    addheadfile.onerror = function() {
      reject(URL)
    }
  } else {
    addheadfile = document.createElement('link')
    addheadfile.type = 'text/css'
    addheadfile.rel = 'stylesheet'
    addheadfile.href = URL
    resolve('resolve css immediately')
  }

  oHead.appendChild(addheadfile)
}
