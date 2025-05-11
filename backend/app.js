import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import projectRoutes from './routes/projectRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/projects', projectRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
