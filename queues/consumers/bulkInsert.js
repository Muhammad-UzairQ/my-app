const queueConfig = require("../queueConfig");
const { getRabbitMQConnection } = require("../queueConnection");
const { BULK_INSERT_VIDEOS } = require("../queueNames");
const { bulkInsertVideos } = require("../../services/videoService");

const processBulkInsertTask = async (task) => {
  console.log("Processing bulk insert task...");
  const { filePath, adminId } = task.data;

  const result = await bulkInsertVideos({ filePath, adminId });
  console.log(`${result.inserted} videos inserted. Errors:`, result.errors);
};

const consumeBulkInsert = async () => {
  const connection = await getRabbitMQConnection();
  const channel = await connection.createChannel();

  await channel.assertQueue(BULK_INSERT_VIDEOS, queueConfig);

  console.log(`Waiting for messages in ${BULK_INSERT_VIDEOS}...`);

  channel.consume(
    BULK_INSERT_VIDEOS,
    async (message) => {
      if (message) {
        const task = JSON.parse(message.content.toString());
        await processBulkInsertTask(task);
        channel.ack(message); // Acknowledge the message after processing
      }
    },
    { noAck: false } // Ensures messages are not lost if the consumer crashes
  );
};

consumeBulkInsert();
