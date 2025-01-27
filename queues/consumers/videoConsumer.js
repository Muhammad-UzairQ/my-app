const queueConfig = require("../queueConfig");
const { getRabbitMQConnection } = require("../queueConnection");
const { VIDEO_TASKS_QUEUE } = require("../queueNames");

const processVideoTask = async (task) => {
  console.log("Processing video task:", task);

  switch (task.type) {
    case "SAVE_VIDEO":
      console.log("Simulating video processing for:", task.data.title);
      // Add logic for transcoding, notifications, etc.
      break;

    default:
      console.error("Unknown task type:", task.type);
  }
};

const consumeVideoTasks = async () => {
  const connection = await getRabbitMQConnection();
  const channel = await connection.createChannel();

  await channel.assertQueue(VIDEO_TASKS_QUEUE, queueConfig);

  console.log(`Waiting for messages in ${VIDEO_TASKS_QUEUE}...`);

  channel.consume(
    VIDEO_TASKS_QUEUE,
    async (message) => {
      if (message) {
        const task = JSON.parse(message.content.toString());
        await processVideoTask(task);
        channel.ack(message); // Acknowledge the message after processing
      }
    },
    { noAck: false } // Ensures messages are not lost if the consumer crashes
  );
};

consumeVideoTasks();
