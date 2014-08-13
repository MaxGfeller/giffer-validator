var fs = require('fs')
var gm = require('gm')
var im = gm.subClass({ imageMagick: true })

module.exports = function(giffer) {
    giffer.pre('saveMetaData', function(next, url, id) {
        var filename = giffer.outDir + '/' + id + '.gif'

        fs.stat(filename, function(err, stats) {
            // when an error occured, drop the file
            if(err) return

            // if stats is null, the file is empty
            if(!stats.size) return

            var rs = fs.createReadStream(filename)
            im(rs, id + 'gif[3]')
                .identify(function(err, data) {
                    if(err) return

                    next()
                })
        })
    })
}
