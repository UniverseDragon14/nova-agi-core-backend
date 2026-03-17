Import express from 'express';
import dotenv from 'dotenv';
import { novaBoot } from './novaCore.js';

dotenv.config();
const app = express();

app.use(express.json());

// Test route
app.get('/', (_req, res) => {
  res.json({ status: 'NOVA CORE ONLINE' });
});

// Main API
app.post('/api/nova', async (req, res) => {
  try {
    const { user = 'Guest', command = '' } = req.body;

    if (!command) {
      return res.status(400).json({ error: 'Command required' });
    }

    const result = await novaBoot(command, user);
    res.json(result);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Local only
const port = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => console.log(`NOVA server running on port ${port}`));
}

// Vercel export
export default app;
