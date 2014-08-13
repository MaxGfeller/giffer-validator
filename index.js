var fs = require('fs')
var explode = require('gif-explode')

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
                .pipe(explode(function(frame) {
                    frames++
                    if(frames === 2) {
                        return next()
                    }
                }))
        })
    })
}
