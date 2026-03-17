import express from 'express';
import dotenv from 'dotenv';
import { novaBoot } from './novaCore.js';

dotenv.config();
const app = express();
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ status: 'NOVA CORE ONLINE' });
});

app.post('/api/nova', async (req, res) => {
  const { user = 'Guest', command = '' } = req.body || {};
  if (!command) return res.status(400).json({ error: 'command is required' });
  const result = await novaBoot(command, user);
  res.json(result);
});

const port = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => console.log(`NOVA server running on port ${port}`));
}
module.exports = app;
