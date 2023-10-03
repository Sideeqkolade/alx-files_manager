/*
@author: Sideeq
Controller
 */
import {v4 as uuidv4} from 'uuid';
import sha1 from 'sha1';
import dbClient  from '../utils/db';
import redisClient from '../utils/redis';

class AuthController {
  static async getConnect(req, res) {
    // get the authorization from header using request
    const authHeader = req.header('Authorization');

    // check for authorization or if it doesn't start with Basic
    if (!authHeader || !authHeader.startsWith('Basic ')) {
      return res.status(401).json({ error: Unauthorized })
    }

    // decode the authorization content to get email and password
    const encodedCredentials = authHeader.substring(6);
    const decodedCredentials = Buffer.from(encodedCredentials, 'base64').toString('utf-8');
    const [email, password] = decodedCredentials.split(':');

    // check if email or password 
    if (!email || !password) {
      res.status(401).json({ error: 'unauthorized' });
    }

    // Hash the password gotten
    const hashedPassword = sha1(password);

    // find the user by email and hashedPassword
    const user = await dbClient.usersCollection.findOne({ email, password: hashedPassword });

    // check if there is no user by that email and hashedPassword
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });   
    }

    // if there is, create a token and a key
    const token = uuidv4();
    const key = `auth_${token}`;

    // store the key and user ID as value in redis for 24 hours, return token
    await redisClient.set(key, user._id.toString(), 86400);
    return res.status(200).json({ token });
  }

  static async getDisconnect(req, res) {
    const token = req.header('X-Token');

    // check for token
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    //use the token to get the userId which is its value from redisClient
    const userId = await redisClient.get(`auth_${token}`);
    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized'});
    }

    // delete the token in Redis and return a status code 204
    await redisClient.del(`auth_${token}`);
    return res.status(204).end();
  }
}

export default AuthController;