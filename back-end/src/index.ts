import express from 'express';
import { initializeDBConnection } from './db/database';
import patientRoutes from './routes/patientRoutes';
const cors = require('cors')

const app = express();
const port = 5000;

app.use(cors({
  origin:'*'
}))

app.use(express.json());

// Initialize database connection
initializeDBConnection().then(() => {
  console.log('Connected to the database.');

  // Setup routes
  app.use('/api', patientRoutes);

  // Start server
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}).catch(error => {
  console.error('Database connection failed', error);
  process.exit();
});

export { app };