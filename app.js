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
var Kafka = require('no-kafka');
const port = 3000

io.on('connection', function (socket) {
  console.log('a user connected');
})

http.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
  var consumer = new Kafka.SimpleConsumer({
    clientId: 'no-kafka-client',
    connectionString: 'kafka://127.0.0.1:9092'
  });
  // data handler function can return a Promise 
  var dataHandler = function (messageSet, topic, partition) {
    messageSet.forEach(function (m) {
      //console.log(topic, partition, m.offset, m.message.value.toString('utf8'));
      var tempSharePrice = m.message.value.toString('utf8');
      var tempShare = tempSharePrice;
      console.log(tempShare);
      var sharePrice = tempSharePrice.replace(/[^0-9]/g, '');
      var share = tempShare.replace(/[^a-z,A-Z]/g, '');
      io.emit('test event', { share: share, sharePrice: sharePrice });
    });
  };
  return consumer.init().then(function () {
    // Subscribe partitons 0 and 1 in a topic: 
    consumer.subscribe('mysqlnew-iifl_realtimedb', dataHandler);
  });
});