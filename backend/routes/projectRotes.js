import express from 'express';
import { getProjects } from '../controllers/projectController.js';

const router = express.Router();

// When someone visits /api/projects, run getProjects()
router.get('/', getProjects);

export default router;
