import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    // MongoDB connection URL
    const url = `mongodb://${host}:${port}`;

    // Create a MongoDB client
    this.client = new MongoClient(url, { useUnifiedTopology: true });

    // Connect to the MongoDB server
    this.client.connect((err) => {
      if (err) {
        console.error('MongoDB Connection Error:', err);
      } else {
        console.log('Connected to MongoDB');
        this.usersCollection = this.client.db(database).collection('users');
        this.filesCollection = this.client.db(database).collection('files');
      }
    });
  }

  // Check if the connection to MongoDB is alive
  isAlive() {
    return this.client.isConnected();
  }

  // Asynchronous function to get the number of documents in the "users" collection
  async nbUsers() {
    return this.usersCollection.countDocuments();
  }

  // Asynchronous function to get the number of documents in the "files" collection
  async nbFiles() {
    return this.filesCollection.countDocuments();
  }
}

export const dbClient = new DBClient();
export default dbClient;
