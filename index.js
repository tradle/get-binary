
const co = require('co')
const fetch = require('node-fetch')
const getBinary = co.wrap(function* (url) {
  const res = yield fetch(url)
  if (res.status > 300) {
    const text = yield res.text()
    throw new Error(text)
  }

  const arrayBuffer = yield res.arrayBuffer()
  const contentType = res.headers.get('content-type')
  return {
    body: new Buffer(arrayBuffer),
    mimeType: contentType ? contentType.split(';')[0] : undefined
  }
})

module.exports = getBinary
