
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
const io = require('socket.io')(8080);

var server = http.createServer(function(req, res) {
    var urlObj = url.parse(req.url, true, false);
    var filePath = '.' + urlObj.pathname;
    if (filePath == './') {
        filePath = './index.html';
    }
    var extname = path.extname(filePath);
    var contentType = mime.lookup(extname);
    path.exists(filePath, function(exists) {
        if (exists) {
            res.writeHead(200, {
                'Content-Type': contentType
            });
            var stream = fs.createReadStream
            (filePath).pipe(res);
        } else {
            res.writeHead(404);
            res.end();
        }
    });
});

// rodando o servidor na porta 8080
server.listen(8080);
// criando um socket para o servidor
var socket = io.listen(server);
socket.on('connection', function(client) {
    console.log('Client connected...');
    client.on('join', function(data) {
        console.log(data);
    });
    client.on('messages', function(data) {
        console.log(data);
        client.broadcast.emit("messages", data);
    });
});

// Path: index.html
// rodar comando: node server.js
