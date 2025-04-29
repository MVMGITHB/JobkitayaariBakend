import express from 'express';
import {
  createTag,
  getTags,
  getTagById,
  updateTag,
  deleteTag
} from '../controllers/tagController.js';

const router = express.Router();

router.post('/create', createTag);
router.get('/getAllTag', getTags);
router.get('/getOneTag/:id', getTagById);
router.put('/update/:id', updateTag);
router.delete('/delete/:id', deleteTag);

export default router;
