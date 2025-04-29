import express from 'express';
import {
  createSubCategory,
  getAllSubCategories,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategory,
  getSubcategoriesByCategoryId,
  updateStatus,
  uploadImage
} from '../controllers/subCategoryController.js';
import upload from '../middlewares/single.js';

const router = express.Router();

// Create a new subcategory
router.post('/create-subcategories', createSubCategory);

// Get all subcategories (populating parent category)
router.get('/get-subcategories', getAllSubCategories);
router.get('/getSubCategoryByCatId/:id', getSubcategoriesByCategoryId);

// Get a subcategory by ID
router.get('/get-subcategories/:id', getSubCategoryById);
router.patch('/toggled/:id', updateStatus);

// Update a subcategory by ID
router.put('/update-subcategories/:id', updateSubCategory);

// Delete a subcategory by ID
router.delete('/delete-subcategories/:id', deleteSubCategory);

router.post("/uploadImage", upload.single("image"), uploadImage );

export default router;
