/*
Handles All API routes
 */

import AppController from '../controllers/AppController';

const InjectRoutes = (app) => {
  app.get('/status', AppController.getStatus);
  app.get('/stats', AppController.getStats);
};

export default InjectRoutes;
