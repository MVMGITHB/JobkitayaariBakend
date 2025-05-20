import express from 'express';
import {
  createFeatureJob,
  getAllFeatureJobs,
  getFeatureJobById,
  updateFeatureJob,
  deleteFeatureJob,
  updateStatus
} from '../controllers/featureJobController.js';

const router = express.Router();

router.post('/createFeatureJob', createFeatureJob);
router.get('/getAllFeatureJob', getAllFeatureJobs);
router.get('/getOneFeatureJob/:id', getFeatureJobById);
router.put('/updateFeatureJob/:id', updateFeatureJob);
router.delete('/deleteFeatureJob/:id', deleteFeatureJob);
router.patch('/toggled/:id', updateStatus);

export default router;
