const express = require('express');
const app = express();
const server = require('http').Server(app);
let io = require('socket.io')(server);

app.use(express.static('public'))


app.get('/', (req, res) => {
    res.render("index.html");
});

let messages = [{
    id: 1,
    text: 'Welcome to udemy node chat socket',
    nickname: 'Bot 0019'
}]

io.on('connection', function (socket) {
    console.log(`El cliente con IP ${socket.handshake.address} se ha conectado ...`);

    socket.emit('messages', messages);

    socket.on('add-message', function (data) {
        messages.push(data);

        io.sockets.emit("messages", messages);
    })
});

server.listen(3000, () => {
    console.log("server running on port 3000");
})