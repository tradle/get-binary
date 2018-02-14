# get-binary

## Usage

```js
const getBinary = require('get-binary')

getBinary('https://tradle.io/images/logo.png')
  .then(({ body, mimeType }) => doStuff(body, mimeType))
  .catch(err => itWasAllInVain(err))
```
