let appId = 'xaaaaaaaaaaaaaa'
function setAppId(val) {
  appId = val
  console.log('settttttttttttttttttt', appId)
}

module.exports = {
  get appId() {
    console.log('geteeeeeeeeeeeeeeeeeeeee')
    return appId
  },
  setAppId,
}
