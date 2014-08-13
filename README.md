# giffer-validator

This [giffer](https://npmjs.org/giffer) plugin makes sure to remove
downloaded gifs that are invalid, empty or not animated.

## Usage

The usage is pretty straight-forward:

```
var Giffer = require('giffer')
var validator = require('giffer-validator')

var giffer = new Giffer({})
validator(giffer)
```

## Requirements

You need to have ImageMagick installed on your system otherwise pretty cryptic
error messages start to appear.
