/*
Handles All API routes
 */

import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';

const InjectRoutes = (app) => {
  app.get('/status', AppController.getStatus);
  app.get('/stats', AppController.getStats);

  app.post('/users', UsersController.postNew);
};

export default InjectRoutes;
