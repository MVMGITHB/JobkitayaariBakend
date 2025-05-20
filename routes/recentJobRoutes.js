import express from 'express';
import {
  createRecentJob,
  getAllRecentJobs,
  getRecentJobById,
  updateRecentJob,
  deleteRecentJob,
  updateStatus
} from '../controllers/recentJobController.js';

const router = express.Router();

router.post('/createRecentJob', createRecentJob);
router.get('/getAllRecentJOb', getAllRecentJobs);
router.get('/getOneRecentJob/:id', getRecentJobById);
router.put('/updateRecentJb/:id', updateRecentJob);
router.delete('/deleteRecentJob/:id', deleteRecentJob);
router.patch('/toggled/:id', updateStatus);

export default router;
