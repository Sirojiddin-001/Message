const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT;
const path = require('path');
const ir = path.parse(__dirname);
console.log('object :>> ', ir);
app.get('/', function (req, res) {
  res.sendFile(ir.dir + "/dist/index.html");
});

connections = [];

io.sockets.on('connection', function (socket) {
  console.log("Успешное соединение");
  connections.push(socket);

  socket.on('disconnect', function () {
    connections.splice(connections.indexOf(socket), 1);
    console.log("Отключились");
  });

  socket.on('send mess', function (data) {
    io.sockets.emit('add mess', {
      mess: data.mess,
      name: data.name,
      className: data.className
    });
  });
});

http.listen(PORT, () => {
  console.log('listening on *:3000');
});