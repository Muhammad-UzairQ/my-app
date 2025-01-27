module.exports = {
  apps: [
    {
      name: "video-tasks-consumer",
      script: "queues/consumers/videoConsumer.js",
      instances: 1, // Run one instance of this consumer
      autorestart: true, // Restart on crash
      watch: false, // Disable watching file changes
    },
    {
      name: "bulk-insert-consumer",
      script: "queues/consumers/bulkInsert.js",
      instances: 1, // Run one instance of this consumer
      autorestart: true, // Restart on crash
      watch: false, // Disable watching file changes
    },
  ],
};
