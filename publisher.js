const amqp = require('amqplib');

(async () => {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  const queue = 'student.queue';

  const message = {
    text: 'Hello, RabbitMQ!',
    timestamp: new Date().toISOString(),
  };

  setInterval(async () => {
    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    console.log(`Message sent:`, message);
  }, 1000);

  setTimeout(() => {
    connection.close();
    console.log('Connection to RabbitMQ is closed.');
  }, 50000);
})()