const fs = require('fs')
const path = require('path')
const test = require('tape')
const nock = require('nock')
const co = require('co')
const getBinary = require('../')
const data = new Buffer('iVBORw0KGgoAAAANSUhEUgA', 'base64')

test('node', co.wrap(function* (t) {
  nock('http://localhost:12345')
    .get('/img.png')
    .reply(200, data, {
      'Content-Type': 'image/png'
    })

  const result = yield getBinary('http://localhost:12345/img.png')
  t.same(result, {
    body: data,
    mimeType: 'image/png'
  })

  t.end()
}))

// TODO: add react-native test
