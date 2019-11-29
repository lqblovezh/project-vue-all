import qs from 'qs'

export default function setToken(params) {
  let token_id = ''
  token_id = qs.parse(location.hash || '', {
    ignoreQueryPrefix: true,
  }).token_id
  if (!token_id) {
    token_id = qs.parse(location.search || '', {
      ignoreQueryPrefix: true,
    }).token_id
  }
  if (token_id) {
    sessionStorage.token = token_id
    localStorage.token = token_id
    location.href = location.href.replace(/[\?&]token_id=\w*/, '')
  }
}
