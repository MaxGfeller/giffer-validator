var inherits = require('util').inherits
var EventEmitter = require('events').EventEmitter

inherits(TestAdapter, EventEmitter)

function TestAdapter(opts) {
    this.port = opts.port
}

TestAdapter.prototype.start = function() {
    setTimeout(this.emit.bind(this, 'gif', 'http://localhost:' + this.port + '/empty.gif'), 200)
    setTimeout(this.emit.bind(this, 'gif', 'http://localhost:' + this.port + '/valid.gif'), 400)
    setTimeout(this.emit.bind(this, 'gif', 'http://localhost:' + this.port + '/broken.gif'), 600)
}

TestAdapter.prototype.stop = function() {}

module.exports = TestAdapter
