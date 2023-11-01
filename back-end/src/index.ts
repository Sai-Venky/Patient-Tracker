import express from 'express';
import patientRoutes from './routes/patientRoutes';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, Express.js with TypeScript!');
});

app.use('/api', patientRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});