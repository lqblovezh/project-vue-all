import uuidv4 from 'uuid/v4'

let id = null
export default function() {
  id = sessionStorage.getItem('device_id')
  if (id) {
    return id
  }
  id = uuidv4()
  sessionStorage.setItem('device_id', id)
  return id
}
