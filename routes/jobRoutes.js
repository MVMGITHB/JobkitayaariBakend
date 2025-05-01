import express from 'express';
import {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  getJobBySlug,
  updateStatus,
  GetJobByCategory
} from '../controllers/jobController.js';


const router = express.Router();

// Create a new job
router.post('/createJob', createJob);

// Get all jobs
router.get('/getAllJob', getAllJobs);

// Get a job by ID
router.get('/getJobById/:id', getJobById);
router.get('/getJobBySlug/:slug', getJobBySlug);
router.get('/getJobbySUbCategory/:slug', GetJobByCategory);
router.patch('/toggled/:id', updateStatus);

// Update a job by ID
router.put('/updateJob/:id', updateJob);

// Delete a job by ID
router.delete('/deleteJob/:id', deleteJob);

export default router;
