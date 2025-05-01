import express from 'express';
import {
  createBestJob,
  getAllBestJobs,
  getBestJobById,
  updateBestJob,
  deleteBestJob,
} from '../controllers/bestJobController.js';

const router = express.Router();

router.post('/createBestJob', createBestJob);
router.get('/getAllBestJob', getAllBestJobs);
router.get('/updateBestJob/:id', getBestJobById);
router.put('/getOneBestJob/:id', updateBestJob);
router.delete('/deleteBestJob/:id', deleteBestJob);

export default router;
