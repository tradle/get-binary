
const getBinary = url => new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)
  xhr.withCredentials = true
  xhr.responseType = 'arraybuffer'
  try {
    xhr.setRequestHeader('Accept', '*/*')
  } catch (e) {}

  xhr.onreadystatechange = () => {
    if (xhr.readyState !== 4) return

    let mimeType
    try {
      mimeType = xhr.getResponseHeader('Content-Type').split(';')[0]
    } catch (e) {}

    if (xhr.status !== 200) {
      return reject(new Error(`failed with status: ${xhr.status}: ${xhr.response}`))
    }

    if (xhr.response) {
      return resolve({
        body: new Buffer(xhr.response),
        mimeType: mimeType
      })
    }

    reject(new Error('no response'))
  }

  xhr.send(null)
})

module.exports = getBinary
