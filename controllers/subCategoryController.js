import SubCategory from '../models/SubCategory.js';
import Category from '../models/CatagoryModel.js';
import slugify from 'slugify';

// Create a new subcategory
export const createSubCategory = async (req, res) => {
  try {
    const { name, parent,title,para } = req.body;
   
    const  slug=  slugify(req.body.name).toLowerCase()
    // Check if subcategory already exists
    const existingSubCategory = await SubCategory.findOne({ name });
    if (existingSubCategory) {
      return res.status(400).json({ message: 'Subcategory already exists' });
    }

    // Check if parent category exists (if provided)
    if (parent) {
      const parentCategory = await Category.findById(parent);
      if (!parentCategory) {
        return res.status(404).json({ message: 'Parent category not found' });
      }
    }

    const newSubCategory = new SubCategory({ name, parent ,title,para,slug});
    await newSubCategory.save();

    res.status(201).json(newSubCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all subcategories (populating parent category)
export const getAllSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategory.find().populate('parent', 'name');
    res.status(200).json(subCategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a subcategory by ID (populating parent category)
export const getSubCategoryById = async (req, res) => {
  try {
    const subCategory = await SubCategory.findById(req.params.id).populate('parent', 'name');

    if (!subCategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }

    res.status(200).json(subCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a subcategory by ID
export const updateSubCategory = async (req, res) => {
  try {
    const { name, parent ,title,para} = req.body;
    const  slug=  slugify(req.body.name).toLowerCase()

    // Check if parent category exists (if provided)
    if (parent) {
      const parentCategory = await Category.findById(parent);
      if (!parentCategory) {
        return res.status(404).json({ message: 'Parent category not found' });
      }
    }

    const subCategory = await SubCategory.findByIdAndUpdate(
      req.params.id,
      { name, parent,title,para,slug:slug, updatedAt: Date.now() },
      { new: true }
    ).populate('parent', 'name');

    if (!subCategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }

    res.status(200).json(subCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateStatus = async (req, res) => {
  try {

    let SubCategories = await SubCategory.findById(req.params.id)
   

    if (!SubCategories) return res.status(404).json({ error: "Blog not found" });

    if(SubCategories.status ==='Inactive')  {
      SubCategories.status ='Active'
    }else{
      SubCategories.status ='Inactive'
    }

   const SubCategori =  await  SubCategories.save()

    res.json(SubCategori);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};



export const getSubcategoriesByCategoryId = async (req, res) => {
  try {
    const { id } = req.params;

    const subcategories = await SubCategory.find({ parent: id });

    res.json(subcategories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch subcategories", details: error.message });
  }
};

// Delete a subcategory by ID
export const deleteSubCategory = async (req, res) => {
  try {
    const subCategory = await SubCategory.findByIdAndDelete(req.params.id);

    if (!subCategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }

    res.status(200).json({ message: 'Subcategory deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const uploadImage = async (req, res) => {
  // If no file is uploaded, return an error
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  // Create the image URL based on the server's static folder path
  const imageUrl = `/uploads/${req.file.filename}`;

  try {
    res.status(201).json({
      message: 'Image uploaded successfully',
      imageUrl: imageUrl,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
