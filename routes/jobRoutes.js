import express from 'express';
import {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  getJobBySlug
} from '../controllers/jobController.js';

const router = express.Router();

// Create a new job
router.post('/createJob', createJob);

// Get all jobs
router.get('/getAllJob', getAllJobs);

// Get a job by ID
router.get('/getJobById/:id', getJobById);
router.get('/getJobBySlug/:slug', getJobBySlug);

// Update a job by ID
router.put('/updateJob/:id', updateJob);

// Delete a job by ID
router.delete('/deleteJob/:id', deleteJob);

export default router;
