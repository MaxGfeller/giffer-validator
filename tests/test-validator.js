var Giffer = require('giffer')
var levelup = require('levelup')
var test = require('tap').test
var validator = require('../')
var TestAdapter = require('./testadapter')
var server = require('./testserver/server')

var port = 1345

server.listen(port)

var db = levelup('/whatever', {
    db: require('memdown')
})

test('Test functionality of giffer-validator', function(t) {
    t.plan(2)
    var giffer = new Giffer({
        db: db,
        outputDir: __dirname + '/temp',
        adapters: [ new TestAdapter({ port: port }) ]
    })
    validator(giffer)
    giffer.start()

    giffer.on('gif', function(filename) {
        t.ok(filename)
    })

    setTimeout(function() {
        server.close()
    }, 2000)
})
