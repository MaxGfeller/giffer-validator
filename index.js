var fs = require('fs')
var parse = require('gify-parse')
var concat = require('concat-stream')

module.exports = function(giffer) {
  giffer.pre('saveMetaData', function(next, url, id) {
    var filename = giffer.outDir + '/' + id + '.gif'

    fs.stat(filename, function(err, stats) {
      // when an error occured, drop the file
      if(err) return

      // if stats is null, the file is empty
      if(!stats.size) return

      var frames = 0
      var rs = fs.createReadStream(filename)
        .pipe(concat(function(data) {
          var i = parse.getInfo(data)

          if(!i.valid) return

          if(!i.animated) return

          next()
        }))
        .on('error', function() {
          return
        })
    })
  })
}
