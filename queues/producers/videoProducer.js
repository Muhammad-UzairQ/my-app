const queueConfig = require("../queueConfig");
const { getRabbitMQConnection } = require("../queueConnection");
// const { VIDEO_TASKS_QUEUE } = require("../queueNames");

const publishVideoTask = async (queueName, message) => {
  const connection = await getRabbitMQConnection();
  const channel = await connection.createChannel();

  await channel.assertQueue(queueName, queueConfig);

  channel.sendToQueue(
    queueName,
    Buffer.from(JSON.stringify(message)),
    { persistent: true } // Ensures message is not lost on RabbitMQ restart
  );

  console.log(`Published message to ${queueName}:`, message);
};

module.exports = { publishVideoTask };
