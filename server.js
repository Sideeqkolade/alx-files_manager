import express from 'express';
import InjectRoutes from './routes/index';

const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Load routes from routes/index.js
InjectRoutes(app);

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
