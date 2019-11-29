import sha1 from 'sha1'

const cache = {}

export default function (params, run) {
  const key = sha1(JSON.stringify(params))
  if (cache[key]) {
    return cache[key]
  }

  return cache[key] = run().then(v => {
    delete cache[key]
    return v
  }, e => {
    delete cache[key]
    throw e
  })
}