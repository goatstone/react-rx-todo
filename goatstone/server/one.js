var express = require('express')
var app = express()
const path = require('path')
var server
function Server (repositoryBasePath) {
    app.get('/', function (req, res) {
        res.sendFile(path.join(repositoryBasePath, 'goatstone/server/index.html'))
    })
    app.use('/js/', express.static(path.join(repositoryBasePath, 'dist/js')))
}
Server.prototype.start = function () {
    server = app.listen(5000, null, function () {
        var host = server.address().address
        var port = server.address().port
        console.log('goatstone.react-rx-todo server listening at http://%s:%s', host, port)
    })
}
Server.prototype.stop = function () {
    server.close()
}
module.exports = Server
