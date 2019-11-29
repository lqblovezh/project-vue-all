export default function (url) {
  if (typeof cordova == 'object') {
    cordova.InAppBrowser.open(url, '_self', 'location=yes')
  } else {
    location.href = url
  }
}
