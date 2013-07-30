var express = require('express'),
    http = require('http'),
    app = express(),
    server = http.createServer(app),
    io = require('socket.io').listen(server);

var sockets = {};

io.on('connection', function (socket) {
    console.log("We have a connection! Socket ID: " + socket.id);
    for (var k in sockets) {
        var s = sockets[k];
        s.disconnect();
        delete sockets[k];
    }
    sockets[socket.id] = socket;
    socket.emit('data', {"Notice": "New Socket.IO connection. ID = " + socket.id});
});
io.on('blah', function (data) {
    console.log("Got blah: " + data);
})

app.configure(function () {
    app.use(express.static(__dirname + '/public'));
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
});

app.get('/push/:id/:val', function (req, res) {
    var params = req.params;
    console.log("GET to /push/" + params.id);
    res.send("OK... " + params.val);
    if (sockets[params.id]) {
        sockets[params.id].emit('data', {val: params.val});
    }
});
app.put('/push/:id', function (req, res) {
    console.log("PUT to /push/" + req.params.id);
    var id = req.params.id;
    if (sockets[id]) {
        sockets[id].emit('data', req.body);
    }
    res.send("OK");
});

var port = process.env.PORT || 3000;
server.listen(port);
console.log("Server running on port " + port);
