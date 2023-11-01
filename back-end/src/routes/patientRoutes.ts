import express from 'express';

const router = express.Router();

router.get('/patientrecords', (req, res) => {
  const name = req.query.name || 'Guest';
  res.send(`Hello, ${name}!`);
});

router.post('/patientrecords', express.json(), (req, res) => {
  const name = req.body.name || 'Guest';
  res.send(`Hello, ${name}!`);
});

export default router;