//https://kafka.apache.org/quickstart
const express = require('express')
const app = express()
var cors = require('cors')
app.use(cors())

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

let http = require('http').Server(app);
let io = require('socket.io')(http);
// var Kafka = require('no-kafka');
const port = 3000

io.on('connection', function (socket) {
  console.log('a user connected');
  io.emit('test event', { data: 'ASHU' });
})

http.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});