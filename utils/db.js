import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    // MongoDB connection URL
    const url = `mongodb://${host}:${port}/${database}`;

    // create a mongoDB client
    this.client = new MongoClient(url, { useUnifiedTopology: true });

    // connect to a mongodDB server
    this.client.connect();
  }

  // Check if the connection to MongoDB is alive
  isAlive() {
    return this.client.isConnected();
  }

  // Asynchronous function to get the number of documents in the "users" collection
  async nbUsers() {
    return this.client.db().collection('users').countDocuments();
  }

  // Asynchronous function to get the number of documents in the "files" collection
  async nbFiles() {
    return this.client.db().collection('files').countDocuments();
  }
}

export const dbClient = new DBClient();
export default dbClient;
