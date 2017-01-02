var amqp = require('amqplib/callback_api')

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var ex = 'logs'

    ch.assertExchange(ex, 'fanout', {durable: false})
    ch.assertQueue('', {exclusive: true}, function(err, q) {
      console.log(' [x] Waiting for messagees in %s. To exit press CRTL+C', q.queue)

      ch.bindQueue(q.queue, ex, '');
      ch.consume(q.queue, function(msg) {

      setTimeout(function() {
          console.log(" [x] %s Received at " + new Date, msg.content.toString())
          }, 3000)
        }, {noAck: true});

      // ch.consume(q.queue, function(msg) {
      //   console.log(" [x] %s Received at " + new Date, msg.content.toString())
      // }, {noAck: true});
    })
  })
})
