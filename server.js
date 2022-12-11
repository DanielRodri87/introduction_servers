
// button id = click

// Path: index.html

// Se o botão for clicado, todos os usuários conectados ao servidor deverão receber o window.alert("clicou");

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html');
    }
);

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
}
);

// rodar o servidor com node server.js