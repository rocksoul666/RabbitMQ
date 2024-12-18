const amqp = require('amqplib');

(async () => {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const queue = 'student.queue';

    const message = {
      text: 'Hello, RabbitMQ!',
      timestamp: new Date().toISOString(),
    };

    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));

    console.log(`Message sent:`, message);

    setTimeout(() => {
      connection.close();
      console.log('Connection to RabbitMQ is closed.');
    }, 500);
  } catch (err) {
    console.error('Error when sending a message:', err);
  }
})()