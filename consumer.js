const amqp = require('amqplib');

(async () => {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const queue = 'student.queue';

    await channel.assertQueue(queue, { durable: true });

    console.log(`Waiting for messages in the queue: "${queue}"`);

    channel.consume(queue, (msg) => {
      if (msg === null) {
        console.log(`Queue is empty.`);
        return
      }
      const message = JSON.parse(msg.content.toString());
      console.log(`Message received:`, message);
      channel.ack(msg);
    });
  } catch (err) {
    console.error('Error when getting a message:', err);
  }
})()