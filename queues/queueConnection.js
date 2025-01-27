const amqp = require("amqplib");

// const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://localhost";
const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://guest:guest@localhost";

let connection;

const getRabbitMQConnection = async () => {
  if (!connection) {
    connection = await amqp.connect(RABBITMQ_URL);
    console.log("Connected to RabbitMQ");
  }
  return connection;
};

module.exports = { getRabbitMQConnection };
