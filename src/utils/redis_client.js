// redisClient.js
const redis = require('redis');

class RedisClient {
  constructor() {
    this.client = redis.createClient({
      host: '127.0.0.1', // Redis server hostname
      port: 6379 // Redis server port
    });

    this.client.on('error', (err) => {
      console.error('Redis client error', err);
    });

    // Check if the client is ready
    this.client.on('ready', () => {
      console.log('Redis client is ready');
    });

    // Handle when the client connects
    this.client.on('connect', () => {
      console.log('Connected to Redis server');
    });

    // Handle when the client reconnects
    this.client.on('reconnecting', (delay, attempt) => {
      console.log(`Reconnecting to Redis server (attempt ${attempt})`);
    });

    // Handle when the client closes the connection
    this.client.on('end', () => {
      console.log('Redis client connection closed');
    });
  }

  isConnected() {
    return this.client.connected;
  }

  setValue(key, value) {
    return new Promise((resolve, reject) => {
      this.client.set(key, value, (err, reply) => {
        if (err) {
          console.error('Error setting value in Redis', err);
          reject(err);
          return;
        }
        console.log('Set value:', reply);
        resolve(reply);
      });
    });
  }

  getValue(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, reply) => {
        if (err) {
          console.error('Error getting value from Redis', err);
          reject(err);
          return;
        }
        console.log('Got value:', reply);
        resolve(reply);
      });
    });
  }
}

module.exports = RedisClient;
