import { promisify } from 'util';
import { createClient } from 'redis';

/**
 * Represents a Redis client.
 */
class RedisClient {
  constructor() {
    // create a redis client
    this.client = createClient();
    this.isClientConnected = true;

    // listen for errors and log them to console
    this.client.on('error', (err) => {
      console.log('Redis client not connected to the server:', err.toString());
      this.isClientConnected = false;
    });

    this.client.on('connect', () => {
      this.isClientConnected = true;
    });
  }

  // Check if the connection to Redis is alive
  isAlive() {
    return this.isClientConnected;
  }

  // Asynchronous function to get a value from redis by key
  async get(key) {
    return promisify(this.client.GET).bind(this.client)(key);
  }

  // Asynchronous function to set a value in Redis with an expiration
  async set(key, value, duration) {
    await promisify(this.client.SETEX).bind(
      this.client,
    )(key, duration, value);
  }

  // Asynchronous function to delete a key from Redis
  async del(key) {
    await promisify(this.client.DEL).bind(this.client)(key);
  }
}

export const redisClient = new RedisClient();
export default redisClient;
